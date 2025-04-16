import useFetch from "@/hooks/useFetch"
import SimpleRouteCard from "@/components/ui/SimpleRouteCard"
import { toast } from "sonner"

const PopularRoutesSection = () => {
  const { data, loading, error } = useFetch("rides/popular", true)

  if (error) toast.error("Erreur lors du chargement des trajets populaires.")

  const normalize = (str) =>
    typeof str === "string" ? str.trim().toLowerCase() : ""

  const allowedCities = ["sfax", "tunis", "sousse", "bizerte"]

  const filteredRides = (data?.rides || [])
    .filter((ride) => {
      const from = normalize(ride.origin.place)
      const to = normalize(ride.destination.place)
      return (
        allowedCities.includes(from) &&
        allowedCities.includes(to) &&
        ride.price > 0
      )
    })
    .sort((a, b) => {
      // Priorité : status confirmé > autres, puis date décroissante
      const statusA = a.status === "confirmed" ? 1 : 0
      const statusB = b.status === "confirmed" ? 1 : 0
      if (statusA !== statusB) return statusB - statusA

      const dateA = new Date(a.startTime)
      const dateB = new Date(b.startTime)
      return dateB - dateA // Plus récent d'abord
    })
    .slice(0, 12)

  return (
    <section className="py-16 px-4 md:px-12 2xl:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Most Popular Routes
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Chargement...</p>
      ) : filteredRides.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {filteredRides.map((ride) => (
            <SimpleRouteCard
              key={ride._id}
              from={ride.origin.place}
              to={ride.destination.place}
              price={ride.price}
              date={ride.startTime}
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
