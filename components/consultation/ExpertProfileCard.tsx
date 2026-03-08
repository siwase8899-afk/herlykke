'use client';

export interface Expert {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  photoUrl: string;
  available: boolean;
}

interface ExpertProfileCardProps {
  expert: Expert;
  selected?: boolean;
  onSelect?: (expert: Expert) => void;
}

export default function ExpertProfileCard({ expert, selected, onSelect }: ExpertProfileCardProps) {
  return (
    <button
      onClick={() => onSelect?.(expert)}
      className={`w-full text-left bg-hlk-surface rounded-2xl p-5 border card-healthcare ${
        selected
          ? 'border-hlk-primary ring-2 ring-hlk-primary/20 scale-[1.02]'
          : 'border-hlk-border scale-100'
      }`}
      style={{ transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)' }}
    >
      <div className="flex items-start gap-4">
        {/* Photo */}
        <div className="w-14 h-14 rounded-full bg-hlk-primary-light flex items-center justify-center flex-shrink-0 overflow-hidden">
          {expert.photoUrl ? (
            <img src={expert.photoUrl} alt={expert.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl">👩‍⚕️</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-hlk-text">{expert.name}</h3>
            {expert.available && (
              <span className="w-2 h-2 rounded-full bg-hlk-success flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-hlk-primary font-medium mb-1">{expert.specialty}</p>
          <p className="text-xs text-hlk-text-tertiary mb-2">{expert.experience}</p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(expert.rating) ? 'text-hlk-warning' : 'text-hlk-border'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-hlk-text-secondary ml-1">{expert.rating}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
