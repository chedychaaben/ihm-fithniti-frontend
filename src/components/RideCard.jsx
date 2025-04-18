import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { Button } from "@/components/ui/button"

const RideCard = ({ creator, details, withButton }) => {
  const { origin, destination, availableSeats, startTime, endTime, price, maxTwoPassengersInBackSeats, smokingAllowed, heavyLuggage, petsAllowed, airConditioning, vehicleDetails } = details;
  
  const backendUri = import.meta.env.VITE_REACT_BACKEND_URI

  
  const formattedStartDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(startTime));

  function getTime(dateTimeInput) {
    const selectedDate = new Date(dateTimeInput);
    const hours = selectedDate.getUTCHours().toString().padStart(2, '0'); // Using UTC hours
    const minutes = selectedDate.getUTCMinutes().toString().padStart(2, '0'); // Using UTC minutes
  
    return `${hours}:${minutes}`;
  }

  const [borderColor, setBorderColor] = useState("border-gray-200");

  
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

  const matchedCarType = carTypes.find(car => car.value === vehicleDetails.body);
  const carImage = matchedCarType ? matchedCarType.image : null;

  return (
    <div
      className={`relative rounded-xl w-full my-4 p-6 border-2 transition-all duration-300 ${borderColor} bg-white shadow-md hover:shadow-lg`}
      onMouseOver={() => setBorderColor("border-blue-500")}
      onMouseOut={() => setBorderColor("border-gray-200")}
    >
      {/* Date badge */}
      <div className="absolute -top-3 left-4 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
        {formattedStartDate} - {new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          timeZone: "UTC",
        }).format(new Date(endTime))}
      </div>
      
      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Timeline section */}
        <div className="flex-1">
          <div className="relative border-s border-gray-200 ps-6 h-full flex flex-col justify-center">
            {/* Origin */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <time className="text-sm font-medium text-gray-500 min-w-[60px]">{getTime(startTime)}</time>
                <h3 className="text-lg font-semibold text-gray-800 capitalize">{origin.place}</h3>
              </div>
            </div>

            {/* Destination */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <time className="text-sm font-medium text-gray-500 min-w-[60px]">{getTime(endTime)}</time>
                <h3 className="text-lg font-semibold text-gray-800 capitalize">{destination.place}</h3>
              </div>
            </div>
          </div>

        </div>

        {/* Price section (desktop) */}
        <div className="hidden md:flex flex-col items-end justify-between">
          <div className="text-2xl font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
            {price} TND
          </div>
          { creator?.stars == null || creator?.stars == 0 
            ?
            ""
            :
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < creator.stars ? "text-yellow-500" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              <span className="text-sm font-medium text-gray-700">{creator.stars}/5</span>
            </div>
          }
        </div>
      </div>

      {/* Available seats & Vehicle details */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-xl ">
          {/* Vehicle Info */}
          <div >
            <div className="flex">
              <img 
                src={carImage} 
                alt={vehicleDetails.body} 
                className="w-12 h-12 object-contain" 
              />
              <div className="text-gray-800 text-lg font-semibold">
                {vehicleDetails.marque} {vehicleDetails.model}
              </div>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-600">Available Seats : <span className="font-bold text-gray-800">{availableSeats} </span> </span>
            </div>
            
          </div>
          



          <div className="flex items-center gap-2 ">
            
            
            <span className="text-sm text-gray-600">
              {maxTwoPassengersInBackSeats ? "👥 2 in the back" : ""}
            </span>

            <span className="text-sm text-gray-600">
              {heavyLuggage ? "🧳 Heavy Luggage" : ""}
            </span>

            <span className="text-sm text-gray-600">
              {smokingAllowed ? "🚬 Smoking Allowed" : ""}
            </span>

            <span className="text-sm text-gray-600">
              {petsAllowed ? "🐶 Pets Allowed" : ""}
            </span>

            <span className="text-sm text-gray-600">
              {airConditioning ? "❄️ Air Conditioning" : ""}
            </span>

          </div>
        </div>

      
      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center mb-3 sm:mb-0">
          <Avatar>
            <AvatarImage src={`${backendUri}${creator?.profilePicture}`} />
            <AvatarFallback className="select-none text-primary text-xl font-bold">{creator?.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="font-medium text-gray-800">{creator.name}</p>
            <p className="text-xs text-gray-500">{creator.profile.bio}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
          {withButton ? 
            <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium transition-colors duration-300 shadow-md">
              Book Ride
            </Button>
            : 
            ""
          }
          
        </div>
      </div>
    </div>
  );
};

export default RideCard;