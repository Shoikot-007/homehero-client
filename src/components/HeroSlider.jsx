import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Find Trusted Electricians",
      description:
        "Connect with certified electrical professionals for all your home and business needs. Safe, reliable, and efficient service guaranteed.",
      image: "/images/electrician-hero.jpg",
      bgColor: "from-blue-600 to-blue-800",
    },
    {
      id: 2,
      title: "Expert Plumbing Services",
      description:
        "Get your plumbing issues resolved quickly by experienced plumbers. From repairs to installations, we have you covered.",
      image: "/images/plumber-hero.jpg",
      bgColor: "from-green-600 to-green-800",
    },
    {
      id: 3,
      title: "Professional Cleaning Services",
      description:
        "Transform your space with our professional cleaning services. Spotless results, eco-friendly products, and affordable rates.",
      image: "/images/cleaner-hero.jpg",
      bgColor: "from-purple-600 to-purple-800",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-[500px] md:h-[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`relative h-full bg-gradient-to-r ${slide.bgColor}`}
            >
              {/* Background Image Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>

              {/* Content */}
              <div className="relative h-full container mx-auto px-4 flex items-center">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-gray-100">
                    {slide.description}
                  </p>
                  <Link
                    to="/services"
                    className="inline-block bg-accent text-neutral-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Explore Services
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Style */}
      <style>{`
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
          width: 12px;
          height: 12px;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #FFEB3B;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(0, 0, 0, 0.3);
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;