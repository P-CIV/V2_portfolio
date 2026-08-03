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

// Rendu Markdown
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
        if (line.match(/^[*\-•] /)) return (
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

// Composant principal
const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen]               = useState(false);
  const [messages, setMessages]           = useState<Message[]>([]);
  const [input, setInput]                 = useState('');
  const [isLoading, setIsLoading]         = useState(false);
  const [showHistory, setShowHistory]     = useState(false);
  const [isCVReady, setIsCVReady]         = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [copied, setCopied]               = useState<number | null>(null);
  const [showHint, setShowHint]           = useState(false);


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
    if (isOpen) {
      setShowHint(false);
      setTimeout(() => inputRef.current?.focus(), 150);
      return;
    }

    const hintTimer = setTimeout(() => setShowHint(true), 2400);
    const hideTimer = setTimeout(() => setShowHint(false), 9000);

    return () => {
      clearTimeout(hintTimer);
      clearTimeout(hideTimer);
    };
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
      historySvc.current.getHistory().map((c) => ({
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

  // Rendu
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Floating button - Always visible and fixed */}
      {!isOpen && (
        <>
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-2 bottom-20 z-10"
              >
                <div className="relative w-[190px] rounded-[22px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.80),rgba(223,246,240,0.48),rgba(255,255,255,0.70))] dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.82),rgba(27,36,48,0.72),rgba(15,23,42,0.76))] shadow-[0_24px_60px_rgba(15,23,42,0.14),0_0_0_1px_rgba(255,255,255,0.55)] backdrop-blur-[18px] ring-1 ring-white/40 dark:ring-white/10">
                  <div className="absolute left-[74%] bottom-[-8px] h-4 w-4 translate-x-[-50%] rotate-45 border-r border-b border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.80),rgba(223,246,240,0.48),rgba(255,255,255,0.70))] dark:border-slate-800/80 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.82),rgba(27,36,48,0.72),rgba(15,23,42,0.76))]" />
                  <div className="px-3 py-2.5 text-center">
                    <p className="text-[12px] font-semibold leading-[1.4] text-[#0E2927] dark:text-[#F0FEFA] tracking-[-0.03em]">
                      Une question ?
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium leading-[1.35] text-slate-600 dark:text-slate-200 tracking-[-0.02em]">
                      Je suis là !
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            key="fab"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="relative w-14 h-14 rounded-[20px] bg-[linear-gradient(135deg,#DFF6F0,#A8F0E3_35%,#6DD5C4)]
                       shadow-[0_22px_45px_rgba(109,213,196,0.42),inset_0_1px_0_rgba(255,255,255,0.9)]
                       flex items-center justify-center text-[#0E2625]
                       hover:brightness-[1.03] transition-all duration-300
                       dark:bg-[linear-gradient(135deg,#6DD5C4,#52C9B7_42%,#2FB8A8)] ring-1 ring-white/80 dark:ring-white/10"
          >
            <Bot className="w-6 h-6 text-[#0E2625] dark:text-[#0F2B2A]" />
            {!configured && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
            )}
          </motion.button>
        </>
      )}
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="window"
            className="fixed inset-0 z-50 flex flex-col overflow-hidden
                       border border-white/10 dark:border-white/5
                       bg-white dark:bg-[#0f1117] text-gray-900 dark:text-white
                       shadow-2xl shadow-black/20 dark:shadow-black/50
                       sm:static sm:inset-auto sm:w-[370px] sm:h-[600px] sm:rounded-2xl max-w-full"
          >
            {/* ── Header ── */}
            <div className="px-4 py-3 flex items-center justify-between
                            bg-gradient-to-r from-[#DFF6F0] to-[#6DD5C4] shrink-0
                            dark:from-[#6DD5C4] dark:to-[#2FB8A8]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0E2625]/10 dark:bg-[#0E2625]/20 flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-4 h-4 text-[#0E2625] dark:text-[#EAFBF7]" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none text-[#0E2625] dark:text-[#EAFBF7]">Assistant</p>
                  <p className="text-[10px] text-[#0E2625]/80 dark:text-[#EAFBF7]/80 mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E2625] dark:bg-[#EAFBF7]" />
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
                        <div className="w-6 h-6 rounded-lg bg-[linear-gradient(135deg,#DFF6F0,#A8F0E3_35%,#6DD5C4)]
                                       dark:bg-[linear-gradient(135deg,#6DD5C4,#52C9B7_40%,#2FB8A8)]
                                       flex items-center justify-center shrink-0 mt-0.5 shadow-[0_8px_18px_rgba(109,213,196,0.3)]">
                          <Bot className="w-3 h-3 text-[#0E2625] dark:text-[#0F2B2A]" />
                        </div>
                      )}

                      <div className={`relative max-w-[78%] px-3.5 py-2.5 rounded-2xl ${
                        msg.type === 'user'
                          ? 'bg-[linear-gradient(135deg,#DFF6F0,#A8F0E3_35%,#6DD5C4)] text-[#0E2625] rounded-tr-sm shadow-[0_10px_24px_rgba(109,213,196,0.22)]'
                          : 'bg-[#F4F9F8] dark:bg-[#1b2a2a] text-gray-900 dark:text-[#EAFBF7] rounded-tl-sm border border-[#DFF6F0] dark:border-[#6DD5C4]/20'
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
                      <div className="w-6 h-6 rounded-lg bg-[linear-gradient(135deg,#DFF6F0,#A8F0E3_35%,#6DD5C4)]
                                      dark:bg-[linear-gradient(135deg,#6DD5C4,#52C9B7_40%,#2FB8A8)]
                                      flex items-center justify-center shrink-0 shadow-[0_8px_18px_rgba(109,213,196,0.3)]">
                        <Bot className="w-3 h-3 text-[#0E2625] dark:text-[#0F2B2A]" />
                      </div>
                      <div className="bg-[#F4F9F8] dark:bg-[#1b2a2a] px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center border border-[#DFF6F0] dark:border-[#6DD5C4]/20">
                        {[0, 0.15, 0.3].map((d: number, i: number) => (
                          <span key={i}
                            className="w-1.5 h-1.5 rounded-full bg-[#6DD5C4] animate-bounce"
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
                                  focus-within:border-[#6DD5C4]/80 transition-colors">
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
                      className="w-7 h-7 rounded-lg bg-[linear-gradient(135deg,#DFF6F0,#A8F0E3_35%,#6DD5C4)] hover:brightness-[1.04]
                                 dark:bg-[linear-gradient(135deg,#6DD5C4,#52C9B7_40%,#2FB8A8)]
                                 flex items-center justify-center transition-colors
                                 disabled:opacity-30 disabled:cursor-not-allowed shrink-0 text-[#0E2625]"
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