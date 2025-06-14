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
import PublishCarCard from "@/components/PublishCarCard";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"

const apiUri = import.meta.env.VITE_REACT_API_URI;
const backendUri = import.meta.env.VITE_REACT_BACKEND_URI;

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { loading, data, refetch } = useFetch(`users/${user?.user?._id}`, true);
  const [cars, setCars] = useState([]);
  
  const [carToDelete, setCarToDelete] = useState(null)
  const [loadingCars, setLoadingCars] = useState(true);


  
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [cinImageUrl, setCinImageUrl] = useState('');
    const [permisImageUrl, setPermisImageUrl] = useState('');
  
    const handleProfileImageUpload = (url) => {
      setProfileImageUrl(url);
    };
    const handleCinImageUpload = (url) => {
      setCinImageUrl(url);
    };
    const handlePermisImageUpload = (url) => {
      setPermisImageUrl(url);
    };


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

  const fetchCars = async () => {
    try {
      setLoadingCars(true);
      const res = await fetch(`${apiUri}/cars/getmycars`, {
        credentials: "include", // since your `useFetch` has `withCredentials: true`
      });
      const data = await res.json();
      setCars(data);
    } catch (err) {
      console.error("Failed to fetch cars:", err);
    } finally {
      setLoadingCars(false);
    }
  };

  const deleteCar = async (carId) => {
    try {
      setLoadingCars(true); // Optional: if you want to indicate a loading state
      const res = await fetch(`${apiUri}/cars/${carId}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      const data = await res.json();
  
      if (res.ok) {
        // Remove the deleted car from state
        setCars(prevCars => prevCars.filter(car => car._id !== carId));
        toast("Car deleted!", {
          style: {
            background: '#D1FAE5', // light green
            color: '#065F46',      // dark green text
            border: '#065F46'
          },
        });
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (err) {
      console.error("Error deleting car:", err);
    } finally {
      setLoadingCars(false);
    }
  };

  const getCarImageByBodyName = (value) => {
    return carTypes.find((carType) => carType.value === value)?.image;
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      bio: "",
      age: "",
      phoneNumber: "",
      cinPicture: "",
      permisPicture: "",
    },
  });
  

  const onSubmit = async (newData) => {
    try {
      await axios.post(
        `${apiUri}/users/${user.user._id}`,
        {
          name: newData.name,
          profile: { ...data?.profile, bio: newData.bio, age: newData.age, phoneNumber: newData.phoneNumber },
          cinPicture: cinImageUrl,
          permisPicture: permisImageUrl
        },
        { withCredentials: true }
      );
      await refetch();
      toast("Profile updated successfully", {
        style: {
          background: '#D1FAE5', // light green
          color: '#065F46',      // dark green text
          border: '#065F46'
        },
      });
      window.location.reload()
    } catch (error) {
      console.error("Patch error:", error);
      toast("Failed to update profile", {
        style: {
          background: '#FEE2E2', // light red
          color: '#991B1B',      // dark red text
          border: '#991B1B'
        },
      });
    }
    
  };

  const handleUpdateProfilePicture = async (e) => {
    const formData = new FormData();
    formData.append("fileNameInUploadsFolder", profileImageUrl);

    try {
      const res = await axios.post(`${apiUri}/users/update-profile-image`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      console.log("Upload successful:", res.data);
      window.location.reload();
      toast("Image Updated !", {
        style: {
          background: '#D1FAE5', // light green
          color: '#065F46',      // dark green text
          border: '#065F46'
        }
      });
    } catch (err) {
      console.error("Update failed:", err);
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
        cinPicture: data.cinPicture || "",
        permisPicture: data.permisPicture || "",
      });
    }
    
    fetchCars();
  }, [data, reset]);

  if (!user) return <Navigate to="/" replace />;

  return (
    <main className="pb-12 md:py-14 px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <NavLink
        onClick={GoBackButton}
        className="flex items-center gap-2 mb-6 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
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
                    <AvatarImage src={`${backendUri}/uploads/${data?.profilePicture}`} />
                    <AvatarFallback className="select-none text-primary text-xl font-bold">
                      {data?.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="absolute -bottom-1 -right-1 bg-background p-2 rounded-full shadow-md border border-transparent hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary">
                        <Pencil size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white rounded-md shadow-lg p-2">
                      <DropdownMenuItem asChild>
                        <ImageUpload onUploadSuccess={handleProfileImageUpload} image={"profile"}/>
                      </DropdownMenuItem>

                      {profileImageUrl === '' ? null : (
                        <DropdownMenuItem asChild>
                          <Button 
                            className="w-full text-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200 ease-in-out cursor-pointer"
                            onClick={(e) => handleUpdateProfilePicture(e)}
                          >
                            Save Profile Image
                          </Button>
                        </DropdownMenuItem>
                      )}
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
          {
            loadingCars || cars.length===0 ? 
            ""
            :
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold">Cars</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="flex flex-wrap gap-4">
                    {cars.map((car, index) => (
                      <div key={index} className="flex items-center justify-center text-gray-800 text-lg font-semibold">
                        <img 
                          src={getCarImageByBodyName(car.body)}
                          alt={car.body}
                          className="w-12 h-12 object-contain" 
                        />
                        <span>
                          {car.marque} {car.model}
                        </span>
                        
                        {car?.carPicture ? 
                          <img 
                            src={`${backendUri}/uploads/${car?.carPicture}`}
                            alt={car?.carPicture}
                            className="w-12 h-12 object-contain" 
                          />
                          :
                          ""
                        }
                        
                        <div className="flex justify-end w-full mt-2">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setCarToDelete(car._id)}
                                className="text-destructive hover:bg-destructive/10"
                              >
                                <Trash size={20} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to delete {car.body} {car.marque} {car.model} ?</AlertDialogTitle>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive hover:bg-destructive/90 text-white"
                                  onClick={() => deleteCar(car._id)}
                                >
                                  Yes, Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
            </div>
          }
          
        </div>

        {/* Rides Section */}
        <div className="w-full bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border">
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
                <Label htmlFor="age">Age</Label>
                <Controller
                  name="age"
                  control={control}
                  rules={{ 
                    validate: value => value > 18 || "Age must be more than 18"
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        autoComplete="age"
                        placeholder="Age"
                        id="age"
                        {...field}
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-sm">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
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
              
              <div className="space-y-2">
                <Label htmlFor="idCard">Identity Card Picture</Label>
                {data?.cinPicture ?
                <img
                  src={`${backendUri}/uploads/${data?.cinPicture}`}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full border-4 border-emerald-100 shadow-md"
                />
                :
                "No Identity Card"
                }
                <ImageUpload onUploadSuccess={handleCinImageUpload} image={"cin"}/>
                                      
              </div>


              <div className="space-y-2">
                <Label htmlFor="license">Driver License Picture</Label>
                {data?.permisPicture ?
                <img
                  src={`${backendUri}/uploads/${data?.permisPicture}`}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full border-4 border-emerald-100 shadow-md"
                />
                :
                "No Driver Licence"
                } 
                <ImageUpload onUploadSuccess={handlePermisImageUpload} image={"permis"}/>
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