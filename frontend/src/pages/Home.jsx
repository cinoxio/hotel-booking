import ExclusiveOffers from '../components/ExclusiveOffers'
import FeaturedDestination from '../components/FeaturedDestination'
import Hero from "../components/Hero"
import Newsletter from '../components/Newsletter'
import Testimonial from '../components/Testimonial'
import Footer from "../components/Footer"

const Home=() =>{

  return (
    <>
    <Hero/>
    <FeaturedDestination />
     <ExclusiveOffers/>
      <Testimonial />
    <Newsletter/>
    </>

  )
}

export default Home
