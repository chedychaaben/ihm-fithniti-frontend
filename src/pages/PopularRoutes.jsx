import RideCard from "@/components/RideCard"
import useFetch from "@/hooks/useFetch"
import { ArrowLeft } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"

const PopularRoutes = () => {
  const navigate = useNavigate()
  const { data, loading, error } = useFetch(`rides/popular`, true)

  const GoBackButton = () => navigate(-1)

  if (error) toast.error("Erreur lors du chargement des trajets populaires.")

  return (
    <main className="pb-12 md:py-14 px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <Toaster />
      <NavLink onClick={GoBackButton} className="flex items-center gap-2 mr-5 hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        Retour
      </NavLink>

      <h1 className="text-2xl font-bold text-center mb-10">Popular Routes</h1>

      {loading && <p className="animate-pulse text-center text-gray-500">Chargement...</p>}

      {/* 🟢 Grille visible */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {data?.rides?.length > 0 ? (
          data.rides.map((ride) => (
            <div key={ride._id} className="w-full max-w-xs"> {/* 🟢 Limit width */}
              <RideCard details={ride} />
            </div>
          ))
        ) : (
          !loading && <p className="text-center">Aucun trajet populaire trouvé test.</p>
        )}
      </div>
    </main>
  )
}

export default PopularRoutes
