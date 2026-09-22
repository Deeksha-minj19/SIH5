import { AlertTriangle, WifiOff, ServerCrash, FileX, RefreshCcw, HelpCircle } from 'lucide-react';
import type { ErrorType } from '../types/screening';

interface ErrorStateCardProps {
  errorType: ErrorType;
  onRetry: () => void;
  onClearError: () => void;
}

export const ErrorStateCard: React.FC<ErrorStateCardProps> = ({
  errorType,
  onRetry,
  onClearError
}) => {
  const errorConfigs: Record<
    ErrorType,
    { title: string; desc: string; icon: typeof AlertTriangle; action: string }
  > = {
    NONE: {
      title: 'No Errors Detected',
      desc: 'System operating normally.',
      icon: AlertTriangle,
      action: 'Dismiss'
    },
    AI_UNAVAILABLE: {
      title: 'Member 4 AI Screening Module Offline',
      desc: 'The machine learning inference server could not be reached. Ensure PHC connectivity or fallback to manual ophthalmologist referral queue.',
      icon: ServerCrash,
      action: 'Retry AI Connection'
    },
    UNABLE_TO_LOAD_RESULT: {
      title: 'Unable to Render Screening Result',
      desc: 'Failed to process AI output stream into Member 5 screening cards.',
      icon: FileX,
      action: 'Reload Result State'
    },
    RESULT_DATA_UNAVAILABLE: {
      title: 'Retinal Image Data Contract Missing',
      desc: 'Member 3 quality payload or retinal fundus image binary URL was not received.',
      icon: AlertTriangle,
      action: 'Re-sync Image Data'
    },
    REPORT_GEN_FAILED: {
      title: 'Report Payload Generation Failed',
      desc: 'Unable to assemble Member 6 JSON payload due to missing patient metadata.',
      icon: FileX,
      action: 'Re-assemble Contract'
    },
    NO_INTERNET: {
      title: 'PHC Connectivity Offline (Queued Locally)',
      desc: 'Screening result stored in offline IndexedDB cache. Synchronizes automatically when network connection restores.',
      icon: WifiOff,
      action: 'Check Network Sync'
    }
  };

  const config = errorConfigs[errorType] || errorConfigs['AI_UNAVAILABLE'];
  const Icon = config.icon;

  return (
    <div className="medico-card p-8 max-w-2xl mx-auto space-y-6 border-t-4 border-[#F59E0B] bg-[#FFF6E5]/30 animate-fadeIn my-12">
      <div className="flex items-start gap-5">
        <div className="p-4 rounded-2xl bg-[#FFF6E5] text-[#F59E0B] shrink-0 border border-[#F59E0B]/20">
          <Icon className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#F59E0B]/10 text-[#D97706]">
            System Alert
          </span>
          <h3 className="text-xl font-bold text-[#1E293B]">
            {config.title}
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed">
            {config.desc}
          </p>
        </div>
      </div>

      {/* Recommended Action Guidelines */}
      <div className="p-4 rounded-xl bg-white border border-gray-100 text-sm space-y-2">
        <div className="font-bold text-[#1E293B] flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-[#F59E0B]" />
          <span>Health Worker Instructions:</span>
        </div>
        <ul className="list-disc list-inside text-[#64748B] space-y-1.5 pl-2">
          <li>Verify tablet network status or switch offline mode toggle.</li>
          <li>If AI remains unavailable, log patient for manual specialist referral.</li>
        </ul>
      </div>

      {/* Button Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={onClearError}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-[#1E293B] text-sm font-bold border border-gray-200 transition-all"
        >
          Dismiss Alert
        </button>
        <button
          onClick={onRetry}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-bold transition-all flex items-center justify-center space-x-2 shadow-sm"
        >
          <RefreshCcw className="w-4 h-4" />
          <span>{config.action}</span>
        </button>
      </div>
    </div>
  );
};
