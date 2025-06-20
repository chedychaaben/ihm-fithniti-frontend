import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Header from './components/Header'
import OfferSeat from './pages/OfferSeat'
import SearchPage from './pages/SearchPage'
import Error from './pages/Error'
import RideDetail from './pages/RideDetail'
import Profile from './pages/Profile'
import PublishedRides from './pages/PublishedRides'
import BookedRides from './pages/BookedRides'
import DriverProfile from './pages/DriverProfile'
import ListUsers from './pages/admin/ListUsers'
import { Toaster } from "@/components/ui/sonner"
import AdminPublishedRides from "./pages/admin/AdminPublishedRides"

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<Error />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/offer-seat" element={<OfferSeat />} />
      <Route path="/ride/:rideId" element={<RideDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/published-rides" element={<PublishedRides />} />
      <Route path="/booked-rides" element={<BookedRides />} />
      <Route path="/driver-profile/:driverId" element={<DriverProfile />} />
{

}


      {/* Admin */}
      <Route path="/admin/ListUsers" element={<ListUsers />} />
      <Route path="/admin/AdminPublishedRides" element={<AdminPublishedRides />} />

    </Routes>
    <Toaster position="top-center" />
    </>
  )
}

export default App
