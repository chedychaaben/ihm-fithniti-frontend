import PublishCard from "@/components/PublishCard"
import { ArrowLeft } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom"
import { Fragment, useContext, useState, useEffect } from "react";
import Footer from '@/components/Footer'
import PublishCarCard from "@/components/PublishCarCard";

const OfferSeat = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);


  const carTypes = [
    { label: "City car", value: "citadine", image: "/images/cars/citadine.svg" },
    { label: "Compact", value: "compacte", image: "/images/cars/compacte.svg" },
    { label: "Sedan", value: "berline", image: "/images/cars/berline.svg" },
    { label: "SUV", value: "suv", image: "/images/cars/suv.svg" },
    { label: "Coupe", value: "coupe", image: "/images/cars/coupe.svg" },
    { label: "Minivan", value: "monospace", image: "/images/cars/monospace.svg" },
    { label: "Utility vehicle", value: "utilitaire", image: "/images/cars/utilitaire.svg" },
    { label: "Pickup", value: "pickup", image: "/images/cars/pickup.svg" },
    { label: "Convertible", value: "cabriolet", image: "/images/cars/cabriolet.svg" },
  ];

  const fetchCars = async () => {
    try {
      setLoadingCars(true);
      const res = await fetch(`${apiUri}/cars/getmycars`, {
        credentials: "include", // since your `useFetch` has `withCredentials: true`
      });
      const data = await res.json();
      setCars(data);
    } catch (err) {
      console.error("Failed to fetch cars:", err);
    } finally {
      setLoadingCars(false);
    }
  };

  const getCarImageByBodyName = (value) => {
    return carTypes.find((carType) => carType.value === value)?.image;
  };

  const steps = [
    {
      step: 1,
      title: "Create your account",
      description: "Add your profile picture, a few words about you and your phone number to increase trust between members."
    },
    {
      step: 2,
      title: "Add Your Car",
      description: "Share your car details to let riders know what to expect — comfort matters!"
    },
    {
      step: 3,
      title: "Publish a ride",
      description: "Indicate departure and arrival points, the date of the ride and check our recommended price to increase your chances of getting your first passengers and ratings."
    },
    {
      step: 4,
      title: "Enjoy the ride",
      description: "That's how easy it is to start saving on travel costs!"
    },
  ]
  const GoBackButton = () => {
    navigate(-1);
  };
  return (
    <>
    
    <section>
      <div class="container pt-6 max-w-screen-xl pb-16 mx-auto md:justify-start  flex flex-col md:flex-row items-start lg:items-start ">
        <NavLink onClick={GoBackButton} className="flex items-center gap-2 mr-5 hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
            Back
        </NavLink>
      </div>
      <h1 className="text-3xl text-center p-5 font-bold"> <span className="text-primary"> Publish </span> a <span className="text-primary"> Ride </span> in Just <span className="text-primary">Minutes</span></h1>
      
      
      <div className="pt-6 max-w-screen-xl pb-16 mx-auto md:justify-center flex flex-col md:flex-row items-center lg:items-start gap-10">
        

        <div className="w-full md:w-1/2 lg:w-1/4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border">
          <PublishCarCard cars={cars} setCars={setCars}/>
        </div>


        <div className="md:w-fit w-fit justify-center mb-10 lg:mb-0">
          <PublishCard />
        </div>

        <div className="flex flex-col flex-wrap gap-10 px-0 md:px-10 sm:py-0 md:w-2/3 text-left">
        {steps.map(step => 
          <div key={step.step} className="flex flex-col md:items-start">
            <div className="w-10 h-10 inline-flex items-center justify-center rounded-lg bg-secondary text-primary mb-5">{step.step}</div>
            <div className="flex-grow">
              <h2 className="text-lg title-font font-medium mb-3">{step.title}</h2>
              <p className="leading-relaxed text-muted-foreground text-base">{step.description}</p>
            </div>
          </div>
        )}
        </div>
      </div>

      
    </section>
    <Footer />
    </>
  )
}

export default OfferSeat