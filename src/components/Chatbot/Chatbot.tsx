
import React, { useState } from 'react';
import { MessageCircle, X, Send, HelpCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

const Chatbot = () => {
  const { chatbotOpen, setChatbotOpen } = useStore();
  const [messages, setMessages] = useState<Array<{id: string, sender: 'user' | 'bot', message: string}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const quickQuestions = [
    "Comment soumettre une offre ?",
    "Quels documents sont requis ?",
    "Comment créer un compte premium ?",
    "Aide pour les filtres de recherche"
  ];

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user' as const,
      message: currentMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Pour soumettre une offre, vous devez d'abord vous inscrire sur la plateforme, puis consulter les détails de l'appel d'offres qui vous intéresse.",
        "Les documents généralement requis incluent : certificat d'entreprise, références, situation fiscale, et proposition technique détaillée.",
        "Je peux vous aider avec cette question. Avez-vous consulté notre section d'aide dans les paramètres ?",
        "Pour plus d'informations détaillées, je vous recommande de contacter notre équipe support."
      ];

      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot' as const,
        message: botResponses[Math.floor(Math.random() * botResponses.length)]
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setCurrentMessage(question);
    handleSendMessage();
  };

  if (!chatbotOpen) {
    return (
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg z-50"
        onClick={() => setChatbotOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
        <CardTitle className="text-sm font-medium">Assistant #AfriOffres</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setChatbotOpen(false)}
          className="h-6 w-6 p-0 text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <HelpCircle className="h-5 w-5" />
                <span className="text-sm">Comment puis-je vous aider ?</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs text-gray-500">Questions fréquentes :</p>
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left h-auto p-2 text-xs"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      msg.sender === 'user'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="border-t p-3">
          <div className="flex space-x-2">
            <Input
              placeholder="Tapez votre message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 text-sm"
            />
            <Button 
              size="sm"
              onClick={handleSendMessage}
              disabled={!currentMessage.trim()}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chatbot;
