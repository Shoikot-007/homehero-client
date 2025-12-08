import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import ReviewModal from "../components/ReviewModal";
import {
  FaTrash,
  FaCalendar,
  FaDollarSign,
  FaUser,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchMyBookings();
    }
  }, [user]);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings/user/${user.email}`
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id, serviceName) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`);
      toast.success("Booking cancelled successfully!");
      fetchMyBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking");
    }
  };

  const handleCompleteBooking = async (id, serviceName) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/bookings/${id}/status`,
        { status: "completed" }
      );
      toast.success("Booking marked as completed!");
      fetchMyBookings();
    } catch (error) {
      console.error("Error completing booking:", error);
      toast.error("Failed to complete booking");
    }
  };

  const handleAddReview = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
  };

  const handleReviewSuccess = () => {
    fetchMyBookings();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-dark mb-2">
          My Bookings
        </h1>
        <p className="text-gray-600">
          View and manage your service bookings
        </p>
      </div>

      {bookings.length > 0 ? (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Provider
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Booking Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-400">
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={
                          booking.imageURL || "https://via.placeholder.com/60"
                        }
                        alt={booking.serviceName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-neutral-dark">
                          {booking.serviceName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Booked on {formatDate(booking.createdAt)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-gray-400" />
                      <span>
                        {booking.providerName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <FaCalendar className="text-primary" />
                      <span>
                        {formatDate(booking.bookingDate)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 font-semibold text-primary">
                      <FaDollarSign />
                      <span>{booking.price}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === "pending"
                          ? "bg-yellow-900 text-yellow-200"
                          : booking.status === "completed"
                          ? "bg-green-900 text-green-200"
                          : booking.status === "confirmed"
                          ? "bg-blue-900 text-blue-200"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {booking.status
                        ? booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)
                        : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {booking.status !== "completed" && (
                        <button
                          onClick={() =>
                            handleCompleteBooking(
                              booking._id,
                              booking.serviceName
                            )
                          }
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors flex items-center space-x-1"
                          title="Mark as Completed"
                        >
                          <FaCheckCircle />
                          <span className="text-sm">Complete</span>
                        </button>
                      )}
                      {booking.status === "completed" && (
                        <button
                          onClick={() => handleAddReview(booking)}
                          className="p-2 text-secondary hover:bg-green-100 rounded-lg transition-colors flex items-center space-x-1"
                          title="Add Review"
                        >
                          <FaStar />
                          <span className="text-sm">Review</span>
                        </button>
                      )}
                      {booking.status !== "completed" && (
                        <button
                          onClick={() =>
                            handleCancelBooking(
                              booking._id,
                              booking.serviceName
                            )
                          }
                          className="p-2 text-error hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-1"
                          title="Cancel Booking"
                        >
                          <FaTrash />
                          <span className="text-sm">Cancel</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 card">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-2xl font-semibold text-neutral-dark mb-2">
            No Bookings Yet
          </h3>
          <p className="text-gray-600 mb-6">
            You haven't booked any services yet. Browse our services and book
            one today!
          </p>
          <Link to="/services" className="btn-primary inline-block">
            Browse Services
          </Link>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedBooking && (
        <ReviewModal
          booking={selectedBooking}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedBooking(null);
          }}
          onReviewSuccess={handleReviewSuccess}
        />
      )}
    </div>
  );
};

export default MyBookings;