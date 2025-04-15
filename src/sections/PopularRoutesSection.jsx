// sections/PopularRoutesSection.jsx
import RideCard from "@/components/RideCard"
import useFetch from "@/hooks/useFetch"
import { toast } from "sonner"

const PopularRoutesSection = () => {
  const { data, loading, error } = useFetch(`rides/popular`, true)

  if (error) toast.error("Erreur lors du chargement des trajets populaires.")

  return (
    <section className="py-16 px-4 md:px-12 2xl:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Nos itinéraires les plus en vogue
      </h2>

      {loading && (
        <p className="text-center text-gray-500 animate-pulse">Chargement...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {data?.rides?.length > 0 ? (
          data.rides.map((ride) => (
            <RideCard key={ride._id} details={ride} />
          ))
        ) : (
          !loading && <p className="text-center">Aucun trajet populaire trouvé test.</p>
        )}
      </div>
    </section>
  )
}

export default PopularRoutesSection
