'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageBubble } from './MessageBubble';
import { SuggestedQuestions } from './SuggestedQuestions';
import { BreathingLoader } from '@/components/ui/BreathingLoader';
import type { ConciergeMessage, ConciergeContext } from '@/lib/conciergeTypes';

interface ConciergeChatProps {
  context: ConciergeContext;
}

export function ConciergeChat({ context }: ConciergeChatProps) {
  const [messages, setMessages] = useState<ConciergeMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ConciergeMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setStreamingContent('');

    try {
      const apiMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, context }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader');

      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                accumulated += parsed.text;
                setStreamingContent(accumulated);
              }
            } catch {
              // skip invalid JSON
            }
          }
        }
      }

      const assistantMessage: ConciergeMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: accumulated,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setStreamingContent('');
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ConciergeMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '죄송해요, 지금 연결이 불안정해요. 잠시 후 다시 시도해주세요.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-hlk-primary-light flex items-center justify-center mb-4">
              <span className="text-2xl">🌙</span>
            </div>
            <h3 className="text-lg font-bold text-hlk-text mb-2">수면 동료</h3>
            <p className="text-sm text-hlk-text-secondary text-center mb-6 max-w-xs">
              수면 고민이 있으시면 편하게 물어보세요.
              <br />
              나에게 맞는 콘텐츠와 루틴을 추천해드려요.
            </p>
            <SuggestedQuestions onSelect={sendMessage} />
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}

        {isLoading && streamingContent && (
          <MessageBubble role="assistant" content={streamingContent} isStreaming />
        )}

        {isLoading && !streamingContent && (
          <div className="flex justify-start mb-4">
            <div className="w-8 h-8 rounded-full bg-hlk-primary-light flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-sm">🌙</span>
            </div>
            <div className="bg-white border border-hlk-border/60 rounded-2xl rounded-bl-md px-4 py-3">
              <BreathingLoader size="sm" showGuide={false} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-hlk-border bg-white px-4 py-3">
        {messages.length > 0 && messages.length < 3 && (
          <div className="mb-3">
            <SuggestedQuestions onSelect={sendMessage} limit={3} />
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="수면 고민을 물어보세요..."
            className="flex-1 px-4 py-3 bg-hlk-bg rounded-xl text-sm text-hlk-text placeholder-hlk-text-tertiary focus:outline-none focus:ring-2 focus:ring-hlk-primary/20"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-3 bg-hlk-primary text-white rounded-xl font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-hlk-primary-dark transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
