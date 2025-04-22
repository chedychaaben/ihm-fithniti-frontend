
import useFetch from "@/hooks/useFetch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const backendUri = import.meta.env.VITE_REACT_BACKEND_URI;

const Review = ({ review }) => {
  const userId = review.reviewOwner;
  const {
    loading: userLoading,
    data: userData,
    refetch: userRefetch,
  } = useFetch(`users/${userId}`);

  if (userLoading || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      key={review._id}
      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm space-y-2"
    >

      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={`${backendUri}/uploads/${userData.profilePicture}`} />
          <AvatarFallback className="text-xs">
            {userData.name?.[0] || "?"}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium">{userData.name}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < review.rate ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}
            />
          ))}
          <span className="text-sm text-gray-600 dark:text-gray-300">{review.rate}/5</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(review.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      <p className="text-sm text-gray-800 dark:text-gray-100">
        {review.comment ? review.comment : <em className="text-muted-foreground">No comment left</em>}
      </p>
    </div>
  );
};

export default Review;
