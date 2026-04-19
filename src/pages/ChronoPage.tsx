import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Sparkles, Code, Brain, BookOpen, Lightbulb, RotateCcw } from 'lucide-react';

type Role = 'user' | 'assistant';

interface Message {
  role: Role;
  content: string;
}

const SUGGESTIONS = [
  { icon: Code,      label: 'Debug my code',        prompt: 'Help me debug this Python function that should reverse a linked list but keeps throwing an error.' },
  { icon: Brain,     label: 'Explain a concept',     prompt: 'Explain how transformer neural networks work, step by step, in simple terms.' },
  { icon: BookOpen,  label: 'Write something',       prompt: 'Write a professional email to a client explaining a project delay due to unexpected technical challenges.' },
  { icon: Lightbulb, label: 'Solve a problem',       prompt: 'What is the most efficient algorithm to find the longest common subsequence of two strings? Show code.' },
];

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';

  // Simple markdown-like rendering: code blocks and bold
  const renderContent = (text: string) => {
    const blocks = text.split(/(```[\s\S]*?```)/g);
    return blocks.map((block, i) => {
      if (block.startsWith('```') && block.endsWith('```')) {
        const lines = block.slice(3, -3).split('\n');
        const lang = lines[0].trim();
        const code = lines.slice(1).join('\n');
        return (
          <pre key={i} className="bg-black/40 border border-white/10 rounded-lg p-3 my-2 overflow-x-auto text-sm font-mono text-cyan-300 whitespace-pre-wrap">
            {lang && <div className="text-white/30 text-xs mb-2">{lang}</div>}
            {code || lines[0]}
          </pre>
        );
      }
      return (
        <span key={i} className="whitespace-pre-wrap">
          {block}
        </span>
      );
    });
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
        ${isUser
          ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-400'
          : 'bg-white/5 border border-white/10 text-white'
        }`}
      >
        {isUser ? 'U' : <Sparkles size={14} />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed
        ${isUser
          ? 'bg-cyan-500/15 border border-cyan-500/25 text-white rounded-tr-sm'
          : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm'
        }`}
      >
        {renderContent(msg.content)}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
        <Sparkles size={14} className="text-white" />
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChronoPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
  }, [input]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: 'user', content };
    const newMessages: Message[] = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/chrono', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-screen" style={{ background: '#030712' }}>

      {/* Top bar */}
      <div className="flex-shrink-0 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <Sparkles size={14} className="text-cyan-400" />
          </div>
          <span className="text-white font-semibold">Chrono</span>
          <span className="text-white/30 text-xs">by ChronigenAI</span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => { setMessages([]); setError(''); }}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs transition-colors"
          >
            <RotateCcw size={12} />
            New chat
          </button>
        )}
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">

          {/* Empty state */}
          {isEmpty && (
            <div className="flex flex-col items-center pt-16 pb-8">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                <Sparkles size={28} className="text-cyan-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Hi, I'm Chrono</h1>
              <p className="text-white/50 text-sm text-center max-w-md mb-10">
                An AI assistant by ChronigenAI — ready to help with code, math, writing, research, and complex problems.
              </p>

              {/* Suggestion cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                {SUGGESTIONS.map(({ icon: Icon, label, prompt }) => (
                  <button
                    key={label}
                    onClick={() => sendMessage(prompt)}
                    className="group text-left p-4 rounded-xl bg-white/3 border border-white/8 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={14} className="text-cyan-400" />
                      <span className="text-white text-sm font-medium">{label}</span>
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{prompt}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex flex-col gap-5">
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}
            {loading && <TypingDots />}
            {error && (
              <div className="text-center">
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 inline-block">
                  {error}
                </p>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 border-t border-white/5 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-cyan-500/40 transition-colors">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Chrono anything…"
              className="flex-1 bg-transparent text-white placeholder-white/30 text-sm resize-none outline-none leading-relaxed"
              style={{ minHeight: '24px', maxHeight: '160px' }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-8 h-8 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-white/10 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <Send size={14} className="text-white" />
            </button>
          </div>
          <p className="text-center text-white/20 text-xs mt-2">
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
