export type ScreeningCategory =
  | 'NO_APPARENT_DR'
  | 'MILD_DR'
  | 'MODERATE_DR'
  | 'SEVERE_DR'
  | 'POOR_QUALITY'
  | 'UNCERTAIN_AI';

export type QualityStatus = 'SUITABLE' | 'POOR_QUALITY' | 'UNGRADABLE';

export interface Member4InputContract {
  class: 'No apparent DR' | 'Mild DR' | 'Moderate DR' | 'Severe DR' | 'Uncertain / Ungradable' | string;
  confidence: number | null; // e.g. 0.86 (0-1), null if uncalibrated/unavailable
  isCalibrated: boolean;
  modelVersion: string; // e.g. "v1.2-calibrated"
}

export interface ImageQualityResult {
  status: QualityStatus;
  label: string; // e.g., "Suitable for screening" or "Poor quality - recapture needed"
  score: number; // 0-100
  clarity: string;
  issues?: string[];
}

export interface PatientData {
  patientId: string; // e.g. RMT-001
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  diabetesDurationYears: number;
  lastScreeningDate: string;
  phcLocation: string;
  healthWorkerName: string;
  healthWorkerId: string;
}

export interface ReferralRecommendation {
  level: 'ROUTINE' | 'FOLLOW_UP' | 'REFERRAL' | 'PRIORITY_REFERRAL' | 'RECAPTURE_OR_MANUAL_REVIEW';
  statusColor: 'green' | 'yellow' | 'orange' | 'red' | 'warning';
  badgeIcon: string;
  title: string;
  actionText: string; // e.g., "Ophthalmologist Referral Recommended"
  whyRationale: string; // e.g., "AI screening identified features requiring further clinical evaluation."
  suggestedTimeframe: string; // e.g. "Within 4 weeks", "Immediate (Within 7 days)"
}

export interface ScreeningResultState {
  caseId: string;
  caseTitle: string;
  category: ScreeningCategory;
  patient: PatientData;
  retinalImage: {
    url: string;
    eye: 'Right Eye (OD)' | 'Left Eye (OS)';
    capturedAt: string;
    featuresDetected?: string[];
  };
  quality: ImageQualityResult;
  aiOutput: Member4InputContract;
  statusBadge: {
    symbol: string;
    colorClass: string;
    title: string;
    description: string;
  };
  referral: ReferralRecommendation;
  screeningDate: string;
}

export interface Member6OutputPayload {
  patientData: PatientData;
  retinalImage: {
    url: string;
    eye: string;
    capturedAt: string;
  };
  qualityResult: ImageQualityResult;
  aiResult: Member4InputContract;
  referralRecommendation: ReferralRecommendation;
  screeningSummary: {
    screeningDate: string;
    patientId: string;
    imageQuality: string;
    aiResult: string;
    referralStatus: string;
  };
  disclaimerNotice: string;
  timestamp: string;
}

export type PipelineLoadingStep =
  | 'IDLE'
  | 'PREPARING_IMAGE'
  | 'RUNNING_AI'
  | 'GENERATING_RESULT'
  | 'COMPLETE';

export type ErrorType =
  | 'NONE'
  | 'AI_UNAVAILABLE'
  | 'UNABLE_TO_LOAD_RESULT'
  | 'RESULT_DATA_UNAVAILABLE'
  | 'REPORT_GEN_FAILED'
  | 'NO_INTERNET';
