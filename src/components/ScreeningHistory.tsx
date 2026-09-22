import { useState } from 'react';
import { History, Search, ArrowRight, Activity, Calendar } from 'lucide-react';
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
    <div className="space-y-8 animate-fadeIn py-8">
      {/* Medico+ Style Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[#34A853] font-bold mb-3">
            <History className="w-5 h-5" />
            <span className="uppercase tracking-wider text-sm">Patient Archive</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E293B]">
            Historical Screening Records
          </h2>
        </div>

        {/* Search Input styled like the Medico+ form inputs */}
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Patient ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-[#1E293B] focus:outline-none focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Grid View (Mimicking the "Our Services" Medico+ Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHistory.map((item) => {
          const matchingCase = DEMO_CASES['CASE_1'] || DEMO_CASES['CASE_3'];
          
          return (
            <div
              key={item.patientId}
              onClick={() => onSelectHistoricalRecord(matchingCase)}
              className="group bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer hover:border-[#34A853] hover:shadow-[0_20px_40px_-15px_rgba(52,168,83,0.15)] transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative top border color based on status */}
              <div className={`absolute top-0 left-0 w-full h-1 ${
                item.aiResult.includes('Referable') ? 'bg-[#F59E0B]' : 'bg-[#34A853]'
              }`} />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1E293B] group-hover:text-[#34A853] transition-colors">
                    {item.patientName}
                  </h3>
                  <p className="text-sm text-[#64748B] font-mono mt-1">ID: {item.patientId}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#F8FAF9] flex items-center justify-center text-2xl group-hover:bg-[#E6F5F2] transition-colors">
                  {item.symbol}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-[#64748B]">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{item.screeningDate}</span>
                </div>
                <div className="flex items-center text-sm text-[#64748B]">
                  <Activity className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="font-semibold text-[#1E293B]">{item.aiResult}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs font-bold px-3 py-1 rounded bg-gray-100 text-gray-600">
                  {item.referral}
                </span>
                
                <div className="flex items-center text-[#34A853] text-sm font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  View Details <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
