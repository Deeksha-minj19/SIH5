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
    <div className="medico-card p-6 sm:p-8 max-w-xl mx-auto space-y-5 border-amber-200 bg-amber-50/40 shadow-md animate-fadeIn">
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-2xl bg-amber-100 text-amber-800 shrink-0">
          <Icon className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200/80 text-amber-900">
              System Error Alert
            </span>
          </div>
          <h3 className="text-base font-black text-slate-900 leading-tight">
            {config.title}
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {config.desc}
          </p>
        </div>
      </div>

      {/* Recommended Action Guidelines for PHC Health Worker */}
      <div className="p-3.5 rounded-xl bg-white border border-amber-200/80 text-xs space-y-1.5">
        <div className="font-bold text-slate-900 flex items-center space-x-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>Health Worker Action Instructions:</span>
        </div>
        <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-1 pl-1">
          <li>Verify tablet network status or switch offline mode toggle.</li>
          <li>If AI remains unavailable, log patient for manual specialist referral.</li>
        </ul>
      </div>

      {/* Button Actions */}
      <div className="flex items-center justify-end space-x-3 pt-2">
        <button
          onClick={onClearError}
          className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-all"
        >
          Dismiss Alert
        </button>
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-xl medico-btn-primary text-xs font-black transition-all flex items-center space-x-1.5"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          <span>{config.action}</span>
        </button>
      </div>
    </div>
  );
};
