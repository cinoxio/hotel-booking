import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// Create the context
export const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchCities, setSearchCities] = useState([]);

    const fetchUser = useCallback(async () => {
        try {
            const token = await getToken();
            if (!token) return;

            const { data } = await axios.get('/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (data.success) {
                setIsOwner(data.user?.role === 'hotelOwner');
                setSearchCities(data.user?.recentSearchCities || []);
            } else {
                console.log('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            // Only show toast for non-auth errors
            if (error.response?.status !== 401) {
                toast.error('Failed to fetch user data');
            }
        }
    }, [getToken]);

    useEffect(() => {
        if (user?.id) {
            fetchUser();
        }
    }, [user?.id, fetchUser]);

    const currency = import.meta.env.VITE_CURRENCY || '$';

    const value = {
        currency,
        navigate,
        user,
        getToken,
        isOwner,
        setIsOwner,
        showHotelReg,
        setShowHotelReg,
        searchCities,
        setSearchCities,
        axios,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook to use the context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};
