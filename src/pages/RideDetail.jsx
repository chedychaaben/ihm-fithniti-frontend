import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Toaster } from "@/components/ui/sonner"
import useFetch from "@/hooks/useFetch"
import { MoveDown, MoveRight, Star, ArrowLeft } from "lucide-react"
import LoginSignupDialog from "../components/LoginSignupDialog";
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { format, formatDistance } from "date-fns";
import { Sun, Moon } from "lucide-react";
import axios from "axios"
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { NavLink, useNavigate} from "react-router-dom"
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";


import tunisImg from "@/assets/cities/tunis.jpg";
import arianaImg from "@/assets/cities/ariana.jpg";
import benArousImg from "@/assets/cities/ben-arous.jpg";
import manoubaImg from "@/assets/cities/manouba.jpg";
import nabeulImg from "@/assets/cities/nabeul.jpg";
import zaghouanImg from "@/assets/cities/zaghouan.jpg";
import bizerteImg from "@/assets/cities/bizerte.jpg";
import bejaImg from "@/assets/cities/beja.jpg";
import jendoubaImg from "@/assets/cities/jendouba.jpg";
import kefImg from "@/assets/cities/kef.jpg";
import silianaImg from "@/assets/cities/siliana.jpg";
import sousseImg from "@/assets/cities/sousse.jpg";
import monastirImg from "@/assets/cities/monastir.jpg";
import mahdiaImg from "@/assets/cities/mahdia.jpg";
import kairouanImg from "@/assets/cities/kairouan.jpg";
import kasserineImg from "@/assets/cities/kasserine.jpg";
import sidiBouzidImg from "@/assets/cities/sidi-bouzid.jpg";
import sfaxImg from "@/assets/cities/sfax.jpg";
import gabesImg from "@/assets/cities/gabes.jpg";
import medenineImg from "@/assets/cities/medenine.jpg";
import tataouineImg from "@/assets/cities/tataouine.jpg";
import gafsaImg from "@/assets/cities/gafsa.jpg";
import tozeurImg from "@/assets/cities/tozeur.jpg";
import kebiliImg from "@/assets/cities/kebili.jpg";

import defaultImg from "@/assets/cities/default.jpg";


const apiUri = import.meta.env.VITE_REACT_API_URI
const backendUri = import.meta.env.VITE_REACT_BACKEND_URI


const RideDetail = () => {
  
  const {user, dispatch} = useContext(AuthContext)
  const navigate = useNavigate();
  
  const { rideId } = useParams();
  const { loading, data, error } = useFetch(`rides/${rideId}`);

  const handleBook = async () => {
    try {
      const res = await axios.get(`${apiUri}/rides/${rideId}/join`, { withCredentials: true });
  
      // Log the response to see what is returned (you might need to check the status code or data)
  
      if (res.status === 200) {  // Check for 200 or another expected status
        toast.success("Successfully booked the ride!", {
          description: format(new Date(), "PPp"),
        });
      } else {
        toast.warning("Failed to book the ride. Unexpected status code.");
      }
  
    } catch (err) {
      console.error(err);
      toast.warning(err?.response?.data?.message || err.message || "An error occurred while booking.");
    }
  };
  
  const GoBackButton = () => {
    navigate(-1);
  };

  if (loading) {
    return <Skeleton className="w-full" />;
  }

  if (error) {
    return <h3 className="text-xl p-10 text-center h-svh">Error: {error.message || "ride not found"}</h3>;
  }
  
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  
  const formatCityName = (city) => {
    if (!city) return "default"; // fallback key for default image
    return removeAccents(city.toLowerCase()).replace(/\s+/g, '').replace(/-/g, '');
  };
  
  const getImage = (city) => {
    const images = {
      tunis: tunisImg,
      ariana: arianaImg,
      benarous: benArousImg,
      manouba: manoubaImg,
      nabeul: nabeulImg,
      zaghouan: zaghouanImg,
      bizerte: bizerteImg,
      beja: bejaImg,
      jendouba: jendoubaImg,
      kef: kefImg,
      siliana: silianaImg,
      sousse: sousseImg,
      monastir: monastirImg,
      mahdia: mahdiaImg,
      kairouan: kairouanImg,
      kasserine: kasserineImg,
      sidiBouzid: sidiBouzidImg,
      sfax: sfaxImg,
      gabes: gabesImg,
      medenine: medenineImg,
      tataouine: tataouineImg,
      gafsa: gafsaImg,
      tozeur: tozeurImg,
      kebili: kebiliImg,
      default: defaultImg,
    };
  
    const formattedCity = formatCityName(city);
  
    return images[formattedCity] || images.default;
  };
  
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

  
  const getCarImageByBodyName = (value) => {
    return carTypes.find((carType) => carType.value === value)?.image;
  };
  return (
    <main className="pb-12 md:py-14 px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <NavLink onClick={GoBackButton} className="flex items-center gap-2 mr-5 hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
          Back
      </NavLink>
      <div className="flex flex-col gap-8 md:flex-row jusitfy-center w-full">
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center w-full py-8 pb-4">
            <div className="flex flex-col space-y-2 items-center">
              <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
                  {/* Badge Popular */}
                    <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Popular
                    </span>

                    {/* Image */}
                    {data?.origin?.place && (
                    <img
                      src={getImage(data.origin.place)}
                      alt={`Image of ${data.origin.place}`}
                      className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                    />
                  )}
                </div>
              <h1 className="text-3xl font-semibold leading-7 lg:leading-9">{data?.origin.place}</h1>
              <p className="text-base font-medium leading-6 text-muted-foreground">
              {data && new Intl.DateTimeFormat("en-US", {weekday: "long",day: "numeric",month: "long",timeZone: "UTC",}).format(new Date(data?.startTime)) }
              </p>
              
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <time className="text-sm font-medium text-gray-500 min-w-[60px] flex">
                    <span className="mr-1">
                      {getDatePeriod(data?.startTime)}
                    </span>
                    <span className="">
                      {getTime(data?.startTime)}
                    </span> 
                  </time>
                </div>
              </div>

            </div>
            <MoveRight size={32} className="hidden sm:block" />
            <MoveDown size={32} className="block sm:hidden" />


            <div className="flex flex-col space-y-2 items-center">
              <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
                  {/* Badge Popular */}
                    <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Popular
                    </span>

                    {/* Image */}
                    {data?.destination?.place && (
                    <img
                      src={getImage(data.destination.place)}
                      alt={`Image of ${data.destination.place}`}
                      className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                    />
                  )}
                </div>
              <h1 className="text-3xl font-semibold leading-7 lg:leading-9">{data?.destination?.place}</h1>
              <p className="text-base font-medium leading-6 text-muted-foreground">
              {data && new Intl.DateTimeFormat("en-US", {weekday: "long",day: "numeric",month: "long",timeZone: "UTC",}).format(new Date(data?.endTime)) }
              </p>

              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <time className="text-sm font-medium text-gray-500 min-w-[60px] flex">
                    <span className="mr-1">
                      {getDatePeriod(data?.endTime)}
                    </span>
                    <span className="">
                      {getTime(data?.endTime)}
                    </span> 
                  </time>
                </div>
              </div>

            </div>
          </div>
                    

          <div className="w-full py-3 border-t">
            <div className="flex justify-between">
              <div>
                <img
                  src={getCarImageByBodyName(data?.vehicleDetails?.body) || '/default-car-image.jpg'} // Fallback to default image if the body is missing
                  alt={data?.vehicleDetails?.body || "Car Image"} // Fallback alt text
                  className="w-12 h-12 object-contain"
                />
                <span>
                  {data?.vehicleDetails?.marque ?? "Unknown Marque"} {data?.vehicleDetails?.model ?? "Unknown Model"}
                </span>
              </div>

                <div>
                  <span className="text-sm text-gray-600 mr-1">
                    {data?.maxTwoPassengersInBackSeats ? "👥 2 in the back" : ""}
                  </span>

                  <span className="text-sm text-gray-600 mr-1">
                    {data?.heavyLuggage ? "🧳 Heavy Luggage" : ""}
                  </span>

                  <span className="text-sm text-gray-600 mr-1">
                    {data?.smokingAllowed ? "🚬 Smoking Allowed" : ""}
                  </span>

                  <span className="text-sm text-gray-600 mr-1">
                    {data?.petsAllowed ? "🐶 Pets Allowed" : ""}
                  </span>

                  <span className="text-sm text-gray-600 mr-1">
                    {data?.airConditioning ? "❄️ Air Conditioning" : ""}
                  </span>
                </div>
            </div>

          </div>

          <div className="w-full py-3 border-t">
            <p>
              Duration: {data?.startTime && data?.endTime ? formatDistance(new Date(data.startTime), new Date(data.endTime)) : "N/A"}
            </p>
          </div>

          <div className="w-full py-3 border-t">
            <p className="text-base">
              Available Seats: {data?.availableSeats ?? "N/A"} {/* Fallback to N/A if availableSeats is not available */}
            </p>
          </div>

          <div className="w-full py-3 border-t">
            <p className="text-base">
              Total Price for 1 Passenger: {data?.price ? `${data.price} TND` : "N/A"} {/* Fallback to N/A if price is not available */}
            </p>
          </div>
          
          
          <div>
          {
            !user ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Book Ride</Button>
                </DialogTrigger>
                <LoginSignupDialog />
              </Dialog>
            ) : (
              <>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>Book Ride</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm your booking</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure to confirm your ride? This action will finalize your participation in the shared journey.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleBook}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )
          }


          </div>
        </div>
        <div className="w-full sm:w-96 flex p-0 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-xl font-semibold leading-5">Driver Details</h3>
          <div className="flex flex-col justify-start items-stretch h-full w-full">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex w-full space-x-4 py-8 border-b">
                <Avatar>
                  <AvatarImage src={`${backendUri}${data?.creator?.profilePicture}`} />
                  <AvatarFallback className="select-none text-primary text-xl font-bold">{data?.creator?.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex justify-center items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4 text-left">{data?.creator.name}</p>
                  <div className="flex items-center text-sm gap-1 text-muted-foreground">
                    { data?.creator?.stars == null || data?.creator?.stars == 0 
                        ?
                        ""
                        :
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < data?.creator.stars ? "text-yellow-500" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          <span className="text-sm font-medium text-gray-700">{data?.creator.stars}/5</span>
                        </div>
                      }
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center items-start flex-col space-y-4 mt-8">
                <p className="text-base font-semibold leading-4 text-center md:text-left">About the Driver</p>

                {data?.creator?.ridesCreated?.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold">{data.creator.ridesCreated.length}</span> Rides published
                  </p>
                )}

                {data?.creator?.profile?.bio && (
                  <p className="text-sm text-muted-foreground">{data.creator.profile.bio}</p>
                )}

                {data?.creator?.profile?.age && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold">{data.creator.profile.age}</span> Years old
                  </p>
                )}

                {data?.creator?.profile?.phoneNumber && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold">+216 </span>{data.creator.profile.phoneNumber}
                  </p>
                )}

                {data?.createdAt && (
                  <p className="text-sm text-muted-foreground">
                    Member since
                    <span className="font-bold"> {new Date(data.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RideDetail