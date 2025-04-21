import RideCard from "@/components/RideCard";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { AuthContext } from "@/context/AuthContext";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { Fragment, useContext, useState } from "react";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { toast } from "sonner";

const apiUri = import.meta.env.VITE_REACT_API_URI;

const BookedRides = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { loading, data, refetch } = useFetch(`users/${user.user._id}`, true);

  async function handleDelete(id) {
    try {
      await axios.delete(`${apiUri}/rides/${id}`, { withCredentials: true });
      refetch();
      toast("The ride has been deleted.");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }


  const GoBackButton = () => {
    navigate(-1);
  }

  if (!user) return <Navigate to="/" replace />;

  const rides = data?.ridesJoined?.slice().reverse() || [];
  const totalPages = Math.ceil(rides.length / itemsPerPage);
  const paginatedRides = rides.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <main className="pb-12 md:py-14 px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <NavLink onClick={GoBackButton} className="flex items-center gap-2 mr-5 hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        Back
      </NavLink>

      <div className="flex flex-col sm:flex-row h-full w-full">
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="flex flex-col sm:flex-row h-full w-full justify-center items-center">
            <h1 className="text-xl font-semibold">Booked Rides</h1>
          </div>

          {rides.length === 0 ? (
            <h3>No rides</h3>
          ) : (
            <>
          {paginatedRides.map((ride) => {
  const startTime = new Date(ride.startTime);
  const now = new Date();
  const nineHoursBeforeStart = new Date(startTime.getTime() - 9 * 60 * 60 * 1000); // 9h before

  const canCancel = now < nineHoursBeforeStart;

  const handleCancel = async () => {
    if (!canCancel) {
      toast.error("You can't cancel this ride because it's too close to departure time.");
      return;
    }
  
    try {
      await axios.post(`${apiUri}/rides/${ride._id}/leave`, {}, { withCredentials: true });
      refetch();
      toast.success("Successfully cancelled your participation.");
    } catch (error) {
      console.error("Error cancelling ride:", error);
      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to cancel the ride.");
      }
    }
  };
  

  return (
    <Fragment key={ride._id}>
      <RideCard creator={user.user} details={ride} pageOrigin={"booked-rides"} />

      <div className="flex justify-end w-full mt-2">
        <Button
          variant="destructive"
          onClick={handleCancel}
          disabled={!canCancel}
        >
          Cancel Ride
        </Button>
      </div>
    </Fragment>
  );
})}


              {/* Pagination Controls */}
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <Toaster position="top-center" />
    </main>
  );
};

export default BookedRides;
