import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Waves } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm FloatChat, your AI assistant for exploring ARGO ocean data. Ask me questions like 'Show me salinity profiles near the equator in March 2023' or 'What are the nearest ARGO floats to this location?'",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const exampleQueries = [
    "Show me salinity profiles near the equator in March 2023",
    "Compare BGC parameters in the Arabian Sea for the last 6 months",
    "What are the nearest ARGO floats to longitude 75°E, latitude 15°N?",
    "Display temperature trends in the Indian Ocean this year"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm processing your query about ocean data. In a fully integrated system, I would search the ARGO database and provide visualizations and insights. Please connect to Supabase to enable full AI functionality.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleExampleQuery = (query: string) => {
    setInputValue(query);
  };

  return (
    <section className="py-20 bg-gradient-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Conversational Ocean Data Discovery
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ask questions in natural language and get intelligent insights from ARGO float data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Example Queries */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-ocean">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Waves className="w-5 h-5 text-accent" />
                Try These Queries
              </h3>
              <div className="space-y-3">
                {exampleQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left h-auto p-4 text-sm hover:bg-accent/10 transition-wave"
                    onClick={() => handleExampleQuery(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="shadow-ocean overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-ocean p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-foreground">FloatChat AI</h3>
                    <p className="text-sm text-primary-foreground/80">Ocean Data Assistant</p>
                  </div>
                  <Badge className="ml-auto bg-accent text-accent-foreground">Online</Badge>
                </div>
              </div>

              {/* Messages Area */}
              <ScrollArea className="h-96 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender === 'bot' && (
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-md p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>

                      {message.sender === 'user' && (
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-accent-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about ocean data..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;