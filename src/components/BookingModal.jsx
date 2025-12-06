import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const BookingModal = ({ service, onClose, onBookingSuccess }) => {
  const { user } = useAuth();
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        serviceId: service._id,
        serviceName: service.serviceName,
        providerName: service.providerName,
        providerEmail: service.providerEmail,
        userEmail: user.email,
        userName: user.displayName,
        bookingDate: bookingDate,
        price: service.price,
        status: "pending",
        imageURL: service.imageURL,
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        bookingData
      );
      toast.success("Service booked successfully!");
      onBookingSuccess();
      onClose();
    } catch (error) {
      console.error("Error booking service:", error);
      toast.error("Failed to book service");
    } finally {
      setLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-neutral-dark mb-6">
          Book Service
        </h2>

        {/* Service Info */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-2">{service.serviceName}</h3>
          <p className="text-gray-600 text-sm mb-2">
            Provider: {service.providerName}
          </p>
          <p className="text-2xl font-bold text-primary">${service.price}</p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Email (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="input-field bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Booking Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              min={today}
              className="input-field"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;