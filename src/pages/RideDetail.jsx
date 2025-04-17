import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Toaster } from "@/components/ui/sonner"
import useFetch from "@/hooks/useFetch"
import { MoveDown, MoveRight, Star, ArrowLeft } from "lucide-react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { format, formatDistance } from "date-fns";
import axios from "axios"
import { NavLink, useNavigate} from "react-router-dom"

const apiUri = import.meta.env.VITE_REACT_API_URI

const RideDetail = () => {
  
  const navigate = useNavigate();
  
  const { rideId } = useParams();
  const { loading, data, error } = useFetch(`rides/${rideId}`);

  const handleBook = async() => {
    try{
      const res = await axios.get(`${apiUri}/rides/${rideId}/join`, {withCredentials: true})
      toast(res, {
        description: format(new Date(), "PPp"),
      });
    }catch(err){
      console.log(err)
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

  return (
    <main className="pb-12 md:py-14 px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <NavLink onClick={GoBackButton} className="flex items-center gap-2 mr-5 hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
          Retour
      </NavLink>
      <div className="flex flex-col gap-8 md:flex-row jusitfy-center w-full">
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center w-full py-8 pb-4">
            <div className="flex flex-col space-y-2 ">
              <h1 className="text-3xl font-semibold leading-7 lg:leading-9">{data?.origin.place}</h1>
              <p className="text-base font-medium leading-6 text-muted-foreground">
              {data && new Intl.DateTimeFormat("en-US", {weekday: "long",day: "numeric",month: "long",timeZone: "UTC",}).format(new Date(data?.startTime)) }
              </p>
            </div>
            <MoveRight size={32} className="hidden sm:block" />
            <MoveDown size={32} className="block sm:hidden" />
            <div className="flex flex-col space-y-2 ">
              <h1 className="text-3xl font-semibold leading-7 lg:leading-9">{data?.destination.place}</h1>
              <p className="text-base font-medium leading-6 text-muted-foreground">
              {data && new Intl.DateTimeFormat("en-US", {weekday: "long",day: "numeric",month: "long",timeZone: "UTC",}).format(new Date(data?.endTime)) }
              </p>
            </div>
          </div>
          
          
          

          <div className="w-full py-3 border-t">
            <p className="text-base">{data && data.vehicleDetails.marque} {data && data.vehicleDetails.model} ({data && data.vehicleDetails.body})</p>
          </div>
          <div className="w-full py-3 border-t">
            <p>Duration: {data && formatDistance(new Date(data.startTime), new Date(data.endTime))}</p>
          </div>
          <div className="w-full py-3 border-t">
            <p className="text-base">Available Seats: {data?.availableSeats}</p>
          </div>
          <div className="w-full py-3 border-t">
            <p className="text-base">Total Price for 1 Passenger : {data?.price} TND</p>
          </div>
          
          <div>
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
          </div>
        </div>
        <div className="w-full sm:w-96 flex p-0 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-xl font-semibold leading-5">Rider Details</h3>
          <div className="flex flex-col justify-start items-stretch h-full w-full">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex w-full space-x-4 py-8 border-b">
                <Avatar>
                  <AvatarImage src={data?.profilePicture}/>
                  <AvatarFallback className="select-none text-primary text-xl font-bold">{data?.creator.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex justify-center items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4 text-left">{data?.creator.name}</p>
                  <div className="flex items-center text-sm gap-1 text-muted-foreground">
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
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-start flex-col space-y-4 mt-8">
                <p className="text-base font-semibold leading-4 text-center md:text-left">About the Driver</p>
                <p className="text-sm text-muted-foreground"><span className="font-bold">{data?.creator.ridesCreated?.length}</span> Rides published</p>
                <p className="text-sm text-muted-foreground">
                  Member since  <span className="font-bold"> {new Date(data?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
};

export default RideDetail