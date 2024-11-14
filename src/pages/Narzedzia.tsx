import { motion } from "framer-motion";
import Nawigacja from "@/components/Nawigacja";
import { Calculator, Leaf } from "lucide-react";
import { useState } from "react";
import WaterUsageCalculator from "@/components/calculators/WaterUsageCalculator";
import EnergyUsageCalculator from "@/components/calculators/EnergyUsageCalculator";
import EkoLovca from "@/components/gry/EkoLovca";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Narzedzia = () => {
  const [co2Result, setCo2Result] = useState<number | null>(null);
  const [distance, setDistance] = useState("");
  const [vehicleType, setVehicleType] = useState("car");

  const calculateCO2 = () => {
    const dist = parseFloat(distance);
    if (isNaN(dist)) return;

    const factors = {
      car: 0.12,
      bus: 0.08,
      train: 0.04,
      bike: 0,
    };

    setCo2Result(dist * factors[vehicleType as keyof typeof factors]);
  };

  return (
    <div className="min-h-screen bg-eco-light">
      <Nawigacja />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 pt-24"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-center text-eco-dark mb-12"
        >
          Narzędzia Ekologiczne
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-6 h-6" />
                  Kalkulator Emisji CO2
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Dystans (km)
                    </label>
                    <input
                      type="number"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Podaj dystans"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Środek transportu
                    </label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="car">Samochód</option>
                      <option value="bus">Autobus</option>
                      <option value="train">Pociąg</option>
                      <option value="bike">Rower</option>
                    </select>
                  </div>
                  <button
                    onClick={calculateCO2}
                    className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
                  >
                    Oblicz
                  </button>
                  {co2Result !== null && (
                    <div className="mt-4 p-4 bg-white rounded shadow">
                      <p className="text-center">
                        Szacowana emisja CO2: {co2Result.toFixed(2)} kg
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <WaterUsageCalculator />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <EnergyUsageCalculator />
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <EkoLovca />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Narzedzia;
