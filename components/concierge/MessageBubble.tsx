'use client';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export function MessageBubble({ role, content, isStreaming = false }: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-hlk-primary-light flex items-center justify-center mr-2 flex-shrink-0 mt-1">
          <span className="text-sm">🌙</span>
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-hlk-primary text-white rounded-br-md'
            : 'bg-white border border-hlk-border/60 text-hlk-text rounded-bl-md'
        }`}
      >
        <div className="whitespace-pre-wrap">{content}</div>
        {isStreaming && (
          <span className="inline-block w-1.5 h-4 bg-hlk-primary/40 ml-0.5 animate-pulse rounded-sm" />
        )}
      </div>
    </div>
  );
}
