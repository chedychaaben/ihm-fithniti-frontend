import RideCard from "@/components/RideCard"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { AuthContext } from "@/context/AuthContext"
import useFetch from "@/hooks/useFetch"
import axios from "axios"
import { Trash, ArrowLeft } from "lucide-react"
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

const PublishedRides = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [rideToDelete, setRideToDelete] = useState(null)
  const { loading, data, refetch } = useFetch(`users/${user.user._id}`, true)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const GoBackButton = () => {
    navigate(-1)
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${apiUri}/rides/${id}`, { withCredentials: true })
      refetch()
      toast("The ride has been deleted.", {
        style: {
          background: '#D1FAE5', // light green
          color: '#065F46',      // dark green text
          border: '#065F46'
        },
      });
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  }

  if (!user) return <Navigate to="/" replace />

  const rides = data?.ridesCreated?.slice().reverse() || []
  const totalPages = Math.ceil(rides.length / itemsPerPage)
  const paginatedRides = rides.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <main className="pb-12 md:py-14 px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <NavLink onClick={GoBackButton} className="flex items-center gap-2 mr-5 hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
      Back
      </NavLink>

      <div className="flex flex-col sm:flex-row h-full w-full">
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="flex flex-col sm:flex-row h-full w-full justify-center items-center">
            <h1 className="text-xl font-semibold">Published Rides</h1>
          </div>

          {rides.length === 0 ? (
            <h3>No rides</h3>
          ) : (
            <>
              {paginatedRides.map((ride) => (
                <Fragment key={ride._id}>
                  <RideCard creator={user.user} details={ride} pageOrigin={"published-rides"} />
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

              {/* Pagination */}
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
  )
}

export default PublishedRides
