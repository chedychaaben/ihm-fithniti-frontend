import { useState, useEffect } from 'react';
import RideCard from '@/components/RideCard';
import Search from '@/components/Search';
import Sidebar from '@/components/Sidebar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import useFetch from '@/hooks/useFetch';
import { MoveRight, SlidersHorizontal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '@/components/Footer';

const SearchPage = () => {
  const { search } = useLocation();
  const { from, to, date, seat } = Object.fromEntries(new URLSearchParams(search));

  const { loading, data, error } = useFetch(`rides/find?from=${from}&to=${to}&seat=${seat}&date=${date}`);

  
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
    seat,
    date
  });

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      
      if (!data?.rides) return updatedFilters; // Early return if no data
      
      const filtered = data.rides.filter((ride) => {
        // Check departure time filters
        const departureTime = new Date(ride.startTime).getHours();
        
        // If any departure time filter is active, check if ride matches
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
      
      setFilteredData(filtered);
      return updatedFilters;
    });
  };

  useEffect(() => {
    if (data?.rides) {
      setFilteredData(data?.rides);
    }
  }, [data]);
  
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
              {loading && (
                <>
                  <Skeleton className="h-[200px] w-full my-3 p-4 rounded-xl" />
                  <Skeleton className="h-[200px] w-full my-3 p-4 rounded-xl" />
                </>
              )}
              {error && <h3>Error: {error.message}</h3>}
              {filteredData && (
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
                {filteredData.length === 0 ? (
                  <h3 className="text-xl font-semibold">No rides available based on your search criteria.</h3>
                ) : (
                  filteredData.map((ride) => (
                    <Link key={ride._id} to={`/ride/${ride._id}`}>
                      <RideCard details={ride} />
                    </Link>
                  ))
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