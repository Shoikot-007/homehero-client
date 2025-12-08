import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const AddService = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    price: "",
    description: "",
    imageURL: "",
    providerName: user?.displayName || "",
    providerEmail: user?.email || "",
    providerImage: user?.photoURL || "",
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/services`,
        formData
      );
      toast.success("Service added successfully!");
      navigate("/my-services");
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-dark mb-4">
            Add New Service
          </h1>
          <p className="text-gray-600">
            Share your expertise and connect with customers
          </p>
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
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field w-full pr-12 cursor-pointer appearance-none"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {/* Dropdown Icon */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
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

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Adding Service..." : "Add Service"}
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

export default AddService;
