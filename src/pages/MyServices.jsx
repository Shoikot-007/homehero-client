import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";

const MyServices = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMyServices();
    }
  }, [user]);

  const fetchMyServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/services/provider/${user.email}`
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load your services");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, serviceName) => {
    // Confirm deletion
    if (!window.confirm(`Are you sure you want to delete "${serviceName}"?`)) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/services/${id}`);
      toast.success("Service deleted successfully!");
      fetchMyServices(); // Refresh the list
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    }
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
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-neutral-dark mb-2">
            My Services
          </h1>
          <p className="text-gray-600">Manage your service listings</p>
        </div>
        <Link
          to="/add-service"
          className="btn-primary flex items-center space-x-2 mt-4 md:mt-0"
        >
          <FaPlus />
          <span>Add New Service</span>
        </Link>
      </div>

      {/* Services Table */}
      {services.length > 0 ? (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service) => (
                <tr
                  key={service._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={
                          service.imageURL || "https://via.placeholder.com/60"
                        }
                        alt={service.serviceName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-neutral-dark">
                          {service.serviceName}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block bg-secondary text-white px-3 py-1 rounded-full text-sm">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-primary">
                    ${service.price}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-accent">★</span>
                      <span className="font-medium">
                        {service.averageRating > 0
                          ? service.averageRating
                          : "New"}
                      </span>
                      {service.totalReviews > 0 && (
                        <span className="text-gray-500 text-sm">
                          ({service.totalReviews})
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/services/${service._id}`)}
                        className="p-2 text-primary hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/update-service/${service._id}`)
                        }
                        className="p-2 text-secondary hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Service"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(service._id, service.serviceName)
                        }
                        className="p-2 text-error hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Service"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 card">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-2xl font-semibold text-neutral-dark mb-2">
            No Services Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start by adding your first service to connect with customers
          </p>
          <Link
            to="/add-service"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add Your First Service</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyServices;
