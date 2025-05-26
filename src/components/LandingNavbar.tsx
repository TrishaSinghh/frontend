
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const LandingNavbar = () => {
  return (
    <motion.header 
      className="fixed w-full top-0 z-50 bg-white/95 border-b border-gray-100 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="PharmInc Logo"
              className="h-8 w-auto rounded-md"
            />
          </Link>
        </div>
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Jobs</Link>
          <Link to="/research" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Research</Link>
          <Link to="/societies" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Societies</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About Us</Link>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative rounded-full bg-gray-100 px-3 py-2 flex items-center w-full">
            <Search className="h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="ml-2 bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400"
            />
          </div>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/home-feed">
            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default LandingNavbar;
