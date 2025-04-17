import useFetch from "@/hooks/useFetch"
import SimpleRouteCard from "@/components/ui/SimpleRouteCard"
import { toast } from "sonner"

const PopularRoutesSection = () => {
  const { data, loading, error } = useFetch("rides/popular", true)
  if (error) toast.error("Erreur lors du chargement des trajets populaires.")
  return (
    <section className="py-16 px-4 md:px-12 2xl:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Most Popular Routes
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Chargement...</p>
      ) : data?.routes?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {data?.routes.map((route) => (
            <SimpleRouteCard
              key={route._id}
              from={route.origin}
              to={route.destination}
              price={route.startingPrice}
              date={route.totalRides}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No popular routes found.</p>
      )}
      
    </section>
  )
}

export default PopularRoutesSection
