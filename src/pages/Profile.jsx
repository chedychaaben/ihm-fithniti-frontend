import RideCard from "@/components/RideCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import ImageUpload from "@/components/ui/image-upload";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/context/AuthContext";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { Pencil, Star, Trash, ArrowLeft } from "lucide-react";
import { Fragment, useContext, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { toast } from "sonner";

const apiUri = import.meta.env.VITE_REACT_API_URI;
const backendUri = import.meta.env.VITE_REACT_BACKEND_URI;

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { loading, data, refetch } = useFetch(`users/${user?.user?._id}`, true);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      bio: "",
      age: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (newData) => {
    try {
      await axios.post(
        `${apiUri}/users/${user.user._id}`,
        {
          name: newData.name,
          profile: { ...data?.profile, bio: newData.bio, age: newData.age, phoneNumber: newData.phoneNumber },
        },
        { withCredentials: true }
      );
      await refetch();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Patch error:", error);
      toast.error("Failed to update profile");
    }
  };

  const GoBackButton = () => {
    navigate(-1);
  };

  // Reset form when data loads
  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        bio: data.profile?.bio || "",
        age: data.profile.age || "",
        phoneNumber: data.profile.phoneNumber || "",
      });
    }
  }, [data, reset]);

  if (!user) return <Navigate to="/" replace />;

  return (
    <main className="pb-12 md:py-14 px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <NavLink
        onClick={GoBackButton}
        className="flex items-center gap-2 mb-6 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </NavLink>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto">
        {/* Profile Section */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border">
          <div className="relative flex items-start gap-4 mb-8">
            {loading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <>
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`${backendUri}${data?.profilePicture}`} />
                    <AvatarFallback className="select-none text-primary text-xl font-bold">
                      {data?.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="absolute -bottom-1 -right-1 bg-background p-1.5 rounded-full shadow-sm border hover:bg-gray-100 transition-colors">
                        <Pencil size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <ImageUpload onSuccess={refetch} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-col space-y-1">
                  <p className="text-lg font-semibold">{data?.name}</p>
                  {data?.stars > 0 && (
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < data.stars
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {data.stars}/5
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold">About</h3>
            <div className="space-y-2 text-sm">
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
          </div>

          
        </div>

        {/* Rides Section */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-6">Edit Your Profile</h2>
          <div className="grid gap-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      required
                      autoComplete="name"
                      placeholder="Full name"
                      id="name"
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      placeholder="Tell us about yourself"
                      id="bio"
                      rows={4}
                      {...field}
                    />
                  )}
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="age"
                      placeholder="Age"
                      id="age"
                      {...field}
                    />
                  )}
                />
              </div>

              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="phoneNumber"
                      placeholder="Phone Number"
                      id="phoneNumber"
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    reset();
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Toaster position="top-center" />
    </main>
  );
};

export default Profile;