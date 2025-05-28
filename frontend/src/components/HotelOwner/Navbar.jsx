import { Link } from 'react-router-dom';
import { assets } from "../../assets/assets";
import { UserButton } from '@clerk/clerk-react';

const Navbar = () => {
    return <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white duration-300 transition-all'>
        <Link to={"/"}>
            <img src={assets.logo} alt='logo icon' className='h-9 invert'/>
        </Link>
        <UserButton/>
    </div>;
};

export default Navbar
