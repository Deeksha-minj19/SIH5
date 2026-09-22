import { DEMO_CASES } from '../data/demoCases';
import type { ScreeningResultState } from '../types/screening';
import { ChevronRight, Settings } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Floating Case Cards Grid */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 pb-6 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
        {cases.map((c, index) => {
          const isSelected = c.caseId === currentCaseId;
          
          // Medico+ Pastel Colors for the floating cards
          const colors = [
            'bg-[#FFF6E5] text-[#F59E0B]', // Soft Yellow/Orange
            'bg-[#E6F5F2] text-[#34A853]', // Soft Green
            'bg-[#E2F1FF] text-[#0A58CA]', // Soft Blue
            'bg-[#F3E8FF] text-[#9333EA]', // Soft Purple
            'bg-[#FFE4E6] text-[#E11D48]', // Soft Rose
            'bg-[#E0F2FE] text-[#0284C7]'  // Soft Sky
          ];
          const colorClass = colors[index % colors.length];

          return (
            <button
              key={c.caseId}
              onClick={() => onSelectCase(c)}
              className={`min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center relative group flex flex-col items-start p-5 rounded-[2rem] text-left transition-all duration-300 ${
                isSelected
                  ? 'bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] scale-105 z-10 ring-2 ring-[#34A853] ring-offset-4 ring-offset-transparent'
                  : 'bg-white/80 hover:bg-white shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1 backdrop-blur-md border border-white/50'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-3 ${colorClass}`}>
                {c.statusBadge.symbol}
              </div>
              
              <h3 className="text-xl font-extrabold text-[#1E293B] mb-1">
                {c.caseId.replace('CASE_', 'Case ')}
              </h3>
              <p className="text-sm font-medium text-[#64748B] leading-snug line-clamp-2">
                {c.caseTitle}
              </p>
              
              <div className={`mt-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isSelected ? 'bg-[#34A853] text-white' : 'bg-[#F1F5F9] text-[#94A3B8] group-hover:bg-[#E6F5F2] group-hover:text-[#34A853]'
              }`}>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Error Simulator Pills */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
        <div className="flex items-center space-x-2 text-[#64748B] mr-2">
          <Settings className="w-4 h-4" />
          <span className="text-sm font-semibold">Simulate Scenarios:</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => triggerError('AI_UNAVAILABLE')}
            className="px-4 py-2 rounded-full bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#F59E0B] hover:text-[#F59E0B] text-sm font-semibold transition-colors shadow-sm"
          >
            AI Unavailable
          </button>
          <button
            onClick={() => triggerError('RESULT_DATA_UNAVAILABLE')}
            className="px-4 py-2 rounded-full bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#E11D48] hover:text-[#E11D48] text-sm font-semibold transition-colors shadow-sm"
          >
            Data Missing
          </button>
          <button
            onClick={() => triggerError('NO_INTERNET')}
            className="px-4 py-2 rounded-full bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#0284C7] hover:text-[#0284C7] text-sm font-semibold transition-colors shadow-sm"
          >
            No Connection
          </button>
        </div>
      </div>
    </div>
  );
};
