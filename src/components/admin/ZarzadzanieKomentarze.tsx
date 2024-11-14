import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface Komentarz {
  id: string;
  tresc: string;
  data: string;
  autor: string;
  odpowiedz?: string;
  usuniety?: boolean;
  idArtykulu: number;
}

const ZarzadzanieKomentarze = () => {
  const [komentarze, setKomentarze] = useState<Komentarz[]>([]);
  const [odpowiedz, setOdpowiedz] = useState('');
  const [aktywnyKomentarz, setAktywnyKomentarz] = useState<string | null>(null);

  useEffect(() => {
    const loadKomentarze = () => {
      const articles = JSON.parse(localStorage.getItem("articles") || "[]");
      const allKomentarze: Komentarz[] = [];
      
      articles.forEach((article: any) => {
        const articleKomentarze = JSON.parse(localStorage.getItem(`komentarze-${article.id}`) || "[]");
        allKomentarze.push(...articleKomentarze.map((k: Komentarz) => ({
          ...k,
          idArtykulu: article.id
        })));
      });

      setKomentarze(allKomentarze);
    };

    loadKomentarze();
    const interval = setInterval(loadKomentarze, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOdpowiedz = (komentarz: Komentarz) => {
    if (!odpowiedz.trim()) return;

    const komentarzeArtykulu = JSON.parse(localStorage.getItem(`komentarze-${komentarz.idArtykulu}`) || "[]");
    const updatedKomentarze = komentarzeArtykulu.map((k: Komentarz) => {
      if (k.id === komentarz.id) {
        return { ...k, odpowiedz };
      }
      return k;
    });

    localStorage.setItem(`komentarze-${komentarz.idArtykulu}`, JSON.stringify(updatedKomentarze));
    setOdpowiedz('');
    setAktywnyKomentarz(null);
    toast.success('Odpowiedź została dodana');
  };

  const handleUsun = (komentarz: Komentarz) => {
    const komentarzeArtykulu = JSON.parse(localStorage.getItem(`komentarze-${komentarz.idArtykulu}`) || "[]");
    const updatedKomentarze = komentarzeArtykulu.map((k: Komentarz) => {
      if (k.id === komentarz.id) {
        return { ...k, usuniety: true };
      }
      return k;
    });

    localStorage.setItem(`komentarze-${komentarz.idArtykulu}`, JSON.stringify(updatedKomentarze));
    toast.success('Komentarz został usunięty');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zarządzanie Komentarzami</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {komentarze.map((komentarz) => (
            <div key={komentarz.id} className="border rounded-lg p-4">
              {komentarz.usuniety ? (
                <p className="text-gray-500 italic">Komentarz został usunięty przez administratora</p>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{komentarz.tresc}</p>
                      <p className="text-sm text-gray-500">
                        {komentarz.autor} • {komentarz.data}
                      </p>
                      <p className="text-sm text-gray-500">ID Artykułu: {komentarz.idArtykulu}</p>
                    </div>
                    <button
                      onClick={() => handleUsun(komentarz)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Usuń
                    </button>
                  </div>

                  {komentarz.odpowiedz && (
                    <div className="mt-2 ml-4 p-2 bg-gray-50 rounded">
                      <p className="text-red-600 font-medium">Administrator:</p>
                      <p>{komentarz.odpowiedz}</p>
                    </div>
                  )}

                  {!komentarz.odpowiedz && (
                    <div className="mt-2">
                      {aktywnyKomentarz === komentarz.id ? (
                        <div>
                          <textarea
                            value={odpowiedz}
                            onChange={(e) => setOdpowiedz(e.target.value)}
                            placeholder="Napisz odpowiedź..."
                            className="w-full p-2 border rounded-lg mt-2"
                            rows={2}
                          />
                          <div className="mt-2 space-x-2">
                            <button
                              onClick={() => handleOdpowiedz(komentarz)}
                              className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark"
                            >
                              Odpowiedz
                            </button>
                            <button
                              onClick={() => {
                                setAktywnyKomentarz(null);
                                setOdpowiedz('');
                              }}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              Anuluj
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setAktywnyKomentarz(komentarz.id)}
                          className="text-primary hover:text-primary-dark"
                        >
                          Odpowiedz
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ZarzadzanieKomentarze;