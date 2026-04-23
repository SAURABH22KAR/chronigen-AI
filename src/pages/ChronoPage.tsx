import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Sparkles, Code, Brain, BookOpen, Lightbulb, RotateCcw, Copy, Check } from 'lucide-react';

type Role = 'user' | 'assistant';

interface Message {
  role: Role;
  content: string;
}

const SUGGESTIONS = [
  { icon: Code,      label: 'Debug my code',      prompt: 'Help me debug this Python function that should reverse a linked list but keeps throwing an error.' },
  { icon: Brain,     label: 'Explain a concept',   prompt: 'Explain how transformer neural networks work, step by step, in simple terms.' },
  { icon: BookOpen,  label: 'Write something',     prompt: 'Write a professional email to a client explaining a project delay due to unexpected technical challenges.' },
  { icon: Lightbulb, label: 'Solve a problem',     prompt: 'What is the most efficient algorithm to find the longest common subsequence of two strings? Show code.' },
];

// ── Markdown renderer ────────────────────────────────────────────────────────

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-3 rounded-xl overflow-hidden border border-white/10">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <span className="text-white/40 text-xs font-mono">{lang || 'plaintext'}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1 text-white/40 hover:text-white/70 text-xs transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="bg-black/50 p-4 overflow-x-auto text-sm font-mono text-cyan-300 whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[\s\S]+?\*\*|\*[\s\S]+?\*|`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**') && p.length > 4)
      return <strong key={i} className="font-semibold text-white">{p.slice(2, -2)}</strong>;
    if (p.startsWith('*') && p.endsWith('*') && p.length > 2)
      return <em key={i} className="italic text-gray-300">{p.slice(1, -1)}</em>;
    if (p.startsWith('`') && p.endsWith('`') && p.length > 2)
      return (
        <code key={i} className="bg-black/50 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono border border-white/10">
          {p.slice(1, -1)}
        </code>
      );
    return <span key={i}>{p}</span>;
  });
}

function renderTextBlock(text: string, key: number): React.ReactNode {
  const lines = text.split('\n');
  const nodes: React.ReactNode[] = [];
  let listLines: string[] = [];
  let isOrdered = false;

  const flushList = (k: string) => {
    if (!listLines.length) return;
    const Tag = isOrdered ? 'ol' : 'ul';
    const cls = isOrdered
      ? 'list-decimal pl-5 my-2 space-y-0.5 text-gray-200'
      : 'list-disc pl-5 my-2 space-y-0.5 text-gray-200';
    nodes.push(
      <Tag key={k} className={cls}>
        {listLines.map((l, i) => (
          <li key={i} className="leading-relaxed">{renderInline(l)}</li>
        ))}
      </Tag>
    );
    listLines = [];
  };

  lines.forEach((line, i) => {
    if (line.startsWith('### ')) {
      flushList(`fl${i}`);
      nodes.push(<h3 key={i} className="text-sm font-semibold text-white mt-3 mb-0.5">{renderInline(line.slice(4))}</h3>);
    } else if (line.startsWith('## ')) {
      flushList(`fl${i}`);
      nodes.push(<h2 key={i} className="text-base font-bold text-white mt-4 mb-1">{renderInline(line.slice(3))}</h2>);
    } else if (line.startsWith('# ')) {
      flushList(`fl${i}`);
      nodes.push(<h1 key={i} className="text-lg font-bold text-white mt-4 mb-1">{renderInline(line.slice(2))}</h1>);
    } else if (/^[-*] /.test(line)) {
      if (listLines.length && isOrdered) flushList(`fl${i}`);
      isOrdered = false;
      listLines.push(line.slice(2));
    } else if (/^\d+\. /.test(line)) {
      if (listLines.length && !isOrdered) flushList(`fl${i}`);
      isOrdered = true;
      listLines.push(line.replace(/^\d+\. /, ''));
    } else if (line.trim() === '') {
      flushList(`fl${i}`);
    } else {
      flushList(`fl${i}`);
      nodes.push(<p key={i} className="leading-relaxed">{renderInline(line)}</p>);
    }
  });

  flushList('end');
  return <div key={key}>{nodes}</div>;
}

function renderMarkdown(text: string): React.ReactNode {
  const segments: { type: 'text' | 'code'; lang?: string; content: string }[] = [];
  const regex = /```([\w]*)\n([\s\S]*?)```/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) segments.push({ type: 'text', content: text.slice(last, m.index) });
    segments.push({ type: 'code', lang: m[1], content: m[2] });
    last = m.index + m[0].length;
  }

  const tail = text.slice(last);
  if (tail) {
    // Gracefully handle unclosed code block while streaming
    const openIdx = tail.lastIndexOf('```');
    if (openIdx !== -1) {
      const before = tail.slice(0, openIdx);
      const inside = tail.slice(openIdx + 3);
      const firstNewline = inside.indexOf('\n');
      const lang = firstNewline > -1 ? inside.slice(0, firstNewline).trim() : '';
      const code = firstNewline > -1 ? inside.slice(firstNewline + 1) : '';
      if (before) segments.push({ type: 'text', content: before });
      segments.push({ type: 'code', lang, content: code });
    } else {
      segments.push({ type: 'text', content: tail });
    }
  }

  return (
    <>
      {segments.map((seg, i) =>
        seg.type === 'code'
          ? <CodeBlock key={i} lang={seg.lang ?? ''} code={seg.content} />
          : renderTextBlock(seg.content, i)
      )}
    </>
  );
}

// ── Bubbles ──────────────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
        ${isUser
          ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-400'
          : 'bg-white/5 border border-white/10 text-white'
        }`}
      >
        {isUser ? 'U' : <Sparkles size={14} />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed
        ${isUser
          ? 'bg-cyan-500/15 border border-cyan-500/25 text-white rounded-tr-sm whitespace-pre-wrap'
          : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm'
        }`}
      >
        {isUser ? msg.content : renderMarkdown(msg.content)}
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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ChronoPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingContent, setStreamingContent] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent, loading]);

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
    const history: Message[] = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);
    setStreamingContent('');
    setError('');

    let fullContent = '';

    try {
      const res = await fetch('/api/chrono', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to get response');
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buf = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (raw === '[DONE]') continue;
          try {
            const event = JSON.parse(raw);
            if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
              fullContent += event.delta.text;
              setStreamingContent(fullContent);
            }
          } catch { /* partial chunk */ }
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: fullContent || '(no response)' }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      setStreamingContent('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isEmpty = messages.length === 0 && !loading;

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
            onClick={() => { setMessages([]); setError(''); setStreamingContent(''); }}
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

            {/* Live streaming bubble */}
            {loading && streamingContent === '' && <TypingDots />}
            {loading && streamingContent !== '' && (
              <MessageBubble msg={{ role: 'assistant', content: streamingContent }} />
            )}

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
