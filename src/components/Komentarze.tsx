import { useState } from 'react';
import { toast } from 'sonner';

interface Komentarz {
  id: string;
  tresc: string;
  data: string;
  autor: string;
  odpowiedz?: string;
  usuniety?: boolean;
}

interface Props {
  idArtykulu: number;
  czyAdmin: boolean;
}

const Komentarze = ({ idArtykulu, czyAdmin }: Props) => {
  const [komentarze, setKomentarze] = useState<Komentarz[]>(() => {
    const zapisaneKomentarze = localStorage.getItem(`komentarze-${idArtykulu}`);
    return zapisaneKomentarze ? JSON.parse(zapisaneKomentarze) : [];
  });
  const [nowyKomentarz, setNowyKomentarz] = useState('');
  const [odpowiedz, setOdpowiedz] = useState('');
  const [aktywnyKomentarz, setAktywnyKomentarz] = useState<string | null>(null);

  const dodajKomentarz = () => {
    if (!nowyKomentarz.trim()) return;

    const komentarz: Komentarz = {
      id: crypto.randomUUID(),
      tresc: nowyKomentarz,
      data: new Date().toLocaleString(),
      autor: 'User'
    };

    const noweKomentarze = [...komentarze, komentarz];
    setKomentarze(noweKomentarze);
    localStorage.setItem(`komentarze-${idArtykulu}`, JSON.stringify(noweKomentarze));
    setNowyKomentarz('');
    toast.success('Komentarz został dodany');
  };

  const odpowiedzNaKomentarz = (id: string) => {
    if (!odpowiedz.trim()) return;

    const noweKomentarze = komentarze.map(k => {
      if (k.id === id) {
        return { ...k, odpowiedz };
      }
      return k;
    });

    setKomentarze(noweKomentarze);
    localStorage.setItem(`komentarze-${idArtykulu}`, JSON.stringify(noweKomentarze));
    setOdpowiedz('');
    setAktywnyKomentarz(null);
    toast.success('Odpowiedź została dodana');
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Komentarze</h3>
      
      <div className="mb-6">
        <textarea
          value={nowyKomentarz}
          onChange={(e) => setNowyKomentarz(e.target.value)}
          placeholder="Dodaj komentarz..."
          className="w-full p-2 border rounded-lg"
          rows={3}
        />
        <button
          onClick={dodajKomentarz}
          className="mt-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          Dodaj komentarz
        </button>
      </div>

      <div className="space-y-4">
        {komentarze.map((komentarz) => (
          <div key={komentarz.id} className="border rounded-lg p-4">
            {komentarz.usuniety ? (
              <p className="text-gray-500 italic">Komentarz został usunięty przez administratora</p>
            ) : (
              <div>
                <div>
                  <p className="font-medium text-gray-800">{komentarz.tresc}</p>
                  <p className="text-sm text-gray-500">
                    {komentarz.autor} • {komentarz.data}
                  </p>
                </div>

                {komentarz.odpowiedz && (
                  <div className="mt-2 ml-4 p-2 bg-gray-50 rounded">
                    <p className="text-red-600 font-medium">Administrator:</p>
                    <p>{komentarz.odpowiedz}</p>
                  </div>
                )}

                {czyAdmin && !komentarz.odpowiedz && !komentarz.usuniety && (
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
                            onClick={() => odpowiedzNaKomentarz(komentarz.id)}
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
    </div>
  );
};

export default Komentarze;