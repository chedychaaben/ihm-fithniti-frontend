// src/components/ui/SimpleRouteCard.jsx
import { useNavigate } from "react-router-dom"

import tunisImg from "@/assets/cities/tunis.jpg";
import arianaImg from "@/assets/cities/ariana.jpg";
import benArousImg from "@/assets/cities/ben-arous.jpg";
import manoubaImg from "@/assets/cities/manouba.jpg";
import nabeulImg from "@/assets/cities/nabeul.jpg";
import zaghouanImg from "@/assets/cities/zaghouan.jpg";
import bizerteImg from "@/assets/cities/bizerte.jpg";
import bejaImg from "@/assets/cities/beja.jpg";
import jendoubaImg from "@/assets/cities/jendouba.jpg";
import kefImg from "@/assets/cities/kef.jpg";
import silianaImg from "@/assets/cities/siliana.jpg";
import sousseImg from "@/assets/cities/sousse.jpg";
import monastirImg from "@/assets/cities/monastir.jpg";
import mahdiaImg from "@/assets/cities/mahdia.jpg";
import kairouanImg from "@/assets/cities/kairouan.jpg";
import kasserineImg from "@/assets/cities/kasserine.jpg";
import sidiBouzidImg from "@/assets/cities/sidi-bouzid.jpg";
import sfaxImg from "@/assets/cities/sfax.jpg";
import gabesImg from "@/assets/cities/gabes.jpg";
import medenineImg from "@/assets/cities/medenine.jpg";
import tataouineImg from "@/assets/cities/tataouine.jpg";
import gafsaImg from "@/assets/cities/gafsa.jpg";
import tozeurImg from "@/assets/cities/tozeur.jpg";
import kebiliImg from "@/assets/cities/kebili.jpg";

import defaultImg from "@/assets/cities/default.jpg";

const SimpleRouteCard = ({ from, to, price, date }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    const queryParams = new URLSearchParams({
      from,
      to
    }).toString()
    navigate(`/search?${queryParams}`)
  }

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  
  const formatCityName = (city) => {
    return removeAccents(city.toLowerCase()).replace(/\s+/g, '').replace(/-/g, '');
  };
  
  const getImage = (city) => {
    const images = {
      tunis: tunisImg,
      ariana: arianaImg,
      benarous: benArousImg,  // Removed the space between "Ben" and "Arous"
      manouba: manoubaImg,
      nabeul: nabeulImg,
      zaghouan: zaghouanImg,
      bizerte: bizerteImg,
      beja: bejaImg,
      jendouba: jendoubaImg,
      kef: kefImg,
      siliana: silianaImg,
      sousse: sousseImg,
      monastir: monastirImg,
      mahdia: mahdiaImg,
      kairouan: kairouanImg,
      kasserine: kasserineImg,
      sidiBouzid: sidiBouzidImg,
      sfax: sfaxImg,
      gabes: gabesImg,
      medenine: medenineImg,
      tataouine: tataouineImg,
      gafsa: gafsaImg,
      tozeur: tozeurImg,
      kebili: kebiliImg,
      default: defaultImg,
    };
  
    // Normalize and format the city name (remove spaces, accents, lowercase)
    const formattedCity = formatCityName(city);
  
    return images[formattedCity] || images.default;
  };
  

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
          <div>
            <span className="text-gray-600 text-base">Dès </span>
            <span className="text-primary text-lg font-semibold">{price} TND</span>
          </div>
          <span className="text-blue-500 text-xl font-bold">→</span>
        </div>
      </div>
    </div>
  )
}

export default SimpleRouteCard
