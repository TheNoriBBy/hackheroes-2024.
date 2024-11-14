import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

const FormularzKontaktowy = () => {
  const [formData, setFormData] = useState({
    imie: "",
    email: "",
    wiadomosc: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imie || !formData.email || !formData.wiadomosc) {
      toast.error("Wypełnij wszystkie pola formularza");
      return;
    }
    
    toast.success("Wiadomość została wysłana!");
    setFormData({ imie: "", email: "", wiadomosc: "" });
  };

  return (
    <div className="py-16 bg-eco-light">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Skontaktuj się z nami
        </motion.h2>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Formularz kontaktowy</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Imię</label>
                <Input
                  value={formData.imie}
                  onChange={(e) => setFormData({ ...formData, imie: e.target.value })}
                  placeholder="Twoje imię"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="twoj@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Wiadomość</label>
                <Textarea
                  value={formData.wiadomosc}
                  onChange={(e) => setFormData({ ...formData, wiadomosc: e.target.value })}
                  placeholder="Twoja wiadomość..."
                  rows={5}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
              >
                Wyślij wiadomość
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormularzKontaktowy;