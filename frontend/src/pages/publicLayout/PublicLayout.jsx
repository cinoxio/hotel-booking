import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
// Create a new PublicLayout component
const PublicLayout = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-[70vh]">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default PublicLayout;
