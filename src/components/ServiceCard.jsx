import { Link } from "react-router";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group cursor-pointer"
    >
      {/* Service Image */}
      <div className="relative overflow-hidden rounded-lg mb-4 h-64">
        <img
          src={service.imageURL || "https://via.placeholder.com/400x300"}
          alt={service.serviceName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
          {service.category}
        </div>
      </div>

      {/* Service Info */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-neutral-dark group-hover:text-primary transition-colors">
          {service.serviceName}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2">
          {service.description}
        </p>

        {/* Provider Info */}
        <div className="flex items-center space-x-2 text-sm text-neutral-dark">
          <img
            src={service.providerImage || "https://via.placeholder.com/40"}
            alt={service.providerName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{service.providerName}</span>
        </div>

        {/* Rating & Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-1">
            <FaStar className="text-accent" />
            <span className="font-semibold text-neutral-dark">
              {service.averageRating > 0 ? service.averageRating : "New"}
            </span>
            {service.totalReviews > 0 && (
              <span className="text-gray-500 text-sm">
                ({service.totalReviews})
              </span>
            )}
          </div>
          <div className="text-2xl font-bold text-primary">
            ${service.price}
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/services/${service._id}`}
          className="btn-primary w-full flex items-center justify-center space-x-2 group"
        >
          <span>View Details</span>
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
