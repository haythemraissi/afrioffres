
import React, { useState, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Upload, 
  FileText, 
  X, 
  AlertTriangle, 
  Download,
  MessageSquare,
  Lightbulb
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

const AIAssistant = () => {
  const {
    chatMessages,
    isAiProcessing,
    uploadedDocument,
    addChatMessage,
    setAiProcessing,
    setUploadedDocument,
    user
  } = useStore();

  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    addChatMessage('user', message);
    setMessage('');
    setAiProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "J'ai analysé votre demande. Voici mes recommandations pour structurer votre réponse à cet appel d'offres...",
        "D'après le document fourni, les points clés à retenir sont : 1) Critères d'éligibilité, 2) Documentation requise, 3) Échéances importantes...",
        "Voici une check-list personnalisée pour votre soumission : □ Vérifier les exigences légales □ Préparer les documents financiers □ Réviser la proposition technique...",
        "L'analyse du document révèle des opportunités d'optimisation. Je vous suggère de mettre l'accent sur votre expérience dans le secteur..."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addChatMessage('ai', randomResponse);
      setAiProcessing(false);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedDocument(file);
      addChatMessage('user', `Document téléchargé: ${file.name}`);
      addChatMessage('ai', "J'ai reçu votre document. Je l'analyse maintenant. Vous pouvez me poser des questions spécifiques sur son contenu.");
    }
  };

  const removeDocument = () => {
    setUploadedDocument(null);
  };

  if (user?.role === 'free') {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-dashed border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-4">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Assistant IA Premium</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600 text-lg">
              Analysez vos documents d'appel d'offres avec l'intelligence artificielle
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="space-y-2">
                <FileText className="h-8 w-8 text-blue-500 mx-auto" />
                <h3 className="font-semibold">Analyse de documents</h3>
                <p className="text-sm text-gray-600">Téléchargez vos PDF et obtenez une analyse détaillée</p>
              </div>
              <div className="space-y-2">
                <MessageSquare className="h-8 w-8 text-blue-500 mx-auto" />
                <h3 className="font-semibold">Chat interactif</h3>
                <p className="text-sm text-gray-600">Posez des questions et obtenez des réponses personnalisées</p>
              </div>
              <div className="space-y-2">
                <Lightbulb className="h-8 w-8 text-blue-500 mx-auto" />
                <h3 className="font-semibold">Recommandations</h3>
                <p className="text-sm text-gray-600">Recevez des conseils pour optimiser vos soumissions</p>
              </div>
              <div className="space-y-2">
                <Download className="h-8 w-8 text-blue-500 mx-auto" />
                <h3 className="font-semibold">Génération de documents</h3>
                <p className="text-sm text-gray-600">Créez des check-lists et des résumés automatiquement</p>
              </div>
            </div>

            <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-12 py-3 text-lg">
              Débloquer l'Assistant IA
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Warning Banner */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="flex items-center space-x-3 py-4">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
          <div className="text-sm text-amber-800">
            <strong>Avertissement:</strong> Cet assistant IA est fourni uniquement à titre d'aide. 
            Vérifiez toujours les informations avec les sources officielles avant de soumettre vos offres.
          </div>
        </CardContent>
      </Card>

      {/* Document Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Télécharger un document</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadedDocument ? (
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">{uploadedDocument.name}</p>
                    <p className="text-sm text-green-600">
                      {(uploadedDocument.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeDocument}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Glissez-déposez votre document ici ou</p>
                <Button 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choisir un fichier
                </Button>
                <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX jusqu'à 10MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-96">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <span>Assistant IA</span>
            <Badge variant="secondary">Premium</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {chatMessages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p>Bonjour ! Je suis votre assistant IA pour les appels d'offres.</p>
                  <p className="text-sm">Téléchargez un document ou posez-moi une question pour commencer.</p>
                </div>
              )}
              
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isAiProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <span className="text-sm">L'assistant réfléchit...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="flex space-x-2 pt-4 border-t">
            <Input
              placeholder="Posez votre question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim() || isAiProcessing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;
