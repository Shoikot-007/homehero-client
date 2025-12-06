import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ServiceCard from "../components/ServiceCard";
import { FaSearch, FaFilter } from "react-icons/fa";

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);

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
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchTerm, selectedCategory, priceRange]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/services`
      );
      setServices(response.data);
      setFilteredServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = [...services];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.serviceName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Price range filter
    if (priceRange.min) {
      filtered = filtered.filter(
        (service) => service.price >= parseFloat(priceRange.min)
      );
    }
    if (priceRange.max) {
      filtered = filtered.filter(
        (service) => service.price <= parseFloat(priceRange.max)
      );
    }

    setFilteredServices(filtered);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange({ min: "", max: "" });
    setFilteredServices(services);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-dark mb-4">
          Browse All Services
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find the perfect service provider for your needs
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-primary flex items-center justify-center space-x-2 md:w-auto"
          >
            <FaFilter />
            <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Min Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Price ($)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                  className="input-field"
                  min="0"
                />
              </div>

              {/* Max Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price ($)
                </label>
                <input
                  type="number"
                  placeholder="1000"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                  className="input-field"
                  min="0"
                />
              </div>
            </div>

            {/* Reset Filters Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleResetFilters}
                className="px-6 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="text-gray-600 mt-4">
          Showing{" "}
          <span className="font-semibold">{filteredServices.length}</span>{" "}
          service(s)
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <ServiceCard key={service._id} service={service} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-neutral-dark mb-2">
            No services found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search terms
          </p>
          <button onClick={handleResetFilters} className="btn-primary">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;