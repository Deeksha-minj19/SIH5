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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased font-sans">
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

      {/* Medico+ Hero Section (Active only on Home/Result tab to mimic a landing page) */}
      {activeTab === 'RESULT' && !isLoadingWorkflow && activeErrorType === 'NONE' && (
        <section className="relative w-full medico-hero-gradient pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-[3rem] shadow-sm">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: Text & CTA */}
              <div className="space-y-6 text-center lg:text-left pt-10 lg:pt-0">
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E293B] tracking-tight leading-tight">
                  Your Health <br />
                  <span className="text-[#34A853]">Is Our Priority</span>
                </h1>
                
                <p className="text-[#64748B] text-lg max-w-xl mx-auto lg:mx-0">
                  Providing trusted healthcare with advanced AI technology and compassionate care. Select a patient case below to simulate the retinal screening process.
                </p>
                
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button 
                    onClick={() => document.getElementById('demo-selector')?.scrollIntoView({ behavior: 'smooth' })}
                    className="medico-btn-primary px-8 py-4 text-base w-full sm:w-auto flex items-center justify-center gap-2 touch-target"
                  >
                    Simulate AI Screening
                  </button>
                  <button 
                    onClick={() => setIsContractModalOpen(true)}
                    className="medico-btn-secondary px-8 py-4 text-base w-full sm:w-auto flex items-center justify-center gap-2 touch-target bg-white hover:bg-gray-50 text-[#1E293B] border-gray-200"
                  >
                    View Contracts
                  </button>
                </div>
              </div>

              {/* Right Column: Doctor Asset & Floating Elements */}
              <div className="relative hidden lg:block h-[500px]">
                {/* Decorative blob/shape behind doctor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#34A853]/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white rounded-full"></div>
                
                {/* Doctor Asset */}
                <img 
                  src="/assets/doctor.jpg" 
                  alt="Medical Professional" 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[110%] w-auto object-contain z-10 mix-blend-multiply"
                />

                {/* Floating Cards (Decorative) */}
                <div className="absolute top-20 right-0 z-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="w-10 h-10 rounded-full bg-[#E6F5F2] text-[#34A853] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">AI Accuracy</p>
                    <p className="text-sm font-extrabold text-[#1E293B]">96% Precision</p>
                  </div>
                </div>

                <div className="absolute bottom-20 left-0 z-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  <div className="w-10 h-10 rounded-full bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Patient Care</p>
                    <p className="text-sm font-extrabold text-[#1E293B]">Top Priority</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
          {/* DemoCaseSelector container positioned below Hero */}
          <div id="demo-selector" className="max-w-7xl mx-auto mt-12 relative z-30">
            <DemoCaseSelector
              currentCaseId={currentCase.caseId}
              onSelectCase={handleSelectCase}
              triggerError={handleTriggerError}
            />
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {/* We move MedicalDisclaimer here for compliance, maybe styled cleanly */}
        {activeTab === 'RESULT' && <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-6"><MedicalDisclaimer /></div>}

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
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
            <div className="mt-4">
              <ScreeningResultScreen
                resultState={currentCase}
                onOpenImageModal={() => setIsImageModalOpen(true)}
                onGenerateReport={() => setIsReportModalOpen(true)}
                onStartNewScreening={handleStartNewScreening}
                onOpenContractsModal={() => setIsContractModalOpen(true)}
              />
            </div>
          ) : activeTab === 'HISTORY' ? (
            <ScreeningHistory
              onSelectHistoricalRecord={(histCase) => {
                setCurrentCase(histCase);
                setActiveTab('RESULT');
              }}
            />
          ) : (
            <div className="max-w-3xl mx-auto mt-12 medico-card p-10 text-center space-y-6 bg-[#F8FAF9]">
              <div className="w-16 h-16 rounded-2xl bg-[#E6F5F2] text-[#34A853] flex items-center justify-center mx-auto shadow-sm">
                <Code className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-[#1E293B]">Data Contracts (Member 4 & 6)</h2>
              <p className="text-[#64748B] max-w-lg mx-auto">
                Inspect Member 4 ML ingestion JSON schema and Member 6 export report payload schema for developer integration testing.
              </p>
              <button
                onClick={() => setIsContractModalOpen(true)}
                className="medico-btn-secondary px-6 py-3 transition-all inline-flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Open JSON Contract Inspector</span>
              </button>
            </div>
          )}
        </div>
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
