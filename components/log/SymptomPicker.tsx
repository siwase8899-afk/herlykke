'use client';

import { SYMPTOMS, SymptomEntry } from '@/lib/logTypes';

interface SymptomPickerProps {
  selected: SymptomEntry[];
  onAdd: (symptomId: string, severity: 1 | 2 | 3 | 4 | 5) => void;
  onRemove: (symptomId: string) => void;
  onUpdateSeverity: (symptomId: string, severity: 1 | 2 | 3 | 4 | 5) => void;
}

export function SymptomPicker({
  selected,
  onAdd,
  onRemove,
  onUpdateSeverity,
}: SymptomPickerProps) {
  const isSelected = (id: string) => selected.some((s) => s.symptomId === id);
  const getSeverity = (id: string) =>
    selected.find((s) => s.symptomId === id)?.severity || 3;

  const handleToggle = (symptomId: string) => {
    if (isSelected(symptomId)) {
      onRemove(symptomId);
    } else {
      onAdd(symptomId, 3); // 기본 강도 3
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-alma-text mb-3 text-center">
        오늘 겪은 증상이 있나요?
      </h2>
      <p className="text-alma-text-secondary mb-8 text-center">
        해당되는 증상을 모두 선택해주세요
      </p>

      {/* 증상 그리드 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
        {SYMPTOMS.map((symptom) => {
          const selected = isSelected(symptom.id);
          return (
            <button
              key={symptom.id}
              onClick={() => handleToggle(symptom.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                selected
                  ? 'bg-alma-primary-light border-2 border-alma-primary'
                  : 'bg-white border-2 border-alma-border hover:border-alma-primary/50'
              }`}
            >
              <span className="text-3xl">{symptom.emoji}</span>
              <span
                className={`text-xs font-medium text-center ${
                  selected ? 'text-alma-primary' : 'text-alma-text-secondary'
                }`}
              >
                {symptom.name}
              </span>
              {selected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-alma-primary rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 선택된 증상 강도 조절 */}
      {selected.length > 0 && (
        <div className="bg-alma-bg rounded-2xl p-5 border border-alma-border">
          <p className="text-sm font-semibold text-alma-text mb-4">
            증상 강도를 조절해주세요
          </p>
          <div className="space-y-4">
            {selected.map((entry) => {
              const symptom = SYMPTOMS.find((s) => s.id === entry.symptomId);
              if (!symptom) return null;

              return (
                <div key={entry.symptomId} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-28">
                    <span className="text-xl">{symptom.emoji}</span>
                    <span className="text-sm font-medium text-alma-text">
                      {symptom.name}
                    </span>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-alma-text-tertiary">약함</span>
                    <div className="flex-1 flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          onClick={() =>
                            onUpdateSeverity(entry.symptomId, level as 1 | 2 | 3 | 4 | 5)
                          }
                          className={`flex-1 h-3 rounded-full transition-all ${
                            level <= entry.severity
                              ? level <= 2
                                ? 'bg-green-400'
                                : level <= 3
                                ? 'bg-yellow-400'
                                : 'bg-red-400'
                              : 'bg-alma-border'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-alma-text-tertiary">심함</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 증상 없음 옵션 */}
      {selected.length === 0 && (
        <p className="text-center text-sm text-alma-text-tertiary">
          증상이 없다면 다음으로 넘어가도 괜찮아요 👍
        </p>
      )}
    </div>
  );
}
