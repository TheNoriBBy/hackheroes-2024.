import { motion } from "framer-motion";
import Navigation from "@/components/Nawigacja";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EkoLovca from "@/components/gry/EkoLovca";

interface Pytanie {
  pytanie: string;
  odpowiedzi: string[];
  poprawna: number;
  kategoria?: string;
}

const pytaniaEkoWiedza: Pytanie[] = [
  {
    pytanie: "Co jest główną przyczyną globalnego ocieplenia?",
    odpowiedzi: [
      "Emisja gazów cieplarnianych",
      "Naturalne cykle słoneczne",
      "Aktywność wulkaniczna",
      "Rotacja Ziemi"
    ],
    poprawna: 0
  },
  {
    pytanie: "Który z tych gazów jest najbardziej szkodliwy dla atmosfery?",
    odpowiedzi: ["Tlen", "Dwutlenek węgla", "Metan", "Azot"],
    poprawna: 2
  },
  {
    pytanie: "Jaki procent powierzchni Ziemi pokrywają lasy?",
    odpowiedzi: ["10%", "20%", "31%", "50%"],
    poprawna: 2
  },
  {
    pytanie: "Co to jest efekt cieplarniany?",
    odpowiedzi: [
      "Naturalne zjawisko utrzymujące ciepło na Ziemi",
      "Sztuczne ogrzewanie atmosfery",
      "Efekt działania elektrowni",
      "Zjawisko występujące tylko w szklarniach"
    ],
    poprawna: 0
  },
  {
    pytanie: "Który ocean absorbuje najwięcej CO2?",
    odpowiedzi: [
      "Ocean Spokojny",
      "Ocean Atlantycki",
      "Ocean Indyjski",
      "Ocean Arktyczny"
    ],
    poprawna: 0
  },
  {
    pytanie: "Jakie zjawisko jest skutkiem wylesiania?",
    odpowiedzi: [
      "Zwiększenie bioróżnorodności",
      "Zwiększenie emisji CO2",
      "Spadek temperatury",
      "Zwiększenie ilości opadów"
    ],
    poprawna: 1
  },
  {
    pytanie: "Które z tych działań jest najskuteczniejsze w walce z zanieczyszczeniem powietrza?",
    odpowiedzi: [
      "Zwiększenie użycia paliw kopalnych",
      "Promowanie transportu publicznego",
      "Zwiększenie liczby samochodów osobowych",
      "Zamknięcie fabryk"
    ],
    poprawna: 1
  },
  {
    pytanie: "Jakie są główne źródła energii odnawialnej?",
    odpowiedzi: [
      "Węgiel, ropa, gaz",
      "Wiatr, słońce, woda",
      "Uran, tor, węgiel",
      "Biomasa, węgiel, gaz"
    ],
    poprawna: 1
  },
  {
    pytanie: "Jak nazywa się proces, w którym rośliny przekształcają dwutlenek węgla w tlen?",
    odpowiedzi: [
      "Fotosynteza",
      "Oddychanie",
      "Fermentacja",
      "Wydalanie"
    ],
    poprawna: 0
  }
];

const pytaniaEkoIQ: Pytanie[] = [
  {
    pytanie: "Jakie jest główne źródło energii odnawialnej w Polsce?",
    odpowiedzi: ["Wiatr", "Słońce", "Biomasa", "Woda"],
    poprawna: 0,
    kategoria: "Energia"
  },
  {
    pytanie: "Ile lat potrzebuje plastikowa butelka na rozkład?",
    odpowiedzi: ["100 lat", "300 lat", "450 lat", "1000 lat"],
    poprawna: 2,
    kategoria: "Odpady"
  },
  {
    pytanie: "Co to jest bioróżnorodność?",
    odpowiedzi: [
      "Różnorodność gatunków w ekosystemie",
      "Rodzaj paliwa",
      "Metoda recyklingu",
      "Typ gleby"
    ],
    poprawna: 0,
    kategoria: "Ekologia"
  },
  {
    pytanie: "Jakie jest główne zagrożenie dla raf koralowych?",
    odpowiedzi: [
      "Zanieczyszczenie wód",
      "Nadmierna ilość ryb",
      "Ocieplenie wód oceanicznych",
      "Zwiększona ilość planktonu"
    ],
    poprawna: 0,
    kategoria: "Ekologia"
  },
  {
    pytanie: "Co oznacza termin 'zero waste'?",
    odpowiedzi: [
      "Produkcja odpadów",
      "Minimalizacja odpadów",
      "Recykling",
      "Spalanie odpadów"
    ],
    poprawna: 1,
    kategoria: "Odpady"
  },
  {
    pytanie: "Jakie jest najczęstsze źródło zanieczyszczeń wód?",
    odpowiedzi: [
      "Przemysł",
      "Rolnictwo",
      "Gospodarstwa domowe",
      "Transport"
    ],
    poprawna: 1,
    kategoria: "Woda"
  },
  {
    pytanie: "Jakie działanie może pomóc w ochronie bioróżnorodności?",
    odpowiedzi: [
      "Wzrost urbanizacji",
      "Ochrona siedlisk naturalnych",
      "Zwiększenie produkcji przemysłowej",
      "Zwiększenie użycia pestycydów"
    ],
    poprawna: 1,
    kategoria: "Ekologia"
  }
];

const Gry = () => {
  const [wynik, setWynik] = useState(0);
  const [aktualnePytanie, setAktualnePytanie] = useState(0);
  const [graRozpoczeta, setGraRozpoczeta] = useState(false);
  const [wybranaGra, setWybranaGra] = useState<string | null>(null);
  const [pytania, setPytania] = useState<Pytanie[]>([]);

  const rozpocznijGre = (nazwaGry: string) => {
    setWybranaGra(nazwaGry);
    setGraRozpoczeta(true);
    setWynik(0);
    setAktualnePytanie(0);

    if (nazwaGry === 'EkoWiedza') {
      const pomieszanePytania = [...pytaniaEkoWiedza]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
      setPytania(pomieszanePytania);
    } else if (nazwaGry === 'EkoIQ') {
      const pomieszanePytania = [...pytaniaEkoIQ]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
      setPytania(pomieszanePytania);
    }
  };

  const sprawdzOdpowiedz = (indeksOdpowiedzi: number) => {
    if (indeksOdpowiedzi === pytania[aktualnePytanie].poprawna) {
      setWynik(wynik + 1);
      toast.success("Poprawna odpowiedź!");
    } else {
      toast.error("Niepoprawna odpowiedź!");
    }

    if (aktualnePytanie < pytania.length - 1) {
      setAktualnePytanie(aktualnePytanie + 1);
    } else {
      const finalnyWynik = wynik + (indeksOdpowiedzi === pytania[aktualnePytanie].poprawna ? 1 : 0);
      if (wybranaGra === 'EkoIQ') {
        const iq = Math.round(80 + (finalnyWynik / pytania.length) * 40);
        toast.success(`Koniec testu! Twój EkoIQ: ${iq}`);
      } else {
        toast.success(`Koniec gry! Twój wynik: ${finalnyWynik}/${pytania.length}`);
      }
      setGraRozpoczeta(false);
      setWybranaGra(null);
    }
  };

  return (
    <div className="min-h-screen bg-eco-light">
      <Navigation />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 pt-24"
      >
        <h1 className="text-4xl font-bold text-center text-eco-dark mb-12">
          Gry Edukacyjne
        </h1>

        {!graRozpoczeta ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => rozpocznijGre('EkoWiedza')}>
              <CardHeader>
                <CardTitle>EkoWiedza</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Sprawdź swoją wiedzę o środowisku i klimacie!</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => rozpocznijGre('EkoIQ')}>
              <CardHeader>
                <CardTitle>Test EkoIQ</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Sprawdź swój poziom wiedzy ekologicznej i poznaj swój EkoIQ!</p>
              </CardContent>
            </Card>

            <EkoLovca />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">
                {pytania[aktualnePytanie].pytanie}
              </h3>
              <div className="space-y-3">
                {pytania[aktualnePytanie].odpowiedzi.map((odpowiedz, index) => (
                  <button
                    key={index}
                    onClick={() => sprawdzOdpowiedz(index)}
                    className="w-full text-left p-4 rounded bg-eco-light hover:bg-primary hover:text-white transition-colors"
                  >
                    {odpowiedz}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-center text-gray-600">
              Pytanie {aktualnePytanie + 1} z {pytania.length}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Gry;
