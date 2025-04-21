"use client"

import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { AuthContext } from "@/context/AuthContext"
import axios from "axios"
import { Fragment, useContext, useState, useEffect } from "react"
import { Navigate, useNavigate, NavLink } from "react-router-dom"
import { toast } from "sonner"
import { Ban, ArrowLeft, RotateCcw, ShieldAlert, ShieldCheck, User } from "lucide-react"
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
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const apiUri = import.meta.env.VITE_REACT_API_URI

const ListUsers = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [userToBan, setUserToBan] = useState(null)
  const [userToUnban, setUserToUnban] = useState(null)
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${apiUri}/users`, {
        withCredentials: true,
      })
      setUsers(response.data)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Failed to fetch users.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBan = async (id) => {
    try {
      await axios.delete(`${apiUri}/admin/ban/${id}`, { withCredentials: true })
      setUsers(users.map(user => 
        user._id === id ? { ...user, isBanned: true } : user
      ))
      toast("User has been banned successfully.", {
        style: {
          background: '#D1FAE5',
          color: '#065F46',
          border: '#065F46'
        },
      });
    } catch (error) {
      console.error("Error banning user:", error)
      toast.error("Failed to ban user.")
    }
  }

  const handleUnban = async (id) => {
    try {
      await axios.delete(`${apiUri}/admin/unban/${id}`, { withCredentials: true })
      setUsers(users.map(user => 
        user._id === id ? { ...user, isBanned: false } : user
      ))
      toast("User has been unbanned successfully.", {
        style: {
          background: '#D1FAE5',
          color: '#065F46',
          border: '#065F46'
        },
      });
    } catch (error) {
      console.error("Error unbanning user:", error)
      toast.error("Failed to unban user.")
    }
  }

  const GoBackButton = () => {
    navigate(-1)
  }

  const filteredUsers = users?.filter(user => {
    if (user.role === "admin") return false
    const searchLower = searchTerm.toLowerCase()
    return (
      user.name.toLowerCase().includes(searchLower) || 
      user.email.toLowerCase().includes(searchLower))
  })

  if (!user) return <Navigate to="/" replace />

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <main className="pb-12 md:py-14 px-4 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="mb-6">
        <NavLink 
          onClick={GoBackButton} 
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to previous page
        </NavLink>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl font-semibold">User Management</CardTitle>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Button 
              onClick={() => navigate('/admin/AdminPublishedRides')}
              variant="outline"
              className="gap-2"
              >
              Manage Published Rides
            </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers?.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user._id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                            <AvatarFallback>
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.isBanned ? "destructive" : "default"} 
                          className="flex items-center gap-1"
                        >
                          {user.isBanned ? (
                            <>
                              <ShieldAlert className="h-3 w-3" />
                              Banned
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="h-3 w-3" />
                              Active
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {!user.isBanned ? (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setUserToBan(user._id)}
                                className="text-destructive hover:bg-destructive/10"
                                aria-label="Ban user"
                              >
                                <Ban className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2">
                                  <ShieldAlert className="h-5 w-5 text-destructive" />
                                  Confirm Ban
                                </AlertDialogTitle>
                                <p className="text-sm text-muted-foreground">
                                  Are you sure you want to ban {user.name}? They will lose access to their account.
                                </p>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive hover:bg-destructive/90"
                                  onClick={() => handleBan(userToBan)}
                                >
                                  Confirm Ban
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setUserToUnban(user._id)}
                                className="text-emerald-600 hover:bg-emerald-100"
                                aria-label="Unban user"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2">
                                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                                  Confirm Unban
                                </AlertDialogTitle>
                                <p className="text-sm text-muted-foreground">
                                  Are you sure you want to unban {user.name}? They will regain access to their account.
                                </p>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-emerald-600 hover:bg-emerald-600/90"
                                  onClick={() => handleUnban(userToUnban)}
                                >
                                  Confirm Unban
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      {searchTerm ? "No matching users found" : "No users available"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Toaster position="top-center" richColors />
    </main>
  )
}

export default ListUsers