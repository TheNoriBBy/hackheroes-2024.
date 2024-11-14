import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { rok: '2018', temperatura: 14.7 },
  { rok: '2019', temperatura: 15.2 },
  { rok: '2020', temperatura: 15.8 },
  { rok: '2021', temperatura: 16.1 },
  { rok: '2022', temperatura: 16.5 },
];

const DaneKlimatyczne = () => {
  return (
    <div id="dane-klimatyczne" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Aktualne Dane Klimatyczne
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Średnia Temperatura Globalna</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rok" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="temperatura" stroke="#2563eb" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kluczowe Wskaźniki</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold">Poziom CO2 w atmosferze:</p>
                  <p>417 ppm (części na milion)</p>
                </li>
                <li>
                  <p className="font-semibold">Wzrost poziomu morza:</p>
                  <p>3.4 mm/rok</p>
                </li>
                <li>
                  <p className="font-semibold">Pokrywa lodowa Arktyki:</p>
                  <p>Zmniejsza się o 13% na dekadę</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DaneKlimatyczne;