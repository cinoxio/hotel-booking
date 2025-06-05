import {assets} from "../assets/assets"
import HotelBookingForm from "../components/HotelBookingForm"

const Hero=() =>{


  return (
    <section className='flex flex-col items-start justify-center px-6
    md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
        <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20">The Ultimate Hotel Experience</p>
       <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-extrabold max-w-xl mt-4">Discover Your perfect GateWay Destination</h1>
        <p className="max-w-130 mt-2 text-sm md:text-base">Unparalled luxury and comfort await at the world's most exclusive hotels and resorts.Start your journey today.</p>
         <HotelBookingForm/>
    </section>

  )
}

export default Hero
