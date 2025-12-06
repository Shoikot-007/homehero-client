import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import BookingModal from "../components/BookingModal";
import {
  FaStar,
  FaUser,
  FaEnvelope,
  FaDollarSign,
  FaTag,
  FaCalendar,
} from "react-icons/fa";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/services/${id}`
      );
      setService(response.data);
    } catch (error) {
      console.error("Error fetching service details:", error);
      toast.error("Failed to load service details");
      navigate("/services");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please login to book a service");
      navigate("/login", { state: { from: `/services/${id}` } });
      return;
    }

    // Check if user is trying to book their own service
    if (user.email === service.providerEmail) {
      toast.error("You cannot book your own service!");
      return;
    }

    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    // Refresh service details if needed
    fetchServiceDetails();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return null;
  }

  const isOwnService = user && user.email === service.providerEmail;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Service Image and Basic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={service.imageURL || "https://via.placeholder.com/600x400"}
              alt={service.serviceName}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Service Info Card */}
          <div className="space-y-6">
            <div>
              <div className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                {service.category}
              </div>
              <h1 className="text-4xl font-bold text-neutral-dark mb-4">
                {service.serviceName}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1 text-accent">
                  <FaStar />
                  <span className="font-semibold text-neutral-dark">
                    {service.averageRating || "New"}
                  </span>
                </div>
                {service.totalReviews > 0 && (
                  <span className="text-gray-500">
                    ({service.totalReviews} reviews)
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2 text-3xl font-bold text-primary mb-6">
                <FaDollarSign />
                <span>{service.price}</span>
              </div>
            </div>

            {/* Provider Info */}
            <div className="card bg-gray-50">
              <h3 className="font-semibold text-lg mb-4">Service Provider</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaUser className="text-primary" />
                  <span>{service.providerName}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-primary" />
                  <span className="text-sm">{service.providerEmail}</span>
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleBookNow}
              disabled={isOwnService}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all shadow-lg ${
                isOwnService
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-accent text-neutral-dark hover:bg-yellow-400 transform hover:scale-105"
              }`}
            >
              {isOwnService ? "Cannot Book Your Own Service" : "Book Now"}
            </button>
          </div>
        </div>

        {/* Service Description */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-neutral-dark mb-4">
            Service Description
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {service.description}
          </p>
        </div>

        {/* Service Details */}
        <div className="card">
          <h2 className="text-2xl font-bold text-neutral-dark mb-6">
            Additional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <FaTag className="text-primary text-xl" />
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-semibold">{service.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaDollarSign className="text-primary text-xl" />
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-semibold">${service.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaCalendar className="text-primary text-xl" />
              <div>
                <p className="text-sm text-gray-500">Listed On</p>
                <p className="font-semibold">
                  {new Date(service.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {service.reviews && service.reviews.length > 0 && (
          <div className="card mt-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">
              Customer Reviews
            </h2>
            <div className="space-y-4">
              {service.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-4 last:border-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{review.userName}</span>
                    <div className="flex items-center space-x-1 text-accent">
                      <FaStar />
                      <span>{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          service={service}
          onClose={() => setShowBookingModal(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default ServiceDetails;