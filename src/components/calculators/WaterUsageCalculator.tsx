import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets } from "lucide-react";

const WaterUsageCalculator = () => {
  const [showerTime, setShowerTime] = useState("");
  const [dishwasherUse, setDishwasherUse] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateWaterUsage = () => {
    const shower = parseFloat(showerTime) * 10;
    const dishwasher = parseFloat(dishwasherUse) * 15; 
    setResult(shower + dishwasher);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="w-6 h-6" />
          Kalkulator Zużycia Wody
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Czas prysznica dziennie (minuty)
            </label>
            <input
              type="number"
              value={showerTime}
              onChange={(e) => setShowerTime(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Podaj czas"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Ilość użyć zmywarki tygodniowo
            </label>
            <input
              type="number"
              value={dishwasherUse}
              onChange={(e) => setDishwasherUse(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Podaj ilość"
            />
          </div>
          <button
            onClick={calculateWaterUsage}
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
          >
            Oblicz
          </button>
          {result !== null && (
            <div className="mt-4 p-4 bg-white rounded shadow">
              <p className="text-center">
                Szacowane zużycie wody: {result.toFixed(2)} litrów
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterUsageCalculator;