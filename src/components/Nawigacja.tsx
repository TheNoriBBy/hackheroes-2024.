import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const Nawigacja = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-primary text-white py-4 fixed w-full top-0 z-50 shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold hover:text-accent-yellow transition-colors flex items-center gap-2">
            <Leaf className="w-6 h-6" />
            Klimat i Środowisko
          </Link>
          <div className="space-x-6">
            <Link to="/" className="hover:text-accent-yellow transition-colors">
              Strona Główna
            </Link>
            <Link to="/artykuly" className="hover:text-accent-yellow transition-colors">
              Artykuły
            </Link>
            <Link to="/narzedzia" className="hover:text-accent-yellow transition-colors">
              Narzędzia
            </Link>
            <Link to="/gry" className="hover:text-accent-yellow transition-colors">
              Gry
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Nawigacja;