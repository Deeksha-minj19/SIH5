import { Eye, Wifi, WifiOff, User, History, Code, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'RESULT' | 'HISTORY' | 'CONTRACTS';
  setActiveTab: (tab: 'RESULT' | 'HISTORY' | 'CONTRACTS') => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  onResetWorkflow: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isOffline,
  setIsOffline,
  onResetWorkflow
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Medico+ Inspired Logo & App Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20 ring-4 ring-emerald-100">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-black tracking-tight text-slate-900">
                  RETINA<span className="text-emerald-600">-MITRA</span>
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Member 5 Module
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Retinal Screening & Referral Support System • PHC Tier
              </p>
            </div>
          </div>

          {/* User Profile & Offline Sync Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
            {/* Health Worker Profile */}
            <div className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                <User className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block leading-tight">Anita Swamy (ANM)</span>
                <span className="text-slate-500 text-[10px]">PHC Rampur (HW-4092)</span>
              </div>
            </div>

            {/* Offline / Online Sync Toggle */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isOffline
                  ? 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 shadow-2xs'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 shadow-2xs'
              }`}
              title="Toggle network connectivity for offline demo"
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                  <span>Offline Mode</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sync Ready</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* RETINA-MITRA End-to-End Workflow Stepper (Medico+ Soft Style) */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-1.5 text-[11px] font-medium min-w-max text-slate-500">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-semibold">1. Registration</span>
            <span className="text-slate-300">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-semibold">2. Image Capture</span>
            <span className="text-slate-300">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-semibold">3. Quality Check</span>
            <span className="text-slate-300">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-semibold">4. AI Screening</span>
            <span className="text-slate-300">→</span>
            <span className="px-3 py-1 rounded-lg bg-emerald-500 text-white font-bold shadow-xs flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-white" />
              <span>5. Result & Referral (Member 5)</span>
            </span>
            <span className="text-slate-300">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-semibold">6. Report (Member 6)</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-2">
          <nav className="flex space-x-2">
            <button
              onClick={() => setActiveTab('RESULT')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-2 transition-all ${
                activeTab === 'RESULT'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/80'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Screening Result</span>
            </button>

            <button
              onClick={() => setActiveTab('HISTORY')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-2 transition-all ${
                activeTab === 'HISTORY'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/80'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Screening History</span>
            </button>

            <button
              onClick={() => setActiveTab('CONTRACTS')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-2 transition-all ${
                activeTab === 'CONTRACTS'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/80'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Data Contracts (M4 / M6)</span>
            </button>
          </nav>

          <button
            onClick={onResetWorkflow}
            className="text-[11px] font-bold text-sky-700 hover:text-sky-900 underline decoration-sky-300"
          >
            Re-run Loading Flow
          </button>
        </div>
      </div>
    </header>
  );
};
