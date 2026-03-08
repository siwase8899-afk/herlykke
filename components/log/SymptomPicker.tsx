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
      onAdd(symptomId, 3);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-hlk-text mb-3 text-center">
        어젯밤 수면을 방해한 증상이 있나요?
      </h2>
      <p className="text-hlk-text-secondary mb-8 text-center">
        잠들기 어렵게 하거나, 잠에서 깨게 한 증상을 선택해주세요
      </p>

      {/* 증상 그리드 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
        {SYMPTOMS.map((symptom) => {
          const sel = isSelected(symptom.id);
          return (
            <button
              key={symptom.id}
              onClick={() => handleToggle(symptom.id)}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                sel
                  ? 'bg-hlk-primary text-white border-2 border-hlk-primary shadow-md'
                  : 'bg-white border-2 border-hlk-border hover:border-hlk-primary/50'
              }`}
            >
              <span
                className={`text-sm font-bold text-center ${
                  sel ? 'text-white' : 'text-hlk-text'
                }`}
              >
                {symptom.name}
              </span>
              {sel && (
                <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* 선택된 증상 강도 조절 */}
      {selected.length > 0 && (
        <div className="bg-hlk-bg rounded-2xl p-5 border border-hlk-border">
          <p className="text-sm font-semibold text-hlk-text mb-4">
            수면에 미친 영향을 조절해주세요
          </p>
          <div className="space-y-4">
            {selected.map((entry) => {
              const symptom = SYMPTOMS.find((s) => s.id === entry.symptomId);
              if (!symptom) return null;

              return (
                <div key={entry.symptomId} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-28">
                    <span className="text-sm font-medium text-hlk-text">
                      {symptom.name}
                    </span>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-hlk-text-tertiary">약함</span>
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
                              : 'bg-hlk-border'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-hlk-text-tertiary">심함</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 증상 없음 옵션 */}
      {selected.length === 0 && (
        <p className="text-center text-sm text-hlk-text-tertiary">
          수면을 방해한 증상이 없다면 다음으로 넘어가세요
        </p>
      )}
    </div>
  );
}
