
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Log additional debugging information
    console.log("Current URL:", window.location.href);
    console.log("Base URL:", document.baseURI);
    console.log("Path:", location.pathname);
    console.log("Hash:", location.hash);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-2">
          <Button asChild className="w-full">
            <Link to="/">Return to Home</Link>
          </Button>
          <div className="text-xs text-gray-400 mt-4">
            Path: {location.pathname}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
