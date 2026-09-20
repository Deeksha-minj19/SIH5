import type { ScreeningResultState } from '../types/screening';
import {
  Eye,
  User,
  ShieldAlert,
  FileText,
  RefreshCw,
  ChevronRight,
  Info,
  Sparkles,
  Activity
} from 'lucide-react';

interface ScreeningResultScreenProps {
  resultState: ScreeningResultState;
  onOpenImageModal: () => void;
  onGenerateReport: () => void;
  onStartNewScreening: () => void;
  onOpenContractsModal: () => void;
}

export const ScreeningResultScreen: React.FC<ScreeningResultScreenProps> = ({
  resultState,
  onOpenImageModal,
  onGenerateReport,
  onStartNewScreening,
  onOpenContractsModal
}) => {
  const { patient, retinalImage, quality, aiOutput, statusBadge, referral, screeningDate } =
    resultState;

  return (
    <div className="space-y-6 pb-8 animate-fadeIn">
      {/* Page Title & Subtitle Banner (Medico+ Clean Header Card) */}
      <div className="medico-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 medico-bg-gradient border-teal-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Screening Result
            </h1>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Member 5 Deliverable
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Human-readable AI screening output & clinical referral guidance for PHC health worker
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onStartNewScreening}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all border border-slate-200 shadow-2xs flex items-center space-x-1.5 touch-target"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
            <span>Start New Screening</span>
          </button>
        </div>
      </div>

      {/* Grid Layout for Result Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Main Diagnostic Cards */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Patient Demographics Section (Medico+ White Card) */}
          <div className="medico-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-100">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Patient Profile
                  </span>
                  <h2 className="text-lg font-black text-slate-900 font-mono tracking-tight">
                    {patient.patientId} — {patient.fullName}
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200">
                OD/OS Active
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-500 font-medium block">Age / Gender</span>
                <span className="font-extrabold text-slate-900">
                  {patient.age} Yrs • {patient.gender}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-500 font-medium block">Diabetes Duration</span>
                <span className="font-extrabold text-slate-900">
                  {patient.diabetesDurationYears} Years History
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-500 font-medium block">PHC Centre</span>
                <span className="font-extrabold text-slate-900 truncate block">
                  {patient.phcLocation.split(',')[0]}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-500 font-medium block">Screening Date</span>
                <span className="font-extrabold text-slate-900">
                  {screeningDate}
                </span>
              </div>
            </div>
          </div>

          {/* 2 & 3. Retinal Image & Quality Status Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Retinal Image Card */}
            <div className="medico-card p-5 space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-sky-600" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Retinal Image
                  </h3>
                </div>
                <span className="text-[11px] text-slate-500 font-semibold">{retinalImage.eye}</span>
              </div>

              {/* Thumbnail Container */}
              <div className="relative group rounded-xl overflow-hidden bg-slate-950 p-2 flex items-center justify-center border border-slate-200 aspect-video shadow-inner">
                <img
                  src={retinalImage.url}
                  alt={`Retinal image for ${patient.patientId}`}
                  className="h-full object-contain rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={onOpenImageModal}
                  className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold text-xs transition-opacity space-x-1.5"
                >
                  <Eye className="w-4 h-4 text-sky-300" />
                  <span>View Retinal Image</span>
                </button>
              </div>

              <button
                onClick={onOpenImageModal}
                className="w-full py-2.5 px-3 rounded-xl medico-btn-secondary text-xs transition-all flex items-center justify-center space-x-2 touch-target"
              >
                <Eye className="w-4 h-4" />
                <span>View Retinal Image</span>
              </button>
            </div>

            {/* Image Quality Status Card (Member 3 Input) */}
            <div className="medico-card p-5 space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Image Quality (Member 3)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">
                  Member 3 Contract
                </span>
              </div>

              <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">
                    {quality.status === 'SUITABLE' ? '🟢' : '⚠️'}
                  </span>
                  <div>
                    <span className="text-sm font-black text-slate-900 block">
                      {quality.label}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      Quality Score: {quality.score}/100
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 font-medium leading-normal">
                  {quality.clarity}
                </p>

                {quality.issues && (
                  <div className="pt-2 border-t border-slate-200 text-[10px] text-amber-700 font-bold">
                    <strong>Flags:</strong> {quality.issues.join(', ')}
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-500 flex items-center justify-between font-medium">
                <span>Validation: Member 3 Pipeline</span>
                <span className="font-bold text-emerald-700">Verified ✓</span>
              </div>
            </div>
          </div>

          {/* 4 & 5. AI Screening Result & Confidence Card (Member 4 Input) */}
          <div className="medico-card p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Member 4 Output Ingestion
                </span>
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <span>AI Screening Result</span>
                  <span className="text-[10px] font-normal text-slate-500">
                    ({aiOutput.modelVersion})
                  </span>
                </h3>
              </div>

              {/* Confidence Badge */}
              <div className="flex items-center space-x-2">
                {aiOutput.confidence !== null && aiOutput.isCalibrated ? (
                  <div className="px-3.5 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 text-xs font-extrabold flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>Calibrated Confidence: {Math.round(aiOutput.confidence * 100)}%</span>
                  </div>
                ) : (
                  <div className="px-3.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                    <span>Confidence: N/A (Screening Support Only)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Visually Prominent Non-Diagnostic Classification Banner */}
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs ${statusBadge.colorClass}`}>
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{statusBadge.symbol}</span>
                <div>
                  <h4 className="text-lg font-black tracking-tight">{statusBadge.title}</h4>
                  <p className="text-xs opacity-90 leading-normal font-medium">{statusBadge.description}</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/80 border border-current shrink-0 self-start sm:self-auto shadow-2xs">
                Screening Indicator
              </span>
            </div>

            <p className="text-[11px] text-slate-500 italic font-medium">
              * Note: Screening support system — not a medical diagnosis. High confidence values reflect ML model calibration bounds, not definitive clinical diagnostic certainty.
            </p>
          </div>

          {/* 5. Referral Recommendation Card (Medico+ Clinical Soft Styling) */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 border-2 border-teal-500/40 text-white rounded-2xl p-5 sm:p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-400/30">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Action Plan & Recommendation
                  </span>
                  <h2 className="text-lg font-black text-white">
                    Referral Recommendation
                  </h2>
                </div>
              </div>

              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                {referral.level}
              </span>
            </div>

            {/* Recommendation Title */}
            <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-2xl">{statusBadge.symbol}</span>
              <span className="text-base font-black text-white">
                {referral.actionText}
              </span>
            </div>

            {/* "Why?" Rationale Section */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Why?</span>
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {referral.whyRationale}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
              <span>Suggested Follow-up Window:</span>
              <strong className="text-emerald-300 font-extrabold">{referral.suggestedTimeframe}</strong>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Screening Summary & Primary Action Buttons */}
        <div className="space-y-6">
          
          {/* 6. Screening Summary Card (Medico+ White Card) */}
          <div className="medico-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Screening Summary
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                PHC Log
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium">Screening Date:</span>
                <span className="font-extrabold text-slate-900">{screeningDate}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium">Patient ID:</span>
                <span className="font-mono font-extrabold text-slate-900">{patient.patientId}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium">Image Quality:</span>
                <span className="font-extrabold text-slate-900">{quality.label}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium">AI Result:</span>
                <span className="font-extrabold text-slate-900">{aiOutput.class}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium">Referral Status:</span>
                <span className="font-extrabold text-slate-900">{referral.title}</span>
              </div>
            </div>
          </div>

          {/* 7. Action Buttons (Medico+ Fresh Green Primary) */}
          <div className="medico-card p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Module Action Controls
            </h3>

            {/* Primary Action Button: Fresh Green Generate Report */}
            <button
              onClick={onGenerateReport}
              className="w-full py-3.5 px-4 rounded-xl medico-btn-primary text-sm font-extrabold flex items-center justify-center space-x-2 touch-target"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Report (Member 6)</span>
              <ChevronRight className="w-4 h-4 opacity-75" />
            </button>

            {/* Secondary Action: View Retinal Image */}
            <button
              onClick={onOpenImageModal}
              className="w-full py-3 px-4 rounded-xl medico-btn-secondary text-xs font-extrabold flex items-center justify-center space-x-2 touch-target"
            >
              <Eye className="w-4 h-4" />
              <span>View Retinal Image</span>
            </button>

            {/* Tertiary Action: Start New Screening */}
            <button
              onClick={onStartNewScreening}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center space-x-2 border border-slate-200 touch-target"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
              <span>Start New Screening</span>
            </button>

            {/* Developer Integration inspector button */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={onOpenContractsModal}
                className="w-full text-center text-[11px] text-teal-700 hover:text-teal-900 hover:underline font-bold"
              >
                Inspect M4 Input & M6 Output JSON Payloads
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
