import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import HotelRegistration from './components/HotelReg';
import NotFound from './components/notFound/NotFound';
import { useAppContext } from './context/useAppContext'; // Fixed import path
import AllRooms from './pages/AllRooms';
import Home from './pages/Home';
import AddRoom from './pages/hotelOwner/AddRoom';
import Dashboard from './pages/hotelOwner/Dashboard';
import Layout from './pages/hotelOwner/Layout';
import ListRoom from './pages/hotelOwner/ListRoom';
import MyBookings from './pages/MyBookings';
import PublicLayout from './pages/publicLayout/PublicLayout';
import RoomDetailsPage from './pages/RoomDetails';

const App = () => {
    const { showHotelReg } = useAppContext();

    return (
        <>
            <Toaster />
            {showHotelReg && <HotelRegistration />}
            <Routes>
                {/* Public routes with Navbar and Footer */}
                <Route path="/" element={<PublicLayout />}>
                    <Route index element={<Home />} />
                    <Route path="rooms" element={<AllRooms />} />
                    <Route path="rooms/:id" element={<RoomDetailsPage />} />
                    <Route path="my-bookings" element={<MyBookings />} />
                </Route>

                {/* Owner routes without Navbar and Footer */}
                <Route path="/owner" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="add-room" element={<AddRoom />} />
                    <Route path="list-room" element={<ListRoom />} />
                </Route>

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
