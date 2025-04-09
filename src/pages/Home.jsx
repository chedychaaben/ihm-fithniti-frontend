import About from "@/sections/About"
import Features from "@/sections/Features"
import Hero from "@/sections/Hero"
import Testimonial from "@/sections/Testimonial"
import Footer from '@/components/Footer'
import PopularRoutesSection from "@/sections/PopularRoutesSection"

const Home = () => {
  return (
    <>
      <Hero />
      <PopularRoutesSection />
      <Features />
      <About />
      <Testimonial />
      <Footer />
    </>
  )
}

export default Home