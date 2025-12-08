import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: "HomeHero made finding a reliable electrician so easy! The booking process was smooth, and the service was excellent. Highly recommended!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Owner",
      image: "https://i.pravatar.cc/150?img=13",
      rating: 5,
      text: "I use HomeHero for all my office maintenance needs. The quality of service providers is consistently high, and the prices are fair.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Apartment Resident",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "Quick response time and professional service. I found a great cleaning service through HomeHero that I now use regularly!",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Homeowner",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 4,
      text: "Great platform with verified professionals. Fixed my plumbing issue the same day I booked. Very satisfied with the service!",
    },
  ];

  return (
    <section className="py-20 bg-neutral-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-neutral-dark mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                {/* Quote Icon */}
                <FaQuoteLeft className="text-4xl text-primary mb-4 opacity-20" />

                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < testimonial.rating ? "text-accent" : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-neutral-dark">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;