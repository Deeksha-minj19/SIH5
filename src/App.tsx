import { useState } from 'react';
import { DEMO_CASES } from './data/demoCases';
import type { ScreeningResultState, Member6OutputPayload, ErrorType } from './types/screening';
import { Header } from './components/Header';
import { MedicalDisclaimer } from './components/MedicalDisclaimer';
import { DemoCaseSelector } from './components/DemoCaseSelector';
import { ScreeningResultScreen } from './components/ScreeningResultScreen';
import { LoadingWorkflow } from './components/LoadingWorkflow';
import { ErrorStateCard } from './components/ErrorStateCard';
import { RetinalImageModal } from './components/RetinalImageModal';
import { ReportViewModal } from './components/ReportViewModal';
import { DataContractModal } from './components/DataContractModal';
import { ScreeningHistory } from './components/ScreeningHistory';
import { Code, FileText } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'RESULT' | 'HISTORY' | 'CONTRACTS'>('RESULT');
  const [currentCase, setCurrentCase] = useState<ScreeningResultState>(DEMO_CASES['CASE_3']);
  const [isLoadingWorkflow, setIsLoadingWorkflow] = useState(false);
  const [activeErrorType, setActiveErrorType] = useState<ErrorType>('NONE');
  const [isOffline, setIsOffline] = useState(false);

  // Modal triggers
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);

  // Compute Member 6 Output Payload
  const member6Payload: Member6OutputPayload = {
    patientData: currentCase.patient,
    retinalImage: {
      url: currentCase.retinalImage.url,
      eye: currentCase.retinalImage.eye,
      capturedAt: currentCase.retinalImage.capturedAt
    },
    qualityResult: currentCase.quality,
    aiResult: currentCase.aiOutput,
    referralRecommendation: currentCase.referral,
    screeningSummary: {
      screeningDate: currentCase.screeningDate,
      patientId: currentCase.patient.patientId,
      imageQuality: currentCase.quality.label,
      aiResult: currentCase.aiOutput.class,
      referralStatus: currentCase.referral.actionText
    },
    disclaimerNotice: 'AI Retinal Screening Support System — Not a medical diagnosis. Requires clinical evaluation by eye-care professional.',
    timestamp: new Date().toISOString()
  };

  const handleSelectCase = (caseState: ScreeningResultState) => {
    setActiveErrorType('NONE');
    setIsLoadingWorkflow(true);
    setCurrentCase(caseState);
    setActiveTab('RESULT');
  };

  const handleTriggerError = (errorTypeString: string) => {
    setActiveErrorType(errorTypeString as ErrorType);
    setActiveTab('RESULT');
  };

  const handleStartNewScreening = () => {
    setActiveErrorType('NONE');
    setIsLoadingWorkflow(true);
    setActiveTab('RESULT');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/40 via-teal-50/20 to-sky-50/40 text-slate-900 flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
      {/* RETINA-MITRA Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'CONTRACTS') setIsContractModalOpen(true);
        }}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        onResetWorkflow={handleStartNewScreening}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Medical Position Guardrail Disclaimer */}
        <MedicalDisclaimer />

        {/* Integration Demo Case Selector Bar */}
        <DemoCaseSelector
          currentCaseId={currentCase.caseId}
          onSelectCase={handleSelectCase}
          triggerError={handleTriggerError}
        />

        {/* Dynamic Workflow Rendering */}
        {isLoadingWorkflow ? (
          <LoadingWorkflow onComplete={() => setIsLoadingWorkflow(false)} />
        ) : activeErrorType !== 'NONE' ? (
          <ErrorStateCard
            errorType={activeErrorType}
            onRetry={() => {
              setActiveErrorType('NONE');
              setIsLoadingWorkflow(true);
            }}
            onClearError={() => setActiveErrorType('NONE')}
          />
        ) : activeTab === 'RESULT' ? (
          <ScreeningResultScreen
            resultState={currentCase}
            onOpenImageModal={() => setIsImageModalOpen(true)}
            onGenerateReport={() => setIsReportModalOpen(true)}
            onStartNewScreening={handleStartNewScreening}
            onOpenContractsModal={() => setIsContractModalOpen(true)}
          />
        ) : activeTab === 'HISTORY' ? (
          <ScreeningHistory
            onSelectHistoricalRecord={(histCase) => {
              setCurrentCase(histCase);
              setActiveTab('RESULT');
            }}
          />
        ) : (
          <div className="medico-card p-6 sm:p-8 space-y-4 text-center medico-bg-gradient border-teal-100">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Code className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-slate-900">Member 4 & 6 Integration Data Contracts</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
              Inspect Member 4 ML ingestion JSON schema and Member 6 export report payload schema for developer integration testing.
            </p>
            <button
              onClick={() => setIsContractModalOpen(true)}
              className="px-5 py-2.5 rounded-xl medico-btn-primary text-xs font-black transition-all inline-flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Open JSON Contract Inspector Modal</span>
            </button>
          </div>
        )}
      </main>

      {/* Medico+ Soft Healthcare Footer */}
      <footer className="bg-white text-slate-600 text-xs py-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-slate-900">RETINA-MITRA</span>
            <span className="text-slate-400">•</span>
            <span className="font-medium text-slate-600">Member 5 Screening Result & Referral Support Module</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Designated for PHC Low-Resource Retinal Screening • Non-Diagnostic System
          </p>
        </div>
      </footer>

      {/* Modals */}
      <RetinalImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        resultState={currentCase}
      />

      <ReportViewModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        outputPayload={member6Payload}
      />

      <DataContractModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        resultState={currentCase}
        outputPayload={member6Payload}
      />
    </div>
  );
}

export default App;
