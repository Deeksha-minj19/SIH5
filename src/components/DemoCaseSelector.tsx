import { DEMO_CASES } from '../data/demoCases';
import type { ScreeningResultState } from '../types/screening';
import { SlidersHorizontal } from 'lucide-react';

interface DemoCaseSelectorProps {
  currentCaseId: string;
  onSelectCase: (caseState: ScreeningResultState) => void;
  triggerError: (errorType: string) => void;
}

export const DemoCaseSelector: React.FC<DemoCaseSelectorProps> = ({
  currentCaseId,
  onSelectCase,
  triggerError
}) => {
  const cases = Object.values(DEMO_CASES);

  return (
    <div className="medico-card p-4 space-y-3">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
            Integration Simulator — Select Case (1–6)
          </h2>
        </div>
        <span className="text-[10px] text-slate-500 font-medium">
          Simulate AI Screening Outputs & Referral Support Rationale
        </span>
      </div>

      {/* Case Pills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {cases.map((c) => {
          const isSelected = c.caseId === currentCaseId;
          return (
            <button
              key={c.caseId}
              onClick={() => onSelectCase(c)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between touch-target ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20 ring-2 ring-emerald-300'
                  : 'bg-slate-50 hover:bg-emerald-50/60 border-slate-200/90 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {c.caseId.replace('CASE_', 'Case ')}
                </span>
                <span className="text-base">{c.statusBadge.symbol}</span>
              </div>
              <div className="mt-1">
                <span className={`text-xs font-extrabold block leading-snug truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {c.caseTitle}
                </span>
                <span className={`text-[10px] font-medium block truncate mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {c.aiOutput.class}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Error State Simulator Bar */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Simulate Error & Edge Cases:
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => triggerError('AI_UNAVAILABLE')}
            className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold transition-all"
          >
            ⚠️ AI Unavailable
          </button>
          <button
            onClick={() => triggerError('RESULT_DATA_UNAVAILABLE')}
            className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-[11px] font-bold transition-all"
          >
            ❌ Data Missing
          </button>
          <button
            onClick={() => triggerError('NO_INTERNET')}
            className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-[11px] font-bold transition-all"
          >
            📡 No Connection
          </button>
        </div>
      </div>
    </div>
  );
};
