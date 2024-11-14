import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ZarzadzanieChat from "@/components/admin/ZarzadzanieChat";
import ZarzadzanieArtykuly from "@/components/admin/ZarzadzanieArtykuly";
import ZarzadzanieKomentarze from "@/components/admin/ZarzadzanieKomentarze";

const PanelAdmina = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-eco-light py-16"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-eco-dark mb-12">
          Panel Administracyjny
        </h1>

        <Tabs defaultValue="articles">
          <TabsList className="mb-8">
            <TabsTrigger value="articles">Artykuły</TabsTrigger>
            <TabsTrigger value="comments">Komentarze</TabsTrigger>
            <TabsTrigger value="chats">Czaty</TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <ZarzadzanieArtykuly />
          </TabsContent>

          <TabsContent value="comments">
            <ZarzadzanieKomentarze />
          </TabsContent>

          <TabsContent value="chats">
            <ZarzadzanieChat />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default PanelAdmina;