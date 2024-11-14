import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner';

interface Smiec {
  id: number;
  typ: 'plastik' | 'papier' | 'szklo' | 'bio';
  pozycja: { x: number; y: number };
  zebrany: boolean;
}

const EkoLovca = () => {
  const [smieci, setSmieci] = useState<Smiec[]>([]);
  const [punkty, setPunkty] = useState(0);
  const [czasGry, setCzasGry] = useState(60);
  const [graAktywna, setGraAktywna] = useState(false);

  useEffect(() => {
    if (graAktywna && czasGry > 0) {
      const timer = setInterval(() => {
        setCzasGry((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (czasGry === 0) {
      koniecGry();
    }
  }, [czasGry, graAktywna]);

  const rozpocznijGre = () => {
    const noweSmieci = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      typ: ['plastik', 'papier', 'szklo', 'bio'][Math.floor(Math.random() * 4)] as 'plastik' | 'papier' | 'szklo' | 'bio',
      pozycja: {
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      },
      zebrany: false
    }));

    setSmieci(noweSmieci);
    setPunkty(0);
    setCzasGry(60);
    setGraAktywna(true);
  };

  const zbierzSmiec = (id: number, typ: string) => {
    setSmieci(prev =>
      prev.map(smiec =>
        smiec.id === id ? { ...smiec, zebrany: true } : smiec
      )
    );
    setPunkty(prev => prev + 10);
    toast.success(`Zebrano ${typ}! +10 punktów`);

    if (smieci.filter(s => !s.zebrany).length === 1) {
      koniecGry();
    }
  };

  const koniecGry = () => {
    setGraAktywna(false);
    toast.success(`Koniec gry! Zdobyto ${punkty} punktów!`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>EkoŁowca - Zbieranie Śmieci</CardTitle>
      </CardHeader>
      <CardContent>
        {!graAktywna ? (
          <div className="text-center">
            <p className="mb-4">Zbieraj śmieci i segreguj je do odpowiednich pojemników!</p>
            <button
              onClick={rozpocznijGre}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors"
            >
              Rozpocznij grę
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between mb-4">
              <div>Punkty: {punkty}</div>
              <div>Czas: {czasGry}s</div>
            </div>
            <div className="relative h-[400px] border rounded-lg bg-eco-light">
              {smieci.map((smiec) =>
                !smiec.zebrany && (
                  <motion.div
                    key={smiec.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${smiec.pozycja.x}%`,
                      top: `${smiec.pozycja.y}%`
                    }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => zbierzSmiec(smiec.id, smiec.typ)}
                  >
                    <div className={`w-8 h-8 rounded-full ${
                      smiec.typ === 'plastik' ? 'bg-yellow-500' :
                      smiec.typ === 'papier' ? 'bg-blue-500' :
                      smiec.typ === 'szklo' ? 'bg-green-500' :
                      'bg-brown-500'
                    }`} />
                  </motion.div>
                )
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EkoLovca;