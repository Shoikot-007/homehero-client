import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import HeroSlider from "../components/HeroSlider";
import ServiceCard from "../components/ServiceCard";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/services?limit=6`
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Featured Services Section */}
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
              Popular Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most requested household services from verified
              professionals
            </p>
          </motion.div>

          {/* Services Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
            </div>
          ) : services.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {services.map((service, index) => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    index={index}
                  />
                ))}
              </div>

              {/* View All Services Button */}
              <div className="text-center">
                <Link
                  to="/services"
                  className="inline-flex items-center space-x-2 btn-primary text-lg group"
                >
                  <span>View All Services</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                No services available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Find Your Perfect Service?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of satisfied customers who trust HomeHero
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/services"
                className="inline-block bg-accent text-neutral-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg"
              >
                Browse Services
              </Link>
              <Link
                to="/register"
                className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Become a Provider
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;