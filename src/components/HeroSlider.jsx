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
      image: "/hero-bg-1.jpg",
      bgColor: "from-blue-600 to-blue-800",
    },
    {
      id: 2,
      title: "Expert Plumbing Services",
      description:
        "Get your plumbing issues resolved quickly by experienced plumbers. From repairs to installations, we have you covered.",
      image: "/hero-bg-2.jpg",
      bgColor: "from-blue-600 to-blue-800",
    },
    {
      id: 3,
      title: "Professional Cleaning Services",
      description:
        "Transform your space with our professional cleaning services. Spotless results, eco-friendly products, and affordable rates.",
      image: "/hero-bg-3.jpg",
      bgColor: "from-blue-600 to-blue-800",
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
        className="h-[500px] lg:h-[calc(100vh-80px)]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`relative h-full bg-linear-to-r ${slide.bgColor}`}>
              {/* Background Image Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>

              {/* Content */}
              <div className="relative h-full container mx-auto px-4 flex items-center justify-center">
                <div className="max-w-65 sm:max-w-2xl text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in text-center">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-gray-100 text-center">
                    {slide.description}
                  </p>
                  <div className="flex items-center justify-center">
                    <Link to="/services" className="btn-accent">
                      Explore Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Style */}
      <style>{`
        .swiper-pagination-bullet {
          background: grey;
          opacity: 0.4;
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
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .swiper-button-prev {
          margin-left: 5px !important;
        }
        .swiper-button-next {
          margin-right: 5px !important;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }
        .swiper-navigation-icon {
          width: 10px !important;
          height: 20px !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
