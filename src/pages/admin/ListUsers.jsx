import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { AuthContext } from "@/context/AuthContext"
import axios from "axios"
//import { Trash, ArrowLeft } from "lucide-react"
import { Fragment, useContext, useState, useEffect } from "react"
import { Navigate, useNavigate, NavLink } from "react-router-dom"
import { toast } from "sonner"
import { Ban, ArrowLeft } from "lucide-react"


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

const ListUsers = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [userToBan, setUserToBan] = useState(null)
  const [users, setUsers] = useState([])

  // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUri}/users`, {
        withCredentials: true, // Include credentials like cookies if needed
      })
      setUsers(response.data) // Assuming the response contains the user list
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Failed to fetch users.")
    }
  }

  // Ban user function
  async function handleBan(id) {
    try {
      await axios.delete(`${apiUri}/admin/ban/${id}`, { withCredentials: true }) // Call your backend route for banning
      setUsers(users.map(user => 
        user._id === id ? { ...user, isBanned: true } : user
      ));
      toast("User has been banned.")
    } catch (error) {
      console.error("Error banning user:", error)
      toast.error("Failed to ban user.")
    }
  }

  const GoBackButton = () => {
    navigate(-1)
  }

  if (!user) return <Navigate to="/" replace /> // Ensure user is logged in

  useEffect(() => {
    fetchUsers() // Fetch all users without checking admin role
  }, [])

  return (
    <main className="pb-12 md:py-14 px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <NavLink onClick={GoBackButton} className="flex items-center gap-2 mr-5 hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        Retour
      </NavLink>

      <div className="flex flex-col sm:flex-row h-full w-full">
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="flex flex-col sm:flex-row h-full w-full justify-center items-center">
            <h1 className="text-xl font-semibold">Users</h1>
          </div>

          {/* Render the table with user data */}
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Etat</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                ?.filter((user) => user.role !== "admin") // Filter out admin users
                .map((user) => (
                  <Fragment key={user._id}>
                    <tr>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.isBanned? "Banned" : "Actif"}</td>
                      <td className="px-4 py-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setUserToBan(user._id)}
                              className="text-destructive hover:bg-destructive/10"
                            >
                            <Ban size={20} />

                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure you want to ban this user?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive hover:bg-destructive/90 text-white"
                                onClick={() => handleBan(userToBan)}
                              >
                                Yes, Ban
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  </Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Toaster position="top-center" />
    </main>
  )
}

export default ListUsers
