import { motion } from "framer-motion";
import Naglowek from "@/components/Naglowek";
import DaneKlimatyczne from "@/components/DaneKlimatyczne";
import PoradyEko from "@/components/PoradyEko";
import WizualizacjaWplywu from "@/components/WizualizacjaWplywu";
import FormularzKontaktowy from "@/components/FormularzKontaktowy";
import Nawigacja from "@/components/Nawigacja";

const Strona = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16"
    >
      <Nawigacja />
      <Naglowek />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <DaneKlimatyczne />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <PoradyEko />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <WizualizacjaWplywu />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <FormularzKontaktowy />
      </motion.div>
    </motion.div>
  );
};

export default Strona;