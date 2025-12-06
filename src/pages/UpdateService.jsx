import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateService = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    price: "",
    description: "",
    imageURL: "",
    providerName: "",
    providerEmail: "",
  });

  const categories = [
    "Electrician",
    "Plumber",
    "Cleaner",
    "Carpenter",
    "Painter",
    "HVAC",
    "Gardener",
    "Other",
  ];

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/services/${id}`
      );
      const service = response.data;

      // Check if user owns this service
      if (service.providerEmail !== user.email) {
        toast.error("You can only edit your own services!");
        navigate("/my-services");
        return;
      }

      setFormData({
        serviceName: service.serviceName,
        category: service.category,
        price: service.price,
        description: service.description,
        imageURL: service.imageURL,
        providerName: service.providerName,
        providerEmail: service.providerEmail,
      });
    } catch (error) {
      console.error("Error fetching service:", error);
      toast.error("Failed to load service details");
      navigate("/my-services");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/services/${id}`,
        formData
      );
      toast.success("Service updated successfully!");
      navigate("/my-services");
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
    } finally {
      setSubmitting(false);
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
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-dark mb-4">
            Update Service
          </h1>
          <p className="text-gray-600">Edit your service details</p>
        </div>

        {/* Form Card */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Name */}
            <div>
              <label
                htmlFor="serviceName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Service Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="serviceName"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Residential Electrical Repair"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category <span className="text-error">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price ($) <span className="text-error">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input-field"
                placeholder="50"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description <span className="text-error">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field min-h-32"
                placeholder="Describe your service in detail..."
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="imageURL"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Image URL <span className="text-error">*</span>
              </label>
              <input
                type="url"
                id="imageURL"
                name="imageURL"
                value={formData.imageURL}
                onChange={handleChange}
                className="input-field"
                placeholder="https://example.com/image.jpg"
                required
              />
              {formData.imageURL && (
                <div className="mt-3">
                  <img
                    src={formData.imageURL}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Provider Name (Read-only) */}
            <div>
              <label
                htmlFor="providerName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Provider Name
              </label>
              <input
                type="text"
                id="providerName"
                name="providerName"
                value={formData.providerName}
                className="input-field bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Provider Email (Read-only) */}
            <div>
              <label
                htmlFor="providerEmail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Provider Email
              </label>
              <input
                type="email"
                id="providerEmail"
                name="providerEmail"
                value={formData.providerEmail}
                className="input-field bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Updating Service..." : "Update Service"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/my-services")}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateService;