import { useState } from 'react';
import { History, Search, Eye, ChevronRight } from 'lucide-react';
import { INITIAL_SCREENING_HISTORY, DEMO_CASES } from '../data/demoCases';
import type { ScreeningResultState } from '../types/screening';

interface ScreeningHistoryProps {
  onSelectHistoricalRecord: (caseState: ScreeningResultState) => void;
}

export const ScreeningHistory: React.FC<ScreeningHistoryProps> = ({
  onSelectHistoricalRecord
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = INITIAL_SCREENING_HISTORY.filter(
    (item) =>
      item.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.aiResult.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search & Header Bar */}
      <div className="medico-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 medico-bg-gradient border-teal-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <History className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">
              Screening History Log
            </h2>
          </div>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Historical patient retinal screening records logged at PHC Rampur
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search Patient ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
          />
        </div>
      </div>

      {/* History Table / Card View */}
      <div className="medico-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Patient Details</th>
                <th className="py-3.5 px-4">Screening Date</th>
                <th className="py-3.5 px-4">Quality</th>
                <th className="py-3.5 px-4">AI Indicator</th>
                <th className="py-3.5 px-4">Referral Urgency</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
              {filteredHistory.map((item) => {
                // Map to corresponding demo case state if available
                const matchingCase = DEMO_CASES['CASE_1'] || DEMO_CASES['CASE_3'];
                return (
                  <tr
                    key={item.patientId}
                    className="hover:bg-emerald-50/40 transition-colors group cursor-pointer"
                    onClick={() => onSelectHistoricalRecord(matchingCase)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-extrabold text-slate-900">{item.patientId}</div>
                      <div className="text-[11px] text-slate-500 font-semibold">{item.patientName}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-semibold">{item.screeningDate}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[11px]">
                        {item.qualityStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                        <span>{item.symbol}</span>
                        <span>{item.aiResult}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-700">{item.referral}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectHistoricalRecord(matchingCase);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white group-hover:bg-emerald-600 group-hover:text-white border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs inline-flex items-center space-x-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-sky-600 group-hover:text-white" />
                        <span>View</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
