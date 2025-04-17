import RideCard from "@/components/RideCard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Toaster } from "@/components/ui/sonner"
import { Textarea } from "@/components/ui/textarea"
import { AuthContext } from "@/context/AuthContext"
import useFetch from "@/hooks/useFetch"
import axios from "axios"
import { Pencil, Star, Trash, ArrowLeft } from "lucide-react"
import { Fragment, useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Navigate, useNavigate, NavLink } from "react-router-dom"
import { toast } from "sonner"

const apiUri = import.meta.env.VITE_REACT_API_URI

const BookedRides = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)

  const [editMode, setEditMode] = useState(false)
  const {loading, data, refetch} = useFetch(`users/${user.user._id}`, true)

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      bio: "",
    },
  })

  const onSubmit = async (newData) => {
    try {
      await axios.patch(`${apiUri}/users/${user.user._id}`, {
        name: newData.name,
        profile: {...data.profile, bio: newData.bio}
      }, {withCredentials:true});
      refetch();
      reset()
      setEditMode(false)
    } catch (error) {
      console.error('Patch error:', error);
    }
  }

  async function handleDelete(id){
    try {
      await axios.delete(`${apiUri}/rides/${id}`, {withCredentials:true});
      refetch();
      toast("The ride has been Deleted")
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
  const GoBackButton = () => {
    navigate(-1);
  };
  if(!user) return <Navigate to="/" replace />;

  return (
    <main className="pb-12 md:py-14 px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <NavLink onClick={GoBackButton} className="flex items-center gap-2 mr-5 hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
          Retour
      </NavLink>
      <div className="flex flex-col sm:flex-row h-full w-full">
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="flex flex-col sm:flex-row h-full w-full justify-center items-center">
            <h1 className="text-xl font-semibold">Booked Rides</h1>
          </div>
            {data?.ridesJoined?.length === 0
              ? <h3>No rides</h3>
              :
              data?.ridesJoined?.map(ride => 
                <RideCard creator={user.user} details={ride} withButton={false} />
            )}
        </div>
        
      </div>
      <Toaster />
    </main>
  )
}

export default BookedRides