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
  Code,
  CheckCircle2,
  AlertCircle
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
    <div className="space-y-8 pb-12 animate-fadeIn medico-section-light p-6 sm:p-10 rounded-[2rem]">
      
      {/* Medico+ Section Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-[#1E293B]">Patient Screening Result</h2>
          <p className="text-[#64748B] mt-1">Review the AI analysis and clinical referral guidance</p>
        </div>
        <button
          onClick={onStartNewScreening}
          className="px-5 py-2.5 rounded-lg bg-white text-[#1E293B] border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all font-semibold flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4 text-[#34A853]" />
          <span>New Screening</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Patient & Image Data - equivalent to the "Doctor Image" side) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Patient Profile Card */}
          <div className="medico-card p-6 border-t-4 border-t-[#0A58CA]">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-[#E2F1FF] flex items-center justify-center text-[#0A58CA]">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E293B]">{patient.fullName}</h3>
                <p className="text-[#64748B] text-sm">ID: {patient.patientId}</p>
              </div>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-[#64748B]">Age / Gender</span>
                <span className="font-semibold text-[#1E293B]">{patient.age} Yrs • {patient.gender}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-[#64748B]">Diabetes History</span>
                <span className="font-semibold text-[#1E293B]">{patient.diabetesDurationYears} Years</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-[#64748B]">Date</span>
                <span className="font-semibold text-[#1E293B]">{screeningDate}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[#64748B]">Clinic</span>
                <span className="font-semibold text-[#1E293B]">{patient.phcLocation.split(',')[0]}</span>
              </div>
            </div>
          </div>

          {/* Retinal Image & Quality */}
          <div className="medico-card p-6">
            <h4 className="font-bold text-[#1E293B] mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#34A853]" />
              Retinal Scan ({retinalImage.eye})
            </h4>
            
            <div className="relative group rounded-xl overflow-hidden bg-black flex items-center justify-center aspect-video mb-4 cursor-pointer" onClick={onOpenImageModal}>
              <img
                src={retinalImage.url}
                alt="Retinal Scan"
                className="h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="bg-white text-[#1E293B] px-4 py-2 rounded-lg font-semibold text-sm">View Full Screen</span>
              </div>
            </div>

            <div className="bg-[#F8FAF9] rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#64748B]">Quality Assessment</span>
                {quality.status === 'SUITABLE' ? (
                  <span className="flex items-center text-xs font-bold text-[#34A853] bg-[#E6F5F2] px-2 py-1 rounded">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Suitable
                  </span>
                ) : (
                  <span className="flex items-center text-xs font-bold text-[#F59E0B] bg-[#FFF6E5] px-2 py-1 rounded">
                    <AlertCircle className="w-3 h-3 mr-1" /> {quality.label}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#64748B]">{quality.clarity}</p>
            </div>
          </div>
        </div>

        {/* Right Column (AI Results & Actions - equivalent to the "Booking Form" side) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* AI Screening Result Card */}
          <div className="medico-card p-8 border-t-4 border-t-[#34A853]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#1E293B]">AI Diagnostic Support</h3>
                <p className="text-[#64748B] text-sm mt-1">Model Version: {aiOutput.modelVersion}</p>
              </div>
              
              {aiOutput.confidence !== null && aiOutput.isCalibrated && (
                <div className="bg-[#E6F5F2] text-[#34A853] px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  {Math.round(aiOutput.confidence * 100)}% Confidence
                </div>
              )}
            </div>

            <div className={`p-5 rounded-2xl border flex items-start gap-4 mb-6 ${
              aiOutput.class.includes('Referable') ? 'bg-[#FFF5F5] border-[#FCA5A5]' : 'bg-[#F0FDF4] border-[#86EFAC]'
            }`}>
              <div className="text-4xl mt-1">{statusBadge.symbol}</div>
              <div>
                <h4 className="text-xl font-extrabold text-[#1E293B]">{statusBadge.title}</h4>
                <p className="text-[#64748B] mt-1">{statusBadge.description}</p>
              </div>
            </div>

            {/* Referral Recommendation */}
            <div className="bg-[#1E293B] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldAlert className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-[#34A853] text-white text-xs font-bold px-2 py-1 rounded">Recommendation</span>
                  <span className="text-gray-400 text-sm">{referral.level}</span>
                </div>
                
                <h4 className="text-2xl font-bold mb-4 text-white">
                  {referral.actionText}
                </h4>
                
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <h5 className="flex items-center gap-2 text-[#34A853] font-bold text-sm mb-2">
                    <Info className="w-4 h-4" /> Clinical Rationale
                  </h5>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {referral.whyRationale}
                  </p>
                </div>
                
                <div className="mt-4 flex justify-between items-center text-sm">
                  <span className="text-gray-400">Follow-up Timeframe:</span>
                  <span className="font-bold text-[#34A853]">{referral.suggestedTimeframe}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={onGenerateReport}
              className="medico-btn-primary py-4 px-6 rounded-xl flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span className="text-lg">Generate Report</span>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={onOpenContractsModal}
              className="medico-btn-secondary py-4 px-6 rounded-xl flex items-center justify-center gap-2"
            >
              <Code className="w-5 h-5" />
              <span>Inspect JSON Payload</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
