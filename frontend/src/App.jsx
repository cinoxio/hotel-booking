import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllRooms from './pages/AllRooms';
import RoomDetailsPage from "./pages/RoomDetails";
import Footer from "./components/Footer";
import MyBookings from "./pages/MyBookings";
import HotelRegistration from "./components/HotelReg";
import Layout from './pages/hotelOwner/Layout';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/ListRoom';
import Dashboard from './pages/hotelOwner/Dashboard';
import PublicLayout from './pages/publicLayout/PublicLayout';
import NotFound from './components/notFound/NotFound';
import { Toaster } from "react-hot-toast";
import { useAppContext } from './context/AppContext'; // Fixed import path

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
