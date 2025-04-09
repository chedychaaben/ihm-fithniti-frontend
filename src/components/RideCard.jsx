import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { Button } from "@/components/ui/button"

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
      className={`container rounded-2xl my-3 p-4 border ${borderColor}`}
      onMouseOver={() => setBorderColor('border-blue-500')} // or any hover color
      onMouseOut={() => setBorderColor('border-gray-300')} // revert back
    >
      <h1 className="absolute font-semibold">{formattedStartDate}</h1>
      <br />
      <div className="relative border-s sm:mx-5">
        <div className="mx-5 mb-6 ms-4">
          <div className="absolute -z-0 w-3 h-3 bg-accent rounded-full mt-1.5 -start-1.5"></div>
          <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">{getTime(startTime)}</time>
          <h3 className="text-md md:text-lg font-semibold">{origin.place}</h3>
        </div>
        <div className="mx-5 mb-6 ms-4">
          <div className="absolute -z-0 w-3 h-3 bg-accent rounded-full mt-1.5 -start-1.5"></div>
          <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">{getTime(endTime)}</time>
          <h3 className="text-md md:text-lg font-semibold">{destination.place}</h3>
        </div>
        <h1 className="absolute -z-0 text-lg md:text-2xl font-bold top-0 right-0">{price} TND</h1>
      </div>
      <div className="flex justify-between">
        <div className="inline-flex items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
          <span className="flex-grow flex flex-col pl-4">
            <span className="title-font font-medium">{creator.name}</span>
            <span className="text-muted-foreground text-xs tracking-widest mt-0.5">{creator.name}</span>
          </span>
        </div>
        <Button>Book Ride</Button>
      </div>
    </div>
  )
}

export default RideCard