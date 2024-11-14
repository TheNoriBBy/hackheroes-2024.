import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

const EnergyUsageCalculator = () => {
  const [lights, setLights] = useState("");
  const [devices, setDevices] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateEnergyUsage = () => {
    const lightUsage = parseFloat(lights) * 0.06; 
    const deviceUsage = parseFloat(devices) * 0.1; 
    setResult(lightUsage + deviceUsage);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-6 h-6" />
          Kalkulator Zużycia Energii
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Ilość żarówek w domu
            </label>
            <input
              type="number"
              value={lights}
              onChange={(e) => setLights(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Podaj ilość"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Ilość urządzeń elektronicznych
            </label>
            <input
              type="number"
              value={devices}
              onChange={(e) => setDevices(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Podaj ilość"
            />
          </div>
          <button
            onClick={calculateEnergyUsage}
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
          >
            Oblicz
          </button>
          {result !== null && (
            <div className="mt-4 p-4 bg-white rounded shadow">
              <p className="text-center">
                Szacowane zużycie energii: {result.toFixed(2)} kWh dziennie
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyUsageCalculator;