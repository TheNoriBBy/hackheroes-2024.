import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Nawigacja from "@/components/Nawigacja";
import { ArrowLeft } from "lucide-react";
import Komentarze from "@/components/Komentarze";

interface Article {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  date: string;
  imageUrl: string;
}

const SzczegolyArtykulu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedArticles = localStorage.getItem("articles");
    if (savedArticles) {
      const articles = JSON.parse(savedArticles);
      const foundArticle = articles.find((a: Article) => a.id === Number(id));
      if (foundArticle) {
        setArticle(foundArticle);
      }
    }

    const adminSession = sessionStorage.getItem('adminSession');
    setIsAdmin(!!adminSession);
  }, [id]);

  if (!article) {
    return <div>Artykuł nie został znaleziony</div>;
  }

  return (
    <div className="min-h-screen bg-eco-light">
      <Nawigacja />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-24"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-primary-dark transition-colors mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Powrót do artykułów
        </button>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {article.imageUrl && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-4 text-primary"
          >
            {article.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-4"
          >
            <p className="text-lg font-medium mb-6">{article.shortDescription}</p>
            <p className="text-sm text-gray-500 mb-6">{article.date}</p>
            <div className="prose max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </motion.div>
          
          <Komentarze idArtykulu={article.id} czyAdmin={isAdmin} />
        </motion.article>
      </motion.div>
    </div>
  );
};

export default SzczegolyArtykulu;