import Link from 'next/link';
import { columns, getColumnBySlug, getColumnsBySymptom } from '@/lib/columnsData';
import { notFound } from 'next/navigation';
import { ColumnCTA } from '@/components/columns/ColumnCTA';

// Elektra 인사이트: 전문가 권위 + 콘텐츠 하단 CTA
// Flo 인사이트: 관련 콘텐츠 추천 → 체류 시간 증가

export function generateStaticParams() {
  return columns.map((column) => ({
    slug: column.slug,
  }));
}

export default async function ColumnDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const column = getColumnBySlug(slug);

  if (!column) {
    notFound();
  }

  // 같은 증상의 다른 컬럼 (현재 글 제외)
  const relatedColumns = getColumnsBySymptom(column.symptomSlug).filter(
    (c) => c.slug !== column.slug
  );

  // 콘텐츠를 단락으로 분리
  const paragraphs = column.content.split('\n\n');

  return (
    <div className="min-h-screen bg-hlk-bg">
      {/* Breadcrumb */}
      <div className="bg-hlk-primary-light border-b border-hlk-border">
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/columns" className="text-hlk-text-tertiary hover:text-hlk-primary transition-colors">
              전문가 컬럼
            </Link>
            <span className="text-hlk-text-tertiary">/</span>
            <Link
              href={`/columns?category=${column.symptomSlug}`}
              className="text-hlk-text-tertiary hover:text-hlk-primary transition-colors"
            >
              {column.symptom}
            </Link>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-3xl mx-auto px-6 md:px-8">
        <header className="pt-10 pb-8 border-b border-hlk-border">
          {/* Category + Read time */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                column.category === 'body'
                  ? 'bg-hlk-primary/10 text-hlk-primary'
                  : 'bg-hlk-accent/10 text-hlk-accent'
              }`}
            >
              {column.symptom}
            </span>
            <span className="text-sm text-hlk-text-tertiary">{column.readTime}분 읽기</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-hlk-text leading-tight mb-4">
            {column.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-hlk-text-secondary leading-relaxed">
            {column.subtitle}
          </p>

          {/* Expert Card */}
          <div className="mt-8 flex items-center gap-4 p-5 bg-white rounded-xl border border-hlk-border">
            <div className="w-14 h-14 rounded-full bg-hlk-secondary-light flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-hlk-text">
                {column.expert.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-bold text-hlk-text">{column.expert.name}</p>
              <p className="text-sm text-hlk-text-secondary">{column.expert.title}</p>
              <p className="text-xs text-hlk-text-tertiary">{column.expert.credential}</p>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="py-10">
          <div className="prose-hlk space-y-6">
            {paragraphs.map((para, idx) => (
              <ContentBlock key={idx} content={para} />
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pb-8 border-b border-hlk-border">
          {column.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-hlk-surface-warm rounded-full text-sm text-hlk-text-secondary"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Inline CTA — Elektra: 콘텐츠 끝에 항상 다음 액션 */}
        <ColumnCTA symptomName={column.symptom} />

        {/* Related Columns — Flo: 관련 콘텐츠로 체류시간 증가 */}
        {relatedColumns.length > 0 && (
          <div className="pb-12">
            <h3 className="text-lg font-bold text-hlk-text mb-5">
              {column.symptom} 관련 다른 전문가 컬럼
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedColumns.map((related) => (
                <Link
                  key={related.slug}
                  href={`/columns/${related.slug}`}
                  className="group block p-5 bg-white rounded-xl border border-hlk-border hover:border-hlk-primary/30 transition-all"
                >
                  <h4 className="font-bold text-hlk-text group-hover:text-hlk-primary transition-colors line-clamp-2 mb-2">
                    {related.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-hlk-text-tertiary">
                    <span>{related.expert.name}</span>
                    <span>·</span>
                    <span>{related.readTime}분 읽기</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to list */}
        <div className="pb-16 text-center">
          <Link
            href="/columns"
            className="inline-flex items-center gap-2 text-sm text-hlk-text-secondary hover:text-hlk-primary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            전체 전문가 컬럼 목록으로
          </Link>
        </div>
      </article>
    </div>
  );
}

// 콘텐츠 블록 렌더링 (마크다운-like 파싱)
function ContentBlock({ content }: { content: string }) {
  const trimmed = content.trim();

  // 볼드 제목 (** 로 시작하는 줄)
  if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes('\n')) {
    const text = trimmed.replace(/\*\*/g, '');
    return (
      <h3 className="text-xl font-bold text-hlk-text mt-2">{text}</h3>
    );
  }

  // 리스트 (- 로 시작하는 줄이 포함)
  if (trimmed.includes('\n-') || trimmed.startsWith('-')) {
    const lines = trimmed.split('\n');
    const title = lines[0].startsWith('-') ? null : lines[0];
    const items = lines.filter((l) => l.trim().startsWith('-'));

    return (
      <div>
        {title && <BoldText text={title} className="text-base font-semibold text-hlk-text mb-3" />}
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base text-hlk-text-secondary leading-relaxed">
              <span className="text-hlk-primary mt-1.5 shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="3" />
                </svg>
              </span>
              <BoldText text={item.replace(/^-\s*/, '')} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // 번호 리스트 (1. 로 시작하는 줄이 포함)
  if (/\n\d+\./.test(trimmed) || /^\d+\./.test(trimmed)) {
    const lines = trimmed.split('\n');
    const title = /^\d+\./.test(lines[0]) ? null : lines[0];
    const items = lines.filter((l) => /^\d+\./.test(l.trim()));

    return (
      <div>
        {title && <BoldText text={title} className="text-base font-semibold text-hlk-text mb-3" />}
        <ol className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base text-hlk-text-secondary leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-hlk-primary/10 text-hlk-primary text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <BoldText text={item.replace(/^\d+\.\s*/, '')} />
            </li>
          ))}
        </ol>
      </div>
    );
  }

  // 테이블 (| 포함)
  if (trimmed.includes('|') && trimmed.split('\n').length > 2) {
    const lines = trimmed.split('\n').filter((l) => l.trim() && !l.trim().match(/^\|[-\s|]+\|$/));
    if (lines.length < 2) return <BoldText text={trimmed} className="text-base text-hlk-text-secondary leading-relaxed" />;
    const headers = lines[0].split('|').map((h) => h.trim()).filter(Boolean);
    const rows = lines.slice(1).map((row) =>
      row.split('|').map((cell) => cell.trim()).filter(Boolean)
    );

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="text-left p-3 bg-hlk-surface-warm font-semibold text-hlk-text border-b border-hlk-border">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="p-3 text-hlk-text-secondary border-b border-hlk-border-light">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 일반 단락
  return <BoldText text={trimmed} className="text-base text-hlk-text-secondary leading-relaxed" />;
}

// 볼드 텍스트 인라인 처리 (**text**)
function BoldText({ text, className = '' }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className={className}>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold text-hlk-text">
            {part.replace(/\*\*/g, '')}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}
