import useFetch from "@/hooks/useFetch"
import SimpleRouteCard from "@/components/ui/SimpleRouteCard"
import { toast } from "sonner"
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { useState, useEffect } from "react"

const PopularRoutesSection = () => {
  const { data, loading, error } = useFetch("rides/popular", true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      origin: "center",
      perView: 3,
      spacing: 15,
      breakpoints: {
        "(max-width: 768px)": {
          perView: 1,
        },
        "(min-width: 769px) and (max-width: 1024px)": {
          perView: 2,
        },
        "(min-width: 1025px)": {
          perView: 3,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  useEffect(() => {
    if (!instanceRef.current) return;
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  if (error) toast.error("Erreur lors du chargement des trajets populaires.")

  return (
    <section className="py-16 px-4 md:px-12 2xl:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Most Popular Routes
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Chargement...</p>
      ) : data?.routes?.length > 0 ? (
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {data?.routes.map((route) => (
              <div className="keen-slider__slide flex justify-center" key={route._id}>
                <div className="w-[280px]">
                  <SimpleRouteCard
                    from={route.origin}
                    to={route.destination}
                    price={route.startingPrice}
                    date={route.totalRides}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
            className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full"
          >
            &#8592;
          </button>
          <button
            onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
            className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full"
          >
            &#8594;
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: instanceRef.current?.track.details.slides.length || 0 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-3 h-3 rounded-full ${currentSlide === idx ? "bg-gray-800" : "bg-gray-400"}`}
              ></button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center">No popular routes found.</p>
      )}
    </section>
  )
}

export default PopularRoutesSection