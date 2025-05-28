// import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../../components/HotelOwner/Sidebar';

const ClientLayout = () => {
    return (
        <>
            <Navbar />
            <div className="flex h-full">
             <Outlet />
            </div>
            <Footer/>
        </>
    );
};

export default ClientLayout;
