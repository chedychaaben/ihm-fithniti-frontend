import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import { format, formatDistance } from "date-fns";
import {  useEffect } from 'react';
import axios from "axios"
import { toast } from "sonner";

const apiUri = import.meta.env.VITE_REACT_API_URI

const RideCard = ({ to, creator, details, pageOrigin }) => {
  const { _id, origin, destination, availableSeats, startTime, endTime, price, maxTwoPassengersInBackSeats, smokingAllowed, heavyLuggage, petsAllowed, airConditioning, vehicleDetails, passengers } = details;
  
  const backendUri = import.meta.env.VITE_REACT_BACKEND_URI

  const [passengersData, setPassengersData] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentRideId, setCurrentRideId] = useState(null);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRate, setReviewRate] = useState(5);

  // Extract the date portion (ignoring time) by formatting them to 'YYYY-MM-DD'
  const startDateString = new Date(startTime).toISOString().split('T')[0]; // 'YYYY-MM-DD'
  const endDateString = new Date(endTime).toISOString().split('T')[0]; // 'YYYY-MM-DD'
  const similarDate = startDateString === endDateString;

  const formattedStartDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(startTime));

  function getTime(dateTimeInput) {
    const selectedDate = new Date(dateTimeInput);
    const hours = selectedDate.getUTCHours().toString().padStart(2, '0');
    const minutes = selectedDate.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  function getDatePeriod(dateTimeInput) {
    const selectedDate = new Date(dateTimeInput);
    const hours = selectedDate.getHours();
    const MORNING_START = 5;
    const MORNING_END = 17;
    return hours >= MORNING_START && hours < MORNING_END ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />;
  }


  const [borderColor, setBorderColor] = useState("border-gray-200");
  const [profileImage, setProfileImage] = useState(null);

  
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


  const disabled = pageOrigin === "search" && availableSeats === 0;

  const fetchPassengersData = async () => {
    try {
      const responses = await Promise.all(
        passengers.map(passenger_id =>
          axios.get(`${apiUri}/users/${passenger_id}`, { withCredentials: true })
        )
      );
  
      // Collect all the data from the responses
      const data = responses.map(res => res.data);
  
      setPassengersData(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  async function handleSubmitReview() {
    try {
      await axios.post(`${apiUri}/reviews`, {
        rideId: currentRideId,
        comment: reviewComment,
        rate: reviewRate
      }, { withCredentials: true });

      toast.success("Review submitted successfully!");
      setIsReviewModalOpen(false);
      setReviewComment('');
      setReviewRate(5);
      setCurrentRideId(null);
    } catch (error) {
      console.error("Failed to submit review", error);
      toast.error("Failed to submit review. Try again!");
    }
  }

  const fetchProfileImage = async (id) => {
    try {
      const response = await axios.get(`${apiUri}/users/get-profile-image/${id}`);
      setProfileImage(response.data.profilePicture);
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  useEffect(() => {
    fetchProfileImage(creator._id);
    fetchPassengersData();
  }, []);
  return (
    <Link
        to={disabled ? '#' : to}
        className={`w-full ${disabled ? 'disabled' : ''}`}
        style={{
          cursor:
            disabled
              ? 'not-allowed'
              : pageOrigin !== 'search'
              ? 'default'
              : 'pointer',
        }}
        onClick={disabled ? (e) => e.preventDefault() : null}
      >
      <div
        className={`relative rounded-xl w-full my-4 p-6 border-2 transition-all duration-300 ${disabled ? 'border-gray-300 bg-gray-100 text-gray-500 pointer-events-none opacity-60' : borderColor} bg-white shadow-md hover:shadow-lg`}
        onMouseOver={() => setBorderColor("border-blue-500")}
        onMouseOut={() => setBorderColor("border-gray-200")}
      >
        {/* Date badge */}
        <div className="absolute -top-3 left-4 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
          {similarDate ? (
            formattedStartDate
          ) : (
            // If the dates are different, show both dates
            `${formattedStartDate} - ${new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              timeZone: "UTC",
            }).format(new Date(endTime))}`
          )}
        </div>
        
        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Timeline section */}
          <div className="flex-1">
            <div className="relative border-s border-gray-200 ps-6 h-full flex flex-col justify-center">
              {/* Origin */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <time className="text-sm font-medium text-gray-500 min-w-[60px] flex">
                    <span className="mr-1">
                      {getDatePeriod(startTime)}
                    </span>
                    <span className="">
                      {getTime(startTime)}
                    </span> 
                  </time>
                  <h3 className="text-lg font-semibold text-gray-800 capitalize">{origin.place}</h3>
                </div>
              </div>

              {/* Destination */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <time className="text-sm font-medium text-gray-500 min-w-[60px] flex">
                    <span className="mr-1">
                      {getDatePeriod(endTime)}
                    </span>
                    <span className="">
                      {getTime(endTime)}
                    </span> 
                  </time>
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
                <div className="text-gray-800 text-lg font-semibold ml-2 mt-2">
                  {vehicleDetails.marque} {vehicleDetails.model}
                </div>
              </div>


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
            
            
            <div className="flex items-center gap-2 ">
              
              <div className="flex flex-col gap-3 p-4 rounded-xl bg-gray-10 shadow-sm">
                  <div className="text-sm font-semibold text-gray-600">
                    Available Seats: <span className="font-bold text-gray-800 ml-1">{availableSeats}</span>
                  </div>

                  { passengersData.length === 0 ? "" 
                  :
                    <div>
                      <span className="text-sm font-semibold text-gray-600 block mb-1">Passengers:</span>
                      <ul className="flex flex-wrap gap-3">
                        {passengersData.map(user => (
                          <li key={user._id}>
                            <Avatar>
                              <AvatarImage src={`${backendUri}/uploads/${user?.profilePicture}`} />
                              <AvatarFallback className="select-none text-primary text-xl font-bold">
                                {user?.name[0]}
                              </AvatarFallback>
                            </Avatar>
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                  
                  <div className="w-full py-3 border-t">
                    <p>
                      Duration: {startTime && endTime ? formatDistance(new Date(startTime), new Date(endTime)) : "N/A"}
                    </p>
                  </div>

                </div>
              
            </div>
          </div>

        
        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center mb-3 sm:mb-0">
            <Avatar>
              <AvatarImage src={`${backendUri}/uploads/${profileImage}`} />
              <AvatarFallback className="select-none text-primary text-xl font-bold">{creator?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-medium text-gray-800">{creator.name}</p>
              { creator?.stars == null || creator?.stars == 0 || pageOrigin === "published-rides"
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
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            {pageOrigin === "search" && !disabled ? 
              <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium transition-colors duration-300 shadow-md">
                Book Ride
              </Button>
              : 
              ""
            }
            {disabled ?
               <div class="pointer-events-auto opacity-100 text-black">
                FULL
              </div>
              :
              ""
            }

            {pageOrigin === "booked-rides" ? 
            <>
              {isReviewModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-lg font-bold mb-4">Write a Review</h2>

                    <textarea
                      className="w-full p-2 border rounded mb-4"
                      placeholder="Your review..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                    />

                    <select
                      className="w-full p-2 border rounded mb-4"
                      value={reviewRate}
                      onChange={(e) => setReviewRate(Number(e.target.value))}
                    >
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsReviewModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitReview}>
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              <Button
                variant="default"
                className="mt-2"
                onClick={() => {
                  setCurrentRideId(_id);
                  setIsReviewModalOpen(true);
                }}
              >
                Make Review
              </Button>
            </>
              :
              ""
            }

          </div>
        </div>
        
      </div>
    </Link>
  );
};

export default RideCard;