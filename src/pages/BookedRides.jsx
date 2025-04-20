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
  
  // 👉 Modal and Review states (MOVED inside the component)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentRideId, setCurrentRideId] = useState(null);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRate, setReviewRate] = useState(5);

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
              {paginatedRides.map((ride) => (
                <Fragment key={ride._id}>
                  <RideCard creator={user.user} details={ride} pageOrigin={"booked-rides"} />

                  {/* 👉 Add Make Review Button */}
                  <Button
                    variant="default"
                    className="mt-2"
                    onClick={() => {
                      setCurrentRideId(ride._id);
                      setIsReviewModalOpen(true);
                    }}
                  >
                    Make Review
                  </Button>
                </Fragment>
              ))}

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

      {/* 👉 Modal */}
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

      <Toaster position="top-center" />
    </main>
  );
};

export default BookedRides;
