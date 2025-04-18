// src/components/ui/SimpleRouteCard.jsx
import { useNavigate } from "react-router-dom"

// 🖼️ Importation des images
import sfaxImg from "@/assets/sfax.jpg"
import tunisImg from "@/assets/tunis.jpg"
import sousseImg from "@/assets/sousse.jpg"
import bizerteImg from "@/assets/bizerte.jpg"
import defaultImg from "@/assets/default.jpg"

const SimpleRouteCard = ({ from, to, price, date }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    const queryParams = new URLSearchParams({
      from,
      to
    }).toString()
    navigate(`/search?${queryParams}`)
  }

  const getImage = (city) => {
    const images = {
      sfax: sfaxImg,
      tunis: tunisImg,
      sousse: sousseImg,
      bizerte: bizerteImg,
      default: defaultImg,
    }

    return images[city.toLowerCase()] || images.default
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 cursor-pointer w-full max-w-sm snap-start shrink-0"
    >
      <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
        {/* Badge Popular */}
        <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
          Popular
        </span>

        {/* Image */}
        <img
          src={getImage(to)}
          alt={`Image of ${to}`}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
        />
      </div>

      {/* Contenu texte */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-gray-800 capitalize">
          {from} → {to}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-primary text-lg font-semibold">{price} TND</span>
          <span className="text-blue-500 text-xl font-bold">→</span>
        </div>
      </div>
    </div>
  )
}

export default SimpleRouteCard
