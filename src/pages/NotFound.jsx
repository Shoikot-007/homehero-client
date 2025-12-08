import { Link } from "react-router";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-neutral-light">
      <div className="text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <div className="w-64 h-64 mx-auto bg-white rounded-full flex items-center justify-center">
            <div className="text-8xl">🏠</div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-4xl font-bold text-neutral-dark mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        {/* Back to Home Button */}
        <Link to="/" className="btn-primary inline-flex items-center space-x-2">
          <FaHome />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;