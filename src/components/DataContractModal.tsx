import { useState } from 'react';
import { X, Code, ArrowRight, Copy, Check } from 'lucide-react';
import type { ScreeningResultState, Member6OutputPayload } from '../types/screening';

interface DataContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultState: ScreeningResultState;
  outputPayload: Member6OutputPayload;
}

export const DataContractModal: React.FC<DataContractModalProps> = ({
  isOpen,
  onClose,
  resultState,
  outputPayload
}) => {
  const [activeTab, setActiveTab] = useState<'M4_INPUT' | 'M6_OUTPUT'>('M4_INPUT');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const activeJson =
    activeTab === 'M4_INPUT'
      ? JSON.stringify(resultState.aiOutput, null, 2)
      : JSON.stringify(outputPayload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 medico-bg-gradient">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-800 font-bold">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Pipeline Integration Data Contracts
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Verify input schemas from Member 4 (AI/ML) & export payload to Member 6 (Report)
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

        {/* Tab Switcher */}
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('M4_INPUT')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'M4_INPUT'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Member 4 Ingestion Payload (Input)
            </button>
            <button
              onClick={() => setActiveTab('M6_OUTPUT')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'M6_OUTPUT'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Member 6 Hand-Off Payload (Output)
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center space-x-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy JSON</span>
              </>
            )}
          </button>
        </div>

        {/* JSON Viewer Canvas */}
        <div className="flex-1 bg-slate-950 p-6 overflow-auto font-mono text-xs text-emerald-400 max-h-[50vh]">
          <pre>{activeJson}</pre>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-600 font-medium">
            <ArrowRight className="w-4 h-4 text-emerald-600" />
            <span>Format: Standard RETINA-MITRA TypeScript Interface Payload</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-all"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
