import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { Button } from "@/components/ui/button"
//import { Cigarette, NoSmoking, PawPrint, Ban, Languages } from 'lucide-react';

const RideCard = ({details}) => {
  const {creator, origin, destination, startTime, endTime, price} = details;

  const formattedStartDate = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC', // makes sure it doesn't shift due to local timezone
  }).format(new Date(startTime));

  function getTime(dateTimeInput){
    const selectedDate = new Date(dateTimeInput);
    // Extract the time without seconds
    const hours = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();
    // Format the time as HH:mm
    return `${hours}:${minutes}`;
  }
  const [borderColor, setBorderColor] = useState('border-gray-300'); // default color

  return (
<div
  className={`relative rounded-xl my-4 p-5 border-2 transition-all duration-300 ${borderColor} bg-white shadow-sm hover:shadow-md`}
  onMouseOver={() => setBorderColor('border-blue-400')}
  onMouseOut={() => setBorderColor('border-gray-200')}
>
  {/* Date badge */}
  <div className="absolute -top-3 left-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
    {formattedStartDate}
  </div>

  {/* Main content */}
  <div className="flex flex-col md:flex-row gap-6">
    {/* Timeline section */}
    <div className="flex-1">
      <div className="relative border-s border-gray-300 ps-6">
        {/* Origin */}
        <div className="mb-6 relative">
          {/* Removed blue dot */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
            <time className="text-sm font-medium text-gray-500 min-w-[60px]">{getTime(startTime)}</time>
            <h3 className="text-lg font-semibold text-gray-800">{origin.place}</h3>
          </div>
        </div>

        {/* Destination */}
        <div className="mb-6 relative">
          {/* Removed green dot */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
            <time className="text-sm font-medium text-gray-500 min-w-[60px]">{getTime(endTime)}</time>
            <h3 className="text-lg font-semibold text-gray-800">{destination.place}</h3>
          </div>
        </div>
      </div>

      {/* Rating and price (mobile) */}
      <div className="md:hidden flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-yellow-50 px-2.5 py-1 rounded-full">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs font-medium text-gray-700 ml-1">4/5</span>
          </div>
          <span className="text-xs text-gray-500 hidden sm:inline">Excellent</span>
        </div>

        <div className="text-xl font-bold text-blue-600">
          {price} TND
        </div>
      </div>
    </div>

    {/* Price section (desktop) */}
    <div className="hidden md:flex flex-col items-end justify-between">
      <div className="text-2xl font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
        {price} TND
      </div>

      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-sm font-medium text-gray-700">4/5</span>
      </div>
    </div>
  </div>
{/* Footer with driver info, ride preferences, and book button */}
<div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-100">
  {/* Driver Info */}
  <div className="flex items-center mb-3 sm:mb-0">
    <Avatar className="w-10 h-10">
      <AvatarImage src={creator.avatar || "https://github.com/shadcn.png"} />
      <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="ml-3">
      <p className="font-medium text-gray-800">{creator.name}</p>
      <p className="text-xs text-gray-500">Verified driver</p>
    </div>
  </div>

  {/* Preferences + Button */}
  <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
    {/* No Smoking */}
    <div className="flex items-center text-sm text-gray-500 gap-1">
      🚭 <span className="hidden sm:inline">No smoking</span>
    </div>

    {/* No Pets */}
    <div className="flex items-center text-sm text-gray-500 gap-1">
      🐾❌ <span className="hidden sm:inline">No pets</span>
    </div>

    {/* Quiet Ride */}
    <div className="flex items-center text-sm text-gray-500 gap-1">
      🔇 <span className="hidden sm:inline">Quiet ride</span>
    </div>

    {/* Book Button */}
    <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors duration-300 shadow-sm">
      Book Ride
    </Button>
  </div>
</div>





</div>

  )
}

export default RideCard