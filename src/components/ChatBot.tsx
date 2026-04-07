import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bot, Send, History, Trash2,
  RefreshCw, ChevronDown, Copy, Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HuggingFaceService } from '../services/huggingfaceService';
import { ChatHistoryService } from '../services/chatHistoryService';
import { Message, Conversation } from '../types/chat';
import { CVService } from '../services/cvService';

/* ─── Markdown-ish renderer ────────────────────────────────────────────────── */
function RenderMessage({ text }: { text: string }) {
  // Nettoyer les liens markdown [text](url) → text url
  let cleanText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1\n$2');
  
  // Réduire les tirets trop longs
  cleanText = cleanText.replace(/^-{6,}$/gm, '─────────');
  
  const lines = cleanText.split('\n');
  return (
    <div className="space-y-1 text-[0.82rem] leading-relaxed">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;

        // Bold: **text**
        const renderBold = (str: string) => {
          const parts = str.split(/(\*\*[^*]+\*\*)/g);
          return parts.map((p, j) =>
            p.startsWith('**') && p.endsWith('**')
              ? <strong key={j} className="font-semibold">{p.slice(2, -2)}</strong>
              : <span key={j}>{p}</span>
          );
        };

        // Contact labels (Email:, GitHub:, etc) - make key bold
        const contactMatch = line.match(/^([A-Za-z\s]+):\s*(.+)$/);
        if (contactMatch && ['Email', 'GitHub', 'LinkedIn', 'Portfolio', 'Téléphone', 'Website'].includes(contactMatch[1].trim())) {
          return (
            <p key={i} className="text-[0.81rem]">
              <strong className="font-semibold">{contactMatch[1]}:</strong> <code className="bg-gray-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-[0.77rem] font-mono">{contactMatch[2]}</code>
            </p>
          );
        }

        // Heading
        if (line.startsWith('### ')) return <p key={i} className="font-bold text-sm mt-2">{renderBold(line.slice(4))}</p>;
        if (line.startsWith('## '))  return <p key={i} className="font-bold text-sm mt-2">{renderBold(line.slice(3))}</p>;
        if (line.startsWith('# '))   return <p key={i} className="font-bold text-sm mt-2">{renderBold(line.slice(2))}</p>;

        // Bullet
        if (line.match(/^[\*\-•] /)) return (
          <div key={i} className="flex gap-2">
            <span className="mt-0.5 text-indigo-400 shrink-0">•</span>
            <span>{renderBold(line.slice(2))}</span>
          </div>
        );

        return <p key={i}>{renderBold(line)}</p>;
      })}
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────────────── */
const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen]               = useState(false);
  const [messages, setMessages]           = useState<Message[]>([]);
  const [input, setInput]                 = useState('');
  const [isLoading, setIsLoading]         = useState(false);
  const [showHistory, setShowHistory]     = useState(false);
  const [isCVReady, setIsCVReady]         = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [copied, setCopied]               = useState<number | null>(null);


  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);
  const svc            = useRef<HuggingFaceService | null>(null);
  const historySvc     = useRef(ChatHistoryService.getInstance());
  const cvSvc          = useRef(CVService.getInstance());

  /* ── Init ── */
  useEffect(() => {
    (async () => {
      try {
        if (!cvSvc.current.isCVLoaded()) await cvSvc.current.loadCV();
        setIsCVReady(true);
        svc.current = new HuggingFaceService();
        console.log('[ChatBot] API Configured:', svc.current.isConfigured());
        pushWelcome();
      } catch (err) {
        console.error('[ChatBot] Init error:', err);
        addBotMsg('⚠️ Erreur lors de l\'initialisation. Vérifiez que le serveur Groq est actif sur http://localhost:8000');
      }
    })();
    refreshHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  /* ── Helpers ── */
  const configured = svc.current?.isConfigured() ?? false;

  const pushWelcome = () => {
    addBotMsg(
      ' Bonjour 👋 Je suis l\'assistant IA de **Pascal Kambou**. Comment puis-je vous aider ?'
    );
  };

  const addBotMsg = (content: string) =>
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      content,
      type: 'bot',
      timestamp: new Date().toISOString(),
    }]);

  const refreshHistory = () => {
    setConversations(
      historySvc.current.getHistory().map((c: any) => ({
        id: Number(c.id),
        messages: c.messages,
        lastUpdated: c.date ?? new Date().toISOString(),
      }))
    );
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
    });

  /* ── Send ── */
  const handleSend = useCallback(async (text?: string) => {
    const query = (text ?? input).trim();
    if (!query || isLoading || !isCVReady || !svc.current) return;

    const userMsg: Message = {
      id: Date.now(),
      content: query,
      type: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => {
      const next = [...prev, userMsg];
      return next;
    });
    setInput('');
    setIsLoading(true);

    try {
      const res = await svc.current.processQuery(query);
      const botMsg: Message = {
        id: Date.now() + 1,
        content: res.response,
        type: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => {
        const updated = [...prev, botMsg];
        historySvc.current.saveConversation(updated);
        return updated;
      });
      refreshHistory();
    } catch (err) {
      console.error('[ChatBot] Send error:', err);
      addBotMsg(' Une erreur inattendue s\'est produite. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [input, isLoading, isCVReady]);

  /* ── Copy message ── */
  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  /* ── Reset ── */
  const handleReset = () => {
    svc.current?.resetConversation();
    setMessages([]);
    pushWelcome();
  };

  /* ─── RENDER ── */
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Floating button - Always visible and fixed */}
      {!isOpen && (
        <motion.button
          key="fab"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 
                     shadow-lg shadow-indigo-500/40 dark:shadow-indigo-500/20
                     flex items-center justify-center text-white
                     hover:from-indigo-600 hover:to-violet-700 transition-all
                     dark:from-indigo-600 dark:to-violet-700"
        >
          <Bot className="w-6 h-6 dark:text-white/90" />
          {!configured && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
          )}
        </motion.button>
      )}
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="window"
            className="w-[370px] h-[600px] flex flex-col rounded-2xl overflow-hidden
                       border border-white/10 dark:border-white/5
                       bg-white dark:bg-[#0f1117] text-gray-900 dark:text-white
                       shadow-2xl shadow-black/20 dark:shadow-black/50"
          >
            {/* ── Header ── */}
            <div className="px-4 py-3 flex items-center justify-between
                            bg-gradient-to-r from-indigo-600 to-violet-600 shrink-0
                            dark:from-indigo-700 dark:to-violet-700">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 dark:bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-4 h-4 text-white dark:text-indigo-200" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none text-white dark:text-white">Assistant</p>
                  <p className="text-[10px] text-white/80 dark:text-indigo-200 mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 dark:bg-green-400" />
                    actif
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[
                  { icon: RefreshCw, action: handleReset, tip: 'Nouvelle conversation' },
                  { icon: History, action: () => { setShowHistory(h => !h); }, tip: 'Historique' },
                  { icon: ChevronDown, action: () => setIsOpen(false), tip: 'Réduire' },
                ].map(({ icon: Icon, action, tip }) => (
                  <button
                    key={tip}
                    onClick={action}
                    title={tip}
                    className="w-7 h-7 rounded-lg hover:bg-white/20 dark:hover:bg-white/15 
                               flex items-center justify-center transition-colors text-white dark:text-white"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* ── History panel ── */}
            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-[#0f1117] space-y-2"
                >
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Historique
                  </p>
                  {conversations.length === 0 ? (
                    <p className="text-center text-sm text-gray-400 dark:text-gray-600 py-10">Aucune conversation</p>
                  ) : conversations.map((conv: Conversation) => (
                    <div key={conv.id}
                      onClick={() => {
                        setMessages(conv.messages.map((m: Message) => ({
                          ...m, id: typeof m.id === 'string' ? Number(m.id) : m.id
                        })));
                        setShowHistory(false);
                      }}
                      className="p-3 rounded-xl bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 
                                 cursor-pointer transition-colors group border border-gray-200 dark:border-transparent"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500 dark:text-gray-500">{formatDate(conv.lastUpdated)}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); historySvc.current.deleteConversation(String(conv.id)); refreshHistory(); }}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300 mt-1 truncate">
                        {conv.messages.find((m: Message) => m.type === 'user')?.content ?? 'Conversation'}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Messages ── */}
            {!showHistory && (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3
                                scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-white/10">
                  {messages.map((msg: Message) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 group ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {/* Bot avatar */}
                      {msg.type === 'bot' && (
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 
                                       dark:from-indigo-600 dark:to-violet-700
                                       flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      )}

                      <div className={`relative max-w-[78%] px-3.5 py-2.5 rounded-2xl ${
                        msg.type === 'user'
                          ? 'bg-indigo-600 dark:bg-indigo-600 text-white rounded-tr-sm'
                          : 'bg-gray-100 dark:bg-[#1e2130] text-gray-900 dark:text-gray-100 rounded-tl-sm'
                      }`}>
                        {msg.type === 'bot'
                          ? <RenderMessage text={msg.content} />
                          : <span className="text-[0.82rem]">{msg.content}</span>
                        }

                        {/* Copy button on bot messages */}
                        {msg.type === 'bot' && (
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100
                                       w-6 h-6 rounded-md bg-white dark:bg-[#2a2f42] border border-gray-300 dark:border-white/10
                                       flex items-center justify-center transition-all"
                          >
                            {copied === msg.id
                              ? <Check className="w-3 h-3 text-green-500 dark:text-green-400" />
                              : <Copy className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                            }
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-start">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 
                                      dark:from-indigo-600 dark:to-violet-700
                                      flex items-center justify-center shrink-0">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-gray-100 dark:bg-[#1e2130] px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                        {[0, 0.15, 0.3].map((d: number, i: number) => (
                          <span key={i}
                            className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-bounce"
                            style={{ animationDelay: `${d}s` }}
                          />
                        ))}
                        <span className="text-[10px] text-gray-500 dark:text-gray-500 ml-1"></span>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* ── Input bar ── */}
                <div className="px-3 pb-3 pt-2 bg-white dark:bg-[#0f1117] shrink-0 border-t border-gray-200 dark:border-white/5">
                  <div className="flex gap-2 items-center bg-gray-100 dark:bg-[#1e2130] rounded-xl px-3 py-2
                                  border border-gray-300 dark:border-white/10 
                                  focus-within:border-indigo-500/60 transition-colors">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                      placeholder={isCVReady ? 'Posez n\'importe quelle question…' : 'Chargement…'}
                      disabled={isLoading || !isCVReady}
                      className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-200 
                                 placeholder-gray-500 dark:placeholder-gray-600
                                 focus:outline-none disabled:opacity-40"
                    />
                    <button
                      onClick={() => handleSend()}
                      disabled={isLoading || !isCVReady || !input.trim()}
                      className="w-7 h-7 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500
                                 flex items-center justify-center transition-colors
                                 disabled:opacity-30 disabled:cursor-not-allowed shrink-0 text-white"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-center text-[9px] text-gray-600 dark:text-gray-700 mt-1.5">
                  © 2026 Pascal Kambou
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;