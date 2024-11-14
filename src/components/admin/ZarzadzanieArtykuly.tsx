import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Article {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  date: string;
  imageUrl: string;
}

const ZarzadzanieArtykuly = () => {
  const [articles, setArticles] = useState<Article[]>(() => {
    const savedArticles = localStorage.getItem("articles");
    return savedArticles ? JSON.parse(savedArticles) : [];
  });
  const [newArticle, setNewArticle] = useState({
    title: "",
    shortDescription: "",
    content: "",
    imageUrl: ""
  });
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const handleAddArticle = () => {
    if (!newArticle.title || !newArticle.shortDescription || !newArticle.content) {
      toast.error("Wypełnij wszystkie pola");
      return;
    }

    const article: Article = {
      id: Date.now(),
      title: newArticle.title,
      shortDescription: newArticle.shortDescription,
      content: newArticle.content,
      imageUrl: newArticle.imageUrl,
      date: new Date().toLocaleDateString(),
    };

    const updatedArticles = [...articles, article];
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
    setNewArticle({ title: "", shortDescription: "", content: "", imageUrl: "" });
    toast.success("Artykuł został dodany");
  };

  const handleDeleteArticle = (id: number) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
    toast.success("Artykuł został usunięty");
  };

  const handleUpdateArticle = () => {
    if (!editingArticle) return;
    
    const updatedArticles = articles.map((article) =>
      article.id === editingArticle.id ? editingArticle : article
    );
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
    setEditingArticle(null);
    toast.success("Artykuł został zaktualizowany");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zarządzanie Artykułami</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL Obrazu</Label>
            <Input
              id="imageUrl"
              placeholder="URL obrazu"
              value={editingArticle ? editingArticle.imageUrl : newArticle.imageUrl}
              onChange={(e) =>
                editingArticle
                  ? setEditingArticle({ ...editingArticle, imageUrl: e.target.value })
                  : setNewArticle({ ...newArticle, imageUrl: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Tytuł</Label>
            <Input
              id="title"
              placeholder="Tytuł artykułu"
              value={editingArticle ? editingArticle.title : newArticle.title}
              onChange={(e) =>
                editingArticle
                  ? setEditingArticle({ ...editingArticle, title: e.target.value })
                  : setNewArticle({ ...newArticle, title: e.target.value })
              }
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="shortDescription">Krótki Opis</Label>
            <Textarea
              id="shortDescription"
              placeholder="Krótki opis artykułu"
              value={editingArticle ? editingArticle.shortDescription : newArticle.shortDescription}
              onChange={(e) =>
                editingArticle
                  ? setEditingArticle({ ...editingArticle, shortDescription: e.target.value })
                  : setNewArticle({ ...newArticle, shortDescription: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Treść</Label>
            <Textarea
              id="content"
              placeholder="Treść artykułu"
              className="min-h-[200px]"
              value={editingArticle ? editingArticle.content : newArticle.content}
              onChange={(e) =>
                editingArticle
                  ? setEditingArticle({ ...editingArticle, content: e.target.value })
                  : setNewArticle({ ...newArticle, content: e.target.value })
              }
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={editingArticle ? handleUpdateArticle : handleAddArticle}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
            >
              {editingArticle ? "Zaktualizuj" : "Dodaj"}
            </button>
            {editingArticle && (
              <button
                onClick={() => setEditingArticle(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Anuluj
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardContent className="p-6">
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-2">{article.shortDescription}</p>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.content}</p>
                <p className="text-sm text-gray-500 mb-4">{article.date}</p>
                <div className="space-x-2">
                  <button
                    onClick={() => setEditingArticle(article)}
                    className="bg-accent-blue text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(article.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Usuń
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ZarzadzanieArtykuly;