import { useState, useEffect } from 'react';
import RideCard from '@/components/RideCard';
import Search from '@/components/Search';
import Sidebar from '@/components/Sidebar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import useFetch from '@/hooks/useFetch';
import { MoveRight, SlidersHorizontal, ArrowLeft} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NavLink, useNavigate} from "react-router-dom"
import Footer from '@/components/Footer';
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";


const SearchPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const {user, dispatch} = useContext(AuthContext)
  const { from, to, date, seat } = Object.fromEntries(new URLSearchParams(search));

  const { loading, data, error } = useFetch(`rides/find?from=${from}&to=${to}&seat=${seat}&date=${date}`);

  const currentUserId = user?.user?._id;
  
  const [filteredData, setFilteredData] = useState([]);

  const [filters, setFilters] = useState({
    sortOption: null,
    departureOptions: {
      departure_before_eight_am: false,
      departure_eight_am_to_four_pm: false,
      departure_after_four_pm: false,
    },
    otherFilters: [
      { name: 'maxTwoPassengersInBackSeats', title: "👥 Max 2 Passengers in Back Seats", checked: false },
      { name: 'heavyLuggage', title: "🧳 Heavy Luggage", checked: false },
      { name: 'smokingAllowed', title: "🚬 Smoking Allowed", checked: false },
      { name: 'petsAllowed', title: "🐾 Pets Allowed", checked: false },
      { name: 'airConditioning', title: "❄️ Air Conditioning", checked: false },
    ],
  });

  const handleFilterChange = (newFilters) => {
    const updatedFilters = {
      ...filters,
      ...newFilters,
    };
  
    let filtered = [];
  
    if (data?.rides && data.rides.length > 0) {
      filtered = data.rides.filter((ride) => {
        const departureTime = new Date(ride.startTime).getHours();
  
        if (Object.values(updatedFilters.departureOptions).some(Boolean)) {
          const matchesDeparture =
            (updatedFilters.departureOptions.departure_before_eight_am && departureTime < 8) ||
            (updatedFilters.departureOptions.departure_eight_am_to_four_pm && departureTime >= 8 && departureTime < 16) ||
            (updatedFilters.departureOptions.departure_after_four_pm && departureTime >= 16);
  
          if (!matchesDeparture) return false;
        }
  
        for (const filter of updatedFilters.otherFilters) {
          if (filter.checked && ride[filter.name] !== filter.checked) {
            return false;
          }
        }
  
        return true;
      });
    }
  
    // ✅ Always update both
    setFilteredData(filtered);
    setFilters(updatedFilters);
  };

  useEffect(() => {
    if (data?.rides) {
      setFilteredData(data.rides.filter((ride) => {
        // Only filter out rides where the creator._id is equal to currentUserId if currentUserId exists
        return currentUserId ? ride.creator._id !== currentUserId : true;
      }));
    }
  }, [data, currentUserId]);  // Add currentUserId to the dependency array
  
  useEffect(() => {
    if (filteredData.length > 0) {
      const sorted = [...filteredData].sort((a, b) => {
        let comparison = 0;
        
        if (filters.sortOption === 'Earliest departure') {
          comparison = new Date(a.startTime) - new Date(b.startTime);
        } else if (filters.sortOption === 'Lowest price') {
          comparison = a.price - b.price;
        }
        // Add other sort options as needed
        
        // Apply sort direction
        return filters.sortDirection === 'desc' ? -comparison : comparison;
      });
      
      setFilteredData(sorted);
    }
  }, [filters.sortOption, filters.sortDirection, filteredData]);
  
  const GoBackButton = () => {
    navigate(-1);
  };
  return (
    <>
      <main>
        <div className="z-10 flex justify-center items-center border-b bg-gray-100 p-8">
          <Search />
          <Dialog>
            <DialogTrigger className="md:hidden border border-lg p-2 bg-background absolute right-0">
              <SlidersHorizontal />
            </DialogTrigger>
            <DialogContent>
              <Sidebar filters={filters} onFiltersChange={handleFilterChange} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="container p-0 max-w-screen-xl grid md:grid-cols-5">
          <div className="hidden md:block">
            <div className="sticky top-16">
              <Sidebar filters={filters} onFiltersChange={handleFilterChange} />
            </div>
          </div>
          <div className="col-span-3 py-6 md:col-span-4 lg:border-l">
            <div className="container">
              
              <NavLink onClick={GoBackButton} className="flex items-center gap-2 mr-5 hover:text-primary">
                <ArrowLeft className="h-4 w-4" />
                 Back
              </NavLink>
              <br/>
              {loading && (
                <>
                  <Skeleton className="h-[200px] w-full my-3 p-4 rounded-xl" />
                  <Skeleton className="h-[200px] w-full my-3 p-4 rounded-xl" />
                </>
              )}
              {filteredData && (
                <>
                  {filteredData.length === 0 ? (
                    <h3 className="text-xl font-semibold">No rides available based on your search criteria.</h3>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <h3>
                          {from} <MoveRight className="inline-block" /> {to}
                        </h3>
                        <h3>
                          {filteredData.length} rides available
                        </h3>
                      </div>
                      <br />
                      {filteredData.map((ride) => (
                          <RideCard to={`/ride/${ride._id}`} creator={ride.creator} details={ride} pageOrigin={"search"} />
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SearchPage;