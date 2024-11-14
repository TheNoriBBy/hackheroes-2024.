import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Leaf, Droplets, Sun, Recycle } from "lucide-react";

const porady = [
  {
    tytul: "Oszczędzaj Energię",
    opis: "Wyłączaj niepotrzebne światła i urządzenia elektryczne",
    ikona: Sun
  },
  {
    tytul: "Oszczędzaj Wodę",
    opis: "Zakręcaj kran podczas mycia zębów, napraw cieknące krany",
    ikona: Droplets
  },
  {
    tytul: "Segreguj Odpady",
    opis: "Prawidłowo segreguj śmieci i ogranicz użycie plastiku",
    ikona: Recycle
  },
  {
    tytul: "Dbaj o Zieleń",
    opis: "Sadź rośliny i dbaj o tereny zielone w swojej okolicy",
    ikona: Leaf
  }
];

const PoradyEko = () => {
  return (
    <div className="py-16 bg-eco-light">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Porady Ekologiczne
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {porady.map((porada, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <porada.ikona className="w-5 h-5" />
                    {porada.tytul}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{porada.opis}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoradyEko;