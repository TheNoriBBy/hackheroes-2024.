import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant' | 'admin';
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  email: string;
  messages: Message[];
  lastUpdated: string;
}

const ZarzadzanieChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [adminReply, setAdminReply] = useState('');

  useEffect(() => {
    const loadChats = () => {
      const savedChats = JSON.parse(localStorage.getItem('supportChats') || '[]');
      setChats(savedChats.sort((a: Chat, b: Chat) => 
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      ));
    };

    loadChats();
    const interval = setInterval(loadChats, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDeleteChat = (chatId: string) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    localStorage.setItem('supportChats', JSON.stringify(updatedChats));
    setChats(updatedChats);
    setSelectedChat(null);
    toast.success('Czat został usunięty');
  };

  const handleAdminReply = () => {
    if (!selectedChat || !adminReply.trim()) return;

    const newMessage: Message = {
      role: 'admin',
      content: adminReply.trim(),
      timestamp: new Date().toISOString()
    };

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
      lastUpdated: new Date().toISOString()
    };

    const updatedChats = chats.map(chat =>
      chat.id === selectedChat.id ? updatedChat : chat
    );

    localStorage.setItem('supportChats', JSON.stringify(updatedChats));
    setChats(updatedChats);
    setSelectedChat(updatedChat);
    setAdminReply('');
    toast.success('Odpowiedź została wysłana');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Lista czatów</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 border rounded cursor-pointer hover:bg-gray-50 ${
                  selectedChat?.id === chat.id ? 'bg-gray-50' : ''
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{chat.email}</p>
                    <p className="text-sm text-gray-500">
                      Ostatnia aktualizacja: {new Date(chat.lastUpdated).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedChat && (
        <Card>
          <CardHeader>
            <CardTitle>Czat z {selectedChat.email}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 overflow-y-auto mb-4 space-y-4">
              {selectedChat.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-gray-100'
                        : message.role === 'admin'
                        ? 'bg-red-500 text-white'
                        : 'bg-primary text-white'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={adminReply}
                onChange={(e) => setAdminReply(e.target.value)}
                placeholder="Napisz odpowiedź..."
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={handleAdminReply}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
              >
                Wyślij
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ZarzadzanieChat;