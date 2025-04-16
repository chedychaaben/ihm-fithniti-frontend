import { useState } from 'react';
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

  // Initialize filters with the correct structure
  const [filters, setFilters] = useState({
    sortOption: 'Earliest departure',
    departureOptions: {
      departure_before_seven_am: false,
      departure_seven_to_noon: false,
      departure_noon_to_seven: false,
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
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
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
              {loading && (
                <>
                  <Skeleton className="h-[200px] w-full my-3 p-4 rounded-xl" />
                  <Skeleton className="h-[200px] w-full my-3 p-4 rounded-xl" />
                </>
              )}
              {error && <h3>Error: {error.message}</h3>}
              {data && (
                <>
                  <h3>
                    {from} <MoveRight className="inline-block" /> {to}
                  </h3>
                  <h3>{data?.rides.length} rides available</h3>
                  {data.rides.length === 0 ? (
                    <h3 className="text-xl font-semibold">No rides available based on your search criteria.</h3>
                  ) : (
                    data.rides.map((ride) => (
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