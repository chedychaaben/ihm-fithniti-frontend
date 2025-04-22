import logo from "../assets/logo.svg"
import { Link, NavLink, useNavigate,  } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage  } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Search, PlusCircle, LogOut, User, Car, History, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { toast } from "sonner"
import LoginSignupDialog from "./LoginSignupDialog";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
const apiUri = import.meta.env.VITE_REACT_API_URI

const backendUri = import.meta.env.VITE_REACT_BACKEND_URI

const Header = () => {
  const {user, dispatch} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast("logged out successfully", {
      style: {
        background: '#D1FAE5', // light green
        color: '#065F46',      // dark green text
        border: '#065F46'
      },
    });
    dispatch({ type: 'LOGOUT' });
    navigate("/");
  };

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`${apiUri}/users/get-profile-image/${user.user._id}`);
        setProfileImage(response.data.profilePicture);  // Assuming response.data is the image URL
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchProfileImage();
  }, []);
  const navLinkClass = "flex items-center gap-2 mr-5 hover:text-primary";
  const isAdmin = user?.isAdmin;
  const isLoggedIn = !!user;
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background mx-auto flex p-3 lg:px-16 items-center justify-end">
      <NavLink to="/" className="inline-flex -order-1 items-center gap-2">
        <img src={logo} width={38} alt="RideShare" />
        <h1 className="font-bold text-xl text-primary hidden sm:block">FiTheniti</h1>
      </NavLink>

      <nav className="ml-auto flex items-center text-base justify-center">
        {isAdmin && (
          <NavLink to="/admin/ListUsers" className={navLinkClass}>
            <Settings className="h-4 w-4" />
            Administration
          </NavLink>
        )}

        <NavLink to="/search" className={navLinkClass}>
          <Search className="h-4 w-4" />
          Search
        </NavLink>

        {!isLoggedIn ? (
          <Dialog>
            <DialogTrigger asChild>
              <NavLink to="#" className={navLinkClass}>
                <PlusCircle className="h-4 w-4" />
                Publish a ride
              </NavLink>
            </DialogTrigger>
            <LoginSignupDialog />
          </Dialog>
        ) : (
          !isAdmin && (
            <NavLink to="/offer-seat" className={navLinkClass}>
              <PlusCircle className="h-4 w-4" />
              Publish a ride
            </NavLink>
          )
        )}
      </nav>

      {!isLoggedIn ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Login</Button>
          </DialogTrigger>
          <LoginSignupDialog />
        </Dialog>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={`${backendUri}/uploads/${profileImage}`} />
              <AvatarFallback className="select-none text-primary text-xl font-bold">
                {user.user?.name[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/profile" className="flex">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>

            {!isAdmin && (
              <>
                <DropdownMenuItem>
                  <Link to="/published-rides" className="flex">
                    <Car className="mr-2 h-4 w-4" />
                    <span>Published Rides</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link to="/booked-rides" className="flex">
                    <History className="mr-2 h-4 w-4" />
                    <span>Booked Rides</span>
                  </Link>
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  )
}

export default Header