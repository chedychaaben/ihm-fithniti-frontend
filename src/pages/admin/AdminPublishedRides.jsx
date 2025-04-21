import RideCard from "@/components/RideCard"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { AuthContext } from "@/context/AuthContext"
import useFetch from "@/hooks/useFetch"
import axios from "axios"
import { Trash, ArrowLeft, Loader2 } from "lucide-react"
import { Fragment, useContext, useState } from "react"
import { Navigate, useNavigate, NavLink } from "react-router-dom"
import { toast } from "sonner"

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

const apiUri = import.meta.env.VITE_REACT_API_URI

const AdminPublishedRides = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [rideToDelete, setRideToDelete] = useState(null)
  const { 
    loading, 
    data: apiData, 
    error, 
    refetch 
  } = useFetch('rides/all', true)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  // Safely extract rides data
  const rides = Array.isArray(apiData) ? apiData : 
               (apiData?.rides && Array.isArray(apiData.rides)) ? apiData.rides : []
  
  const totalPages = Math.ceil(rides.length / itemsPerPage)
  const paginatedRides = rides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const GoBackButton = () => {
    navigate(-1)
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${apiUri}/rides/${id}`, { withCredentials: true })
      refetch()
      toast.success("Ride deleted successfully")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete ride")
      console.error("Error deleting ride:", error)
    }
  }

  if (!user) return <Navigate to="/" replace />

  return (
    <main className="pb-12 md:py-14 px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <NavLink onClick={GoBackButton} className="flex items-center gap-2 mr-5 hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        Back
      </NavLink>

      <div className="flex flex-col sm:flex-row h-full w-full">
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="flex flex-col sm:flex-row h-full w-full justify-center items-center">
            <h1 className="text-xl font-semibold">All Published Rides</h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-destructive">
                {error.message || "Failed to load rides"}
              </p>
            </div>
          ) : rides.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p>No rides found</p>
            </div>
          ) : (
            <>
              {paginatedRides.map((ride) => (
                <Fragment key={ride._id}>
                  <RideCard 
                    creator={ride.creator || {
                      _id: 'unknown',
                      name: 'Unknown User',
                      profilePicture: ''
                    }}
                    details={ride} 
                    pageOrigin={"admin-published-rides"} 
                  />
                  <div className="flex justify-end w-full mt-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setRideToDelete(ride._id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash size={20} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure you want to delete this ride?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90 text-white"
                            onClick={() => handleDelete(rideToDelete)}
                          >
                            Yes, Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </Fragment>
              ))}

              {totalPages > 1 && (
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
              )}
            </>
          )}
        </div>
      </div>

      <Toaster position="top-center" />
    </main>
  )
}

export default AdminPublishedRides