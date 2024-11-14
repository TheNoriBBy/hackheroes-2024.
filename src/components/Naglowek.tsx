import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import AnimowaneTlo from "./AnimowaneTlo";

const Naglowek = () => {
  const scrollToData = () => {
    const element = document.getElementById('dane-klimatyczne');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      <AnimowaneTlo />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10"
      >
        <h1 className="text-5xl font-bold mb-6 text-primary">Klimat i Środowisko</h1>
        <p className="text-xl mb-8 text-primary-dark">Razem zadbajmy o naszą planetę</p>
        <button
          onClick={scrollToData}
          className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2 mx-auto"
        >
          Dowiedz się więcej
          <ArrowDown className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};

export default Naglowek;