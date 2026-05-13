'use client';

import { useState, useRef, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, Bot, User, Volume2, Sparkles, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
}

export default function AISpeakingPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I'm Ellie, your AI speaking partner. What would you like to practice today?", sender: 'ai', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript.trim()) {
            handleSend(transcript);
          }
          setIsRecording(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
          
          if (event.error === 'not-allowed') {
            alert('Microphone access is blocked. Please allow microphone access in your browser settings to use voice features.');
          } else if (event.error === 'no-speech') {
            // Silently handle no speech
          } else {
            alert(`Speech recognition error: ${event.error}`);
          }
        };

        recognitionRef.current.onend = () => {
          setIsRecording(false);
        };
      }
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Fetch real AI response
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.concat(userMsg).map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
        })
      });
      
      const data = await response.json();
      
      if (data.text) {
        const aiMsg: Message = { 
          id: (Date.now() + 1).toString(), 
          text: data.text, 
          sender: 'ai', 
          timestamp: new Date() 
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
        
        // Speak the AI response
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          setIsSpeaking(true);
          const utterance = new SpeechSynthesisUtterance(aiMsg.text);
          utterance.lang = 'en-US';
          utterance.rate = 0.9;
          utterance.onend = () => setIsSpeaking(false);
          utterance.onerror = () => setIsSpeaking(false);
          window.speechSynthesis.speak(utterance);
        }
      }
    } catch (error) {
      console.error('Failed to get AI response:', error);
      setIsTyping(false);
    }
  };

  const getAIResponse = (input: string) => {
    const text = input.toLowerCase();
    if (text.includes('hello') || text.includes('hi')) return "Hi there! I'm ready to help you practice. How about we talk about your hobbies?";
    if (text.includes('hobby') || text.includes('like')) return "That sounds interesting! Why do you enjoy doing that? It helps to use descriptive adjectives.";
    if (text.includes('weather')) return "The weather is a great small talk topic. Is it sunny where you are today?";
    return "That's a great point! Can you elaborate more on that? Try to use a complex sentence structure.";
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please try Chrome or Edge.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      try {
        setIsRecording(true);
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start recognition:", err);
        setIsRecording(false);
        // If it's already started, stop it first
        recognitionRef.current.stop();
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-navy text-white">
      <Sidebar />

      <main className="flex-1 h-screen flex flex-col bg-grid">
        <DashboardTopbar 
          title="AI Speaking Partner"
          subtitle="Improve your pronunciation and fluency with Ellie"
        />

        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-6 overflow-hidden">
          {/* Chat Container */}
          <div className="flex-1 glass rounded-3xl border border-white/08 overflow-hidden flex flex-col mb-6">
            {/* Header */}
            <div className="p-4 border-b border-white/06 bg-white/02 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 relative">
                  <Bot className="w-6 h-6 text-primary" />
                  {isSpeaking && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-primary/40"
                    />
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold">Ellie AI</div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${isSpeaking ? 'bg-primary animate-pulse' : 'bg-emerald-500 animate-pulse'}`} />
                    <span className={`text-[10px] font-bold uppercase ${isSpeaking ? 'text-primary' : 'text-emerald-500'}`}>
                      {isSpeaking ? 'Speaking...' : 'Online'}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-white/30 hover:text-white transition-colors">
                <Sparkles className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
                      msg.sender === 'user' ? 'bg-primary/10 border-primary/20' : 'bg-white/05 border-white/10'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-4 h-4 text-primary" /> : <Bot className="w-4 h-4 text-white/60" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none shadow-neon-sm' 
                        : 'bg-white/05 border border-white/08 text-white/80 rounded-tl-none'
                    }`}>
                      {msg.text}
                      {msg.sender === 'ai' && (
                        <button className="block mt-2 text-primary hover:text-primary-light">
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/05 border border-white/08 p-4 rounded-2xl rounded-tl-none flex gap-1">
                    <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white/02 border-t border-white/06">
              <div className="relative flex items-center gap-3">
                <button 
                  onClick={toggleRecording}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isRecording 
                      ? 'bg-red-500 shadow-neon-pink animate-pulse' 
                      : 'bg-white/05 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white'
                  }`}
                >
                  {isRecording ? <X className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5" />}
                </button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(inputText)}
                  placeholder={isRecording ? "Listening..." : "Type your message..."}
                  className="flex-1 bg-white/04 border border-white/08 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-all text-sm"
                />
                <button 
                  onClick={() => handleSend(inputText)}
                  disabled={!inputText.trim()}
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-neon-purple hover:opacity-90 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              {isRecording && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="mt-3 text-center text-[10px] text-red-400 font-bold uppercase tracking-widest"
                >
                  Recording in progress...
                </motion.div>
              )}
              <div className="mt-2 text-center">
                <button 
                  onClick={async () => {
                    try {
                      await navigator.mediaDevices.getUserMedia({ audio: true });
                      alert("Microphone access granted! You can now use voice features.");
                    } catch (err) {
                      alert("Could not access microphone. Please check your browser settings and ensure you are using HTTPS or localhost.");
                    }
                  }}
                  className="text-[10px] text-white/30 hover:text-white/60 transition-all underline underline-offset-2"
                >
                  Check Microphone Permissions
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
