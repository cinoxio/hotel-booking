import Navbar from "./components/Navbar"
import {useLocation, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import AllRooms from './pages/AllRooms'
import RoomDetailsPage from "./pages/RoomDetails"
import Footer from "./components/Footer"
import MyBookings from "./pages/MyBookings"
import HotelRegistration from "./components/HotelReg"
import Layout from './pages/hotelOwner/Layout'
import AddRoom from './pages/hotelOwner/AddRoom'
import ListRoom from './pages/hotelOwner/ListRoom'
import Dashboard from './pages/hotelOwner/Dashboard'
import PublicLayout from './pages/publicLayout/PublicLayout'
import NotFound from './components/notFound/NotFound';

const App=() =>{

// const isOwnerPath = useLocation().pathname.includes("owner");
  return (
      <>
<Routes>
 {/* <Route path="*" element={<NotFound />} /> */}
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
</Routes>
          {/* {!isOwnerPath && <Navbar />}
          {/* <HotelRegistration/> */}
          {/* <div className="min-h-[70vh]">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/rooms" element={<AllRooms />} />
                  <Route path="/rooms/:id" element={<RoomDetailsPage/>} />
                  <Route path="/my-bookings" element={<MyBookings />} />
                  <Route path='/owner' element={<Layout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="add-room" element={<AddRoom />} />
                      <Route path="list-room" element={<ListRoom/>} />

                  </Route>
              </Routes>
          </div> */}
          {/* <Footer />  */}
      </>
  );
}

export default App
