import { Plus, Wifi, WifiOff } from 'lucide-react';

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
    <header className="w-full bg-white relative z-50 py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            RETINA<span className="text-[#34A853]">-MITRA</span>
          </h1>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => setActiveTab('RESULT')}
            className={`text-sm font-semibold transition-colors flex items-center space-x-1 ${
              activeTab === 'RESULT' ? 'text-[#34A853]' : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <span>Home (Result)</span>
          </button>
          
          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`text-sm font-semibold transition-colors flex items-center space-x-1 ${
              activeTab === 'HISTORY' ? 'text-[#34A853]' : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <span>History</span>
          </button>
          
          <button
            onClick={() => setActiveTab('CONTRACTS')}
            className={`text-sm font-semibold transition-colors flex items-center space-x-1 ${
              activeTab === 'CONTRACTS' ? 'text-[#34A853]' : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <span>Data Contracts</span>
          </button>
          
          <button
            onClick={() => setIsOffline(!isOffline)}
            className="text-sm font-semibold text-[#64748B] hover:text-[#1E293B] transition-colors flex items-center space-x-1.5"
            title="Toggle network connectivity"
          >
            {isOffline ? <WifiOff className="w-4 h-4 text-red-500" /> : <Wifi className="w-4 h-4" />}
            <span>{isOffline ? 'Offline' : 'Online'}</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onResetWorkflow}
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-[#34A853] hover:bg-[#298d43] rounded-lg transition-all shadow-[0_4px_14px_0_rgba(52,168,83,0.2)] hover:shadow-[0_6px_20px_0_rgba(52,168,83,0.3)] hover:-translate-y-0.5"
          >
            Start Screening
          </button>

        </div>

      </div>
    </header>
  );
};
