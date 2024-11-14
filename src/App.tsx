import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Strona from "./pages/Strona";
import Artykuly from "./pages/Artykuly";
import SzczegolyArtykulu from "./pages/SzczegolyArtykulu";
import PanelAdmina from "./pages/PanelAdmina";
import Narzedzia from "./pages/Narzedzia";
import Gry from "./pages/Gry";
import LoadingScreen from "./components/LoadingScreen";
import CzatEko from "./components/CzatEko";

const queryClient = new QueryClient();

declare global {
  interface Window {
    adminpanel: () => void;
  }
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [adminId, setAdminId] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    window.adminpanel = async () => {
      const password = prompt("Podaj hasło do panelu administracyjnego:");
      if (!password) return;

      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(password + "-abudabi");
        const hashBuffer = await crypto.subtle.digest('SHA-512', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        const correctHash = "148f79b7b423fda77e8c2c420e808ef609ae76dd3563257eb4eca126d5cafd0e728037f0ac5203deb1ee2e9a7a388a6a2e96a1ac58941f9fabfd69e9d7802441";
        
        if (hashHex === correctHash) {
          const sessionToken = crypto.randomUUID();
          sessionStorage.setItem('adminSession', sessionToken);
          setAdminId(sessionToken);
          window.location.href = "/admin";
        } else {
          toast.error("Nieprawidłowe hasło!");
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error("Wystąpił błąd podczas autoryzacji");
      }
    };

    const existingSession = sessionStorage.getItem('adminSession');
    if (existingSession) {
      setAdminId(existingSession);
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Strona />} />
            <Route path="/artykuly" element={<Artykuly />} />
            <Route path="/artykul/:id" element={<SzczegolyArtykulu />} />
            <Route path="/narzedzia" element={<Narzedzia />} />
            <Route path="/gry" element={<Gry />} />
            <Route
              path="/admin"
              element={
                adminId ? (
                  <PanelAdmina />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </BrowserRouter>
        <CzatEko />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;