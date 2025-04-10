import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { Button } from "@/components/ui/button"

const RideCard = ({ details }) => {
  const { creator, origin, destination, startTime, endTime, price } = details;

  const formattedStartDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(startTime));

  function getTime(dateTimeInput) {
    const selectedDate = new Date(dateTimeInput);
    const hours = selectedDate.getHours().toString().padStart(2, '0');
    const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const [borderColor, setBorderColor] = useState("border-gray-200");

  return (
    <div
      className={`relative rounded-2xl my-4 p-6 border-2 transition-all duration-300 ${borderColor} bg-white shadow-md hover:shadow-lg`}
      onMouseOver={() => setBorderColor("border-blue-500")}
      onMouseOut={() => setBorderColor("border-gray-200")}
    >
      {/* Date badge */}
      <div className="absolute -top-3 left-4 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
        {formattedStartDate}
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

          {/* Rating and price (mobile) */}
          <div className="md:hidden flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < 4 ? "text-yellow-500" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs font-medium text-gray-700 ml-2">4/5</span>
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
                className={`w-4 h-4 ${i < 4 ? "text-yellow-500" : "text-gray-300"}`}
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

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-100">
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

        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
          <span className="text-lg" title="Baggage">🧳</span>
          <span className="text-lg" title="Max 2 in back">👥</span>
          <span className="text-lg" title="No Smoking">🚬❌</span>
          <span className="text-lg" title="No Pets">🐾❌</span>
          <span className="text-lg" title="Air Conditioning">❄️</span>

          <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium transition-colors duration-300 shadow-md">
            Book Ride
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RideCard;