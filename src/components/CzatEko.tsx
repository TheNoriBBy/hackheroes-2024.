import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const CzatEko = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [currentChat?.messages]);

  // Live chat update
  useEffect(() => {
    if (!currentChat) return;

    const interval = setInterval(() => {
      const chats = JSON.parse(localStorage.getItem('supportChats') || '[]');
      const updatedChat = chats.find((chat: Chat) => chat.id === currentChat.id);
      if (updatedChat && JSON.stringify(updatedChat) !== JSON.stringify(currentChat)) {
        setCurrentChat(updatedChat);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentChat]);

  const handleEmailSubmit = () => {
    if (!email.includes('@')) {
      toast.error('Podaj prawidłowy adres email');
      return;
    }

    const chats = JSON.parse(localStorage.getItem('supportChats') || '[]');
    const existingChat = chats.find((chat: Chat) => chat.email === email);

    if (existingChat) {
      setCurrentChat(existingChat);
    } else {
      const newChat: Chat = {
        id: crypto.randomUUID(),
        email,
        messages: [],
        lastUpdated: new Date().toISOString()
      };
      chats.push(newChat);
      localStorage.setItem('supportChats', JSON.stringify(chats));
      setCurrentChat(newChat);
    }

    setIsEmailSubmitted(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentChat) return;

    const newMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
      lastUpdated: new Date().toISOString()
    };

    setCurrentChat(updatedChat);

    const chats = JSON.parse(localStorage.getItem('supportChats') || '[]');
    const updatedChats = chats.map((chat: Chat) =>
      chat.id === currentChat.id ? updatedChat : chat
    );
    localStorage.setItem('supportChats', JSON.stringify(updatedChats));

    setInput('');
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl z-50"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Support Chat</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {!isEmailSubmitted ? (
              <div className="p-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Podaj swój email..."
                  className="w-full p-2 border rounded mb-2"
                />
                <button
                  onClick={handleEmailSubmit}
                  className="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark transition-colors"
                >
                  Rozpocznij czat
                </button>
              </div>
            ) : (
              <>
                <div
                  ref={chatRef}
                  className="h-96 overflow-y-auto p-4 space-y-4"
                >
                  {currentChat?.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-primary text-white'
                            : message.role === 'admin'
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Napisz wiadomość..."
                      className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="submit"
                      className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CzatEko;