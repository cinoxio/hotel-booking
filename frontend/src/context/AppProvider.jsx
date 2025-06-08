import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import {
    useEffect,
    useState,
} from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';


// Configure axios defaults
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
axios.defaults.withCredentials = true;  // Important for CORS with credentials

// Add response interceptor to handle errors globally
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Handle unauthorized
            toast.error('Session expired. Please login again.');
        } else if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error('An error occurred');
        }
        return Promise.reject(error);
    }
);



// Provider component
export const AppProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY || '$';

 const navigate = useNavigate();
 const { user} = useUser();
 const { getToken} = useAuth();

 const [isOwner, setIsOwner] = useState(false);
 const [showHotelReg, setShowHotelReg] = useState(false);
 const [searchCities, setSearchCities] = useState([]);

    const fetchUser = async () => {
        try {
            const {data} = await axios.get(`/api/user`, {headers: {Authorization: `Bearer ${await  getToken()}`}});
            if (data.success) {
                setIsOwner(data.role === 'hotelOwner');
                setSearchCities(data.recentSearchedCities)
            }
            else {
                setTimeout(() => {
                    fetchUser()
                },5000);
            }
        } catch (error) {
            toast.error('Error fetching user data', error.message);
        }
    }


    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]);

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
        fetchUser, // ✅ ADDED: Expose fetchUser for manual refresh
        axios,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
};

