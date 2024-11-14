import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-eco-light flex items-center justify-center z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <Leaf className="w-16 h-16 text-primary" />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;