import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaClock, FaEdit } from "react-icons/fa";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

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
      await updateUserProfile(formData.name, formData.photoURL);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Not available";
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-dark mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="card">
          {/* Profile Header with Photo */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt={user?.displayName}
              className="w-32 h-32 rounded-full border-4 border-primary object-cover mb-4"
            />
            <h2 className="text-2xl font-bold text-neutral-dark">
              {user?.displayName}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          {/* Profile Information */}
          {!isEditing ? (
            <div className="space-y-6">
              {/* Name */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FaUser className="text-primary text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold text-neutral-dark">
                    {user?.displayName}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FaEnvelope className="text-primary text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-semibold text-neutral-dark">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Last Login */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FaClock className="text-primary text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Last Login</p>
                  <p className="font-semibold text-neutral-dark">
                    {formatDate(user?.metadata?.lastSignInTime)}
                  </p>
                </div>
              </div>

              {/* Account Created */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FaClock className="text-primary text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Account Created</p>
                  <p className="font-semibold text-neutral-dark">
                    {formatDate(user?.metadata?.creationTime)}
                  </p>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <FaEdit />
                <span>Edit Profile</span>
              </button>
            </div>
          ) : (
            /* Edit Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Photo URL Field */}
              <div>
                <label
                  htmlFor="photoURL"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Photo URL
                </label>
                <input
                  type="url"
                  id="photoURL"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://example.com/photo.jpg"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.displayName || "",
                      photoURL: user?.photoURL || "",
                    });
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;