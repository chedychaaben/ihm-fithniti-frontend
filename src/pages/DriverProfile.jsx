import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Pencil, Star, Trash, ArrowLeft } from "lucide-react";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import Review from "@/components/Review";

const apiUri = import.meta.env.VITE_REACT_API_URI;
const backendUri = import.meta.env.VITE_REACT_BACKEND_URI;


const DriverProfile = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const { loading, data, refetch } = useFetch(`users/${driverId}`, true);
  const { loading: reviewLoading, data: reviewData, error, refetch: reviewRefetch } = useFetch(`reviews/user/${driverId}`);


  return (
    <main className="pb-16 md:py-16 px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <NavLink
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </NavLink>

      <section className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md border flex flex-col items-center text-center space-y-6">
        {/* Avatar & Basic Info */}
        <div className="relative flex flex-col items-center gap-4">
          {loading ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-14 w-14 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            <>
              <Avatar className="h-20 w-20 shadow-sm">
                <AvatarImage src={`${backendUri}/uploads/${data?.profilePicture}`} />
                <AvatarFallback className="text-primary text-xl font-bold">
                  {data?.name?.[0]}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-xl font-semibold">{data?.name}</p>
                {reviewData?.score > 0 && (
                  <div className="flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < reviewData?.score ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}
                      />
                    ))}
                    <span className="text-sm text-gray-700 dark:text-gray-300">{reviewData?.score}/5</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* About Section */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-muted-foreground">
            <span className="font-medium">{data?.ridesCreated?.length || 0}</span> rides published
          </p>
          <p className="text-muted-foreground">
            Member since{" "}
            <span className="font-medium">
              {data?.createdAt &&
                new Date(data.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
            </span>
          </p>
        </div>

        {/* Profile Details */}
        <div className="flex flex-col items-start text-left space-y-3 w-full max-w-md mt-4">
          {data?.ridesCreated?.length > 0 && (
            <p className="text-sm text-muted-foreground">
              <strong>{data.ridesCreated.length}</strong> Rides published
            </p>
          )}
          {data?.profile?.bio && (
            <p className="text-sm text-muted-foreground">{data.profile.bio}</p>
          )}
          {data?.profile?.age && (
            <p className="text-sm text-muted-foreground">
              <strong>{data.profile.age}</strong> Years old
            </p>
          )}
          {data?.profile?.phoneNumber && (
            <p className="text-sm text-muted-foreground">
              <strong>+216 </strong>{data.profile.phoneNumber}
            </p>
          )}
        </div>

        {/* Reviews Section */}
              {reviewData?.reviews?.length}
        {reviewData?.reviews?.length > 0 && (
          <div className="w-full max-w-2xl mt-10 space-y-6">
            <h3 className="text-lg font-semibold">Reviews</h3>
            <div className="space-y-4">
              {reviewData.reviews.map((review) => (
                <Review review={review} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>

  );
};


export default DriverProfile;
