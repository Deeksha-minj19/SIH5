import { useEffect, useState } from 'react';
import type { PipelineLoadingStep } from '../types/screening';
import { Loader2, CheckCircle2, Cpu, Eye, FileText, Sparkles } from 'lucide-react';

interface LoadingWorkflowProps {
  onComplete: () => void;
}

export const LoadingWorkflow: React.FC<LoadingWorkflowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<PipelineLoadingStep>('PREPARING_IMAGE');

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('RUNNING_AI'), 800);
    const timer2 = setTimeout(() => setCurrentStep('GENERATING_RESULT'), 1600);
    const timer3 = setTimeout(() => {
      setCurrentStep('COMPLETE');
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const steps = [
    {
      id: 'PREPARING_IMAGE',
      title: '1. Ingesting Retinal Image (Member 3)',
      desc: 'Checking optical quality & microvascular clarity',
      icon: Eye
    },
    {
      id: 'RUNNING_AI',
      title: '2. Running Retinal AI Model (Member 4)',
      desc: 'Evaluating lesion indicators & model calibration',
      icon: Cpu
    },
    {
      id: 'GENERATING_RESULT',
      title: '3. Generating Screening Result (Member 5)',
      desc: 'Synthesizing referral support & rationale guidance',
      icon: Sparkles
    },
    {
      id: 'COMPLETE',
      title: '4. Pipeline Complete',
      desc: 'Ready for Member 6 Report Generation',
      icon: FileText
    }
  ];

  return (
    <div className="medico-card p-8 text-center max-w-xl mx-auto space-y-6 animate-fadeIn medico-bg-gradient border-teal-100 shadow-md">
      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center animate-bounce shadow-md">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>

      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          Processing Screening Pipeline...
        </h2>
        <p className="text-xs text-slate-600 font-medium mt-1">
          RETINA-MITRA automated workflow sequence
        </p>
      </div>

      <div className="space-y-3 text-left">
        {steps.map((step) => {
          const Icon = step.icon;
          const isDone =
            (step.id === 'PREPARING_IMAGE' && currentStep !== 'PREPARING_IMAGE') ||
            (step.id === 'RUNNING_AI' &&
              currentStep !== 'PREPARING_IMAGE' &&
              currentStep !== 'RUNNING_AI') ||
            (step.id === 'GENERATING_RESULT' && currentStep === 'COMPLETE');

          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                isDone
                  ? 'bg-emerald-50 border-emerald-200 text-slate-900'
                  : isActive
                  ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-200 text-slate-900'
                  : 'bg-slate-50/50 border-slate-200/60 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isActive
                      ? 'bg-emerald-100 text-emerald-700 animate-pulse'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-snug">{step.title}</h4>
                  <p className="text-[10px] text-slate-500 font-medium">{step.desc}</p>
                </div>
              </div>

              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isActive ? (
                <Loader2 className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
