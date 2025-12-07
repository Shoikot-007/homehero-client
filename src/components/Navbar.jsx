import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logged out successfully!");
        setIsMenuOpen(false);
      })
      .catch(() => {
        toast.error("Logout failed!");
      });
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = (
    <>
      <li onClick={closeMenu}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2 hover:text-primary transition-colors ${
              isActive ? "text-primary font-semibold" : ""
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li onClick={closeMenu}>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `block py-2 hover:text-primary transition-colors ${
              isActive ? "text-primary font-semibold" : ""
            }`
          }
        >
          Services
        </NavLink>
      </li>

      {user && (
        <>
          <li onClick={closeMenu}>
            <NavLink
              to="/my-services"
              className={({ isActive }) =>
                `block py-2 hover:text-primary transition-colors ${
                  isActive ? "text-primary font-semibold" : ""
                }`
              }
            >
              My Services
            </NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink
              to="/add-service"
              className={({ isActive }) =>
                `block py-2 hover:text-primary transition-colors ${
                  isActive ? "text-primary font-semibold" : ""
                }`
              }
            >
              Add Service
            </NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                `block py-2 hover:text-primary transition-colors ${
                  isActive ? "text-primary font-semibold" : ""
                }`
              }
            >
              My Bookings
            </NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `block py-2 hover:text-primary transition-colors ${
                  isActive ? "text-primary font-semibold" : ""
                }`
              }
            >
              Profile
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">HH</span>
            </div>
            <span className="text-2xl font-bold text-primary">HomeHero</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 items-center">{navLinks}</ul>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt={user.displayName}
                  className="h-10 w-10 rounded-full border-2 border-primary object-cover"
                  title={user.displayName}
                />
                <button onClick={handleLogout} className="btn-primary">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-primary font-semibold hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl text-neutral-dark"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-2 pt-4">
            <ul className="flex flex-col space-y-1">{navLinks}</ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 pb-3">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/40"}
                      alt={user.displayName}
                      className="h-10 w-10 rounded-full border-2 border-primary object-cover"
                    />
                    <div>
                      <p className="font-medium">{user.displayName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="btn-primary w-full">
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block text-center py-2 text-primary font-semibold border-2 border-primary rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="btn-primary block text-center"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;