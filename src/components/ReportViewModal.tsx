import { X, Printer, ShieldCheck } from 'lucide-react';
import type { Member6OutputPayload } from '../types/screening';

interface ReportViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  outputPayload: Member6OutputPayload;
}

export const ReportViewModal: React.FC<ReportViewModalProps> = ({
  isOpen,
  onClose,
  outputPayload
}) => {
  if (!isOpen) return null;

  const { patientData, aiResult, referralRecommendation, disclaimerNotice } = outputPayload;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 medico-bg-gradient">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold">
              Member 6
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Member 6 Hand-Off — Retinal Screening Report Preview
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Structured contract payload passed to Member 6 for report generation & printing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Report Document Body */}
        <div className="flex-1 overflow-auto p-6 sm:p-8 space-y-6 bg-white text-slate-900 font-sans" id="printable-report">
          {/* Document Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black text-slate-900 tracking-tight">RETINA<span className="text-emerald-600">-MITRA</span></span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-100 text-sky-800">
                  PHC Screening Record
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Primary Health Centre Retinal Screening & Referral Report</p>
            </div>
            <div className="text-right text-xs">
              <span className="text-slate-500 block">Report Date:</span>
              <strong className="text-slate-900 font-extrabold">{new Date().toLocaleDateString()}</strong>
            </div>
          </div>

          {/* Patient Details Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
              1. Patient Demographics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px]">Patient ID</span>
                <strong className="font-mono text-slate-900 text-sm">{patientData.patientId}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Full Name</span>
                <strong className="text-slate-900">{patientData.fullName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Age / Gender</span>
                <strong className="text-slate-900">{patientData.age} Yrs / {patientData.gender}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Diabetes Duration</span>
                <strong className="text-slate-900">{patientData.diabetesDurationYears} Years</strong>
              </div>
            </div>
          </div>

          {/* AI Result & Referral Recommendation */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
              2. Screening Output & Referral Support (Member 5)
            </h3>
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700">AI Screening Result:</span>
                <span className="text-sm font-black text-slate-900">{aiResult.class}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700">Referral Action:</span>
                <span className="text-sm font-black text-emerald-800">{referralRecommendation.actionText}</span>
              </div>
              <div className="pt-2 border-t border-emerald-200/80 text-xs text-slate-700">
                <strong>Clinical Rationale:</strong> {referralRecommendation.whyRationale}
              </div>
            </div>
          </div>

          {/* Disclaimer & Health Worker Sign-off */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Medical System Disclaimer</span>
            </div>
            <p className="text-[11px] text-slate-600 italic">
              {disclaimerNotice}
            </p>
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[11px]">
              <div>
                <span className="text-slate-500 block">Health Worker Sign-off:</span>
                <span className="font-bold text-slate-900">{patientData.healthWorkerName} ({patientData.healthWorkerId})</span>
              </div>
              <span className="font-mono text-slate-400">PHC Rampur Operational Unit</span>
            </div>
          </div>
        </div>

        {/* Modal Controls */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-all"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl medico-btn-primary text-xs font-black transition-all flex items-center space-x-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report (Member 6 Format)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
