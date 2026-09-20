import { Info } from 'lucide-react';

export const MedicalDisclaimer: React.FC = () => {
  return (
    <div className="bg-sky-50/80 border-l-4 border-sky-500 p-4 rounded-r-2xl shadow-xs text-xs text-slate-800 border-y border-r border-sky-100">
      <div className="flex items-start space-x-3">
        <div className="p-1.5 bg-sky-500/10 rounded-xl text-sky-600 shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2 font-black text-slate-900 tracking-tight">
            <span>RETINA-MITRA Screening Support System</span>
            <span className="bg-sky-100 text-sky-800 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
              Non-Diagnostic
            </span>
          </div>
          <p className="text-slate-600 font-medium leading-relaxed text-[11px]">
            This tool provides <strong>AI screening support</strong> based on retinal microvascular indicators.
            It is <strong>not a medical diagnosis</strong>. Clinical evaluation by an eye-care professional or ophthalmologist is required where appropriate.
          </p>
        </div>
      </div>
    </div>
  );
};
