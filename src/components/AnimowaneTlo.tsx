import { motion } from "framer-motion";

const AnimowaneTlo = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 text-primary/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              rotate: 0,
            }}
            animate={{
              y: window.innerHeight + 20,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
            >
              <path d="M12.79 21L3 11.21v2c0 .53.21 1.04.59 1.41l7.79 7.79c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83L12.79 21z"/>
              <path d="M11.38 17.41l8.83-8.83c.78-.78.78-2.05 0-2.83l-6.21-6.21c-.78-.78-2.05-.78-2.83 0L3 7.71V11.21l8.38 6.2z"/>
            </svg>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AnimowaneTlo;