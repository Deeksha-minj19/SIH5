import type { ScreeningResultState, PatientData } from '../types/screening';

export const DEMO_PATIENTS: Record<string, PatientData> = {
  'RMT-001': {
    patientId: 'RMT-001',
    fullName: 'Sunita Sharma',
    age: 52,
    gender: 'Female',
    diabetesDurationYears: 8,
    lastScreeningDate: '20 Sep 2026',
    phcLocation: 'PHC Rampur, District Hospital North',
    healthWorkerName: 'Anita Swamy (ANM)',
    healthWorkerId: 'HW-4092'
  },
  'RMT-002': {
    patientId: 'RMT-002',
    fullName: 'Rajesh Verma',
    age: 58,
    gender: 'Male',
    diabetesDurationYears: 6,
    lastScreeningDate: '19 Sep 2026',
    phcLocation: 'PHC Rampur, District Hospital North',
    healthWorkerName: 'Anita Swamy (ANM)',
    healthWorkerId: 'HW-4092'
  },
  'RMT-003': {
    patientId: 'RMT-003',
    fullName: 'Ramesh Patel',
    age: 64,
    gender: 'Male',
    diabetesDurationYears: 14,
    lastScreeningDate: '18 Sep 2026',
    phcLocation: 'PHC Chandanpur',
    healthWorkerName: 'Vikram Singh (CHO)',
    healthWorkerId: 'HW-3104'
  },
  'RMT-004': {
    patientId: 'RMT-004',
    fullName: 'Meena Devi',
    age: 61,
    gender: 'Female',
    diabetesDurationYears: 10,
    lastScreeningDate: '18 Sep 2026',
    phcLocation: 'PHC Rampur',
    healthWorkerName: 'Anita Swamy (ANM)',
    healthWorkerId: 'HW-4092'
  },
  'RMT-005': {
    patientId: 'RMT-005',
    fullName: 'Anil Kumar',
    age: 49,
    gender: 'Male',
    diabetesDurationYears: 5,
    lastScreeningDate: '17 Sep 2026',
    phcLocation: 'PHC Rampur',
    healthWorkerName: 'Anita Swamy (ANM)',
    healthWorkerId: 'HW-4092'
  },
  'RMT-006': {
    patientId: 'RMT-006',
    fullName: 'Lata Bai',
    age: 56,
    gender: 'Female',
    diabetesDurationYears: 11,
    lastScreeningDate: '15 Sep 2026',
    phcLocation: 'PHC Rampur',
    healthWorkerName: 'Anita Swamy (ANM)',
    healthWorkerId: 'HW-4092'
  }
};

// SVG data URI helper for fundus images with retinal blood vessels & optic disc
export function createRetinalImageSvg(type: 'normal' | 'mild' | 'moderate' | 'severe' | 'blurry'): string {
  const bg = type === 'blurry' ? '#8a3b14' : '#b84414';
  const discColor = '#ffdb99';
  
  let indicators = '';
  if (type === 'mild') {
    // A few microaneurysms (red dots)
    indicators = `
      <circle cx="210" cy="160" r="4" fill="#880000" stroke="#ff4444" stroke-width="1.5" />
      <circle cx="280" cy="240" r="3.5" fill="#880000" stroke="#ff4444" stroke-width="1.5" />
      <circle cx="160" cy="290" r="4.5" fill="#880000" stroke="#ff4444" stroke-width="1.5" />
    `;
  } else if (type === 'moderate') {
    // Microaneurysms + hard exudates (yellow spots) + hemorrhages
    indicators = `
      <circle cx="210" cy="160" r="5" fill="#990000" stroke="#ff3333" stroke-width="1.5" />
      <circle cx="280" cy="240" r="4" fill="#990000" stroke="#ff3333" stroke-width="1.5" />
      <circle cx="150" cy="280" r="6" fill="#770000" stroke="#ff2222" stroke-width="1.5" />
      <circle cx="240" cy="180" r="5" fill="#fffb99" stroke="#e6c200" stroke-width="1" />
      <circle cx="255" cy="190" r="4" fill="#fffb99" stroke="#e6c200" stroke-width="1" />
      <path d="M 180 200 Q 190 205 195 215" stroke="#aa0000" stroke-width="3.5" fill="none" stroke-linecap="round" />
    `;
  } else if (type === 'severe') {
    // Multiple hemorrhages, cotton wool spots (soft whiteish exudates), venous beading
    indicators = `
      <circle cx="210" cy="160" r="7" fill="#880000" stroke="#ff3333" stroke-width="2" />
      <circle cx="280" cy="240" r="6" fill="#880000" stroke="#ff3333" stroke-width="2" />
      <circle cx="150" cy="280" r="8" fill="#660000" stroke="#ff2222" stroke-width="2" />
      <circle cx="310" cy="150" r="7" fill="#660000" stroke="#ff2222" stroke-width="2" />
      <!-- Cotton wool spots -->
      <ellipse cx="230" cy="140" rx="12" ry="8" fill="#ffffff" opacity="0.85" />
      <ellipse cx="170" cy="220" rx="14" ry="9" fill="#ffffff" opacity="0.8" />
      <!-- Hard exudates ring -->
      <circle cx="240" cy="180" r="5" fill="#fffb99" />
      <circle cx="255" cy="190" r="4.5" fill="#fffb99" />
      <circle cx="265" cy="175" r="5" fill="#fffb99" />
      <path d="M 160 190 Q 185 210 200 230" stroke="#880000" stroke-width="5" fill="none" />
    `;
  }

  const blurFilter = type === 'blurry' ? 'filter="url(#blur-effect)"' : '';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <defs>
        <radialGradient id="fundus-grad" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#d95d1e"/>
          <stop offset="70%" stop-color="${bg}"/>
          <stop offset="100%" stop-color="#4a1505"/>
        </radialGradient>
        <filter id="blur-effect">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <radialGradient id="disc-grad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#fff4d1"/>
          <stop offset="100%" stop-color="${discColor}"/>
        </radialGradient>
      </defs>
      
      <!-- Retinal Background -->
      <circle cx="200" cy="200" r="190" fill="url(#fundus-grad)" ${blurFilter} />
      
      <g ${blurFilter}>
        <!-- Optic Disc -->
        <circle cx="110" cy="200" r="32" fill="url(#disc-grad)" stroke="#ffa333" stroke-width="2" />
        
        <!-- Macula -->
        <ellipse cx="230" cy="200" rx="20" ry="18" fill="#6e2105" opacity="0.75" />
        <circle cx="230" cy="200" r="4" fill="#3a1002" opacity="0.8" />
        
        <!-- Retinal Vascular Tree (Main Arcades) -->
        <!-- Superior Temporal Arcade -->
        <path d="M 115 180 Q 140 100 240 80 Q 300 70 340 110" stroke="#7a0d02" stroke-width="5" fill="none" stroke-linecap="round" />
        <path d="M 115 180 Q 140 100 240 80 Q 300 70 340 110" stroke="#d63427" stroke-width="2.5" fill="none" stroke-linecap="round" />
        
        <!-- Inferior Temporal Arcade -->
        <path d="M 115 220 Q 140 300 240 320 Q 300 330 350 280" stroke="#7a0d02" stroke-width="5" fill="none" stroke-linecap="round" />
        <path d="M 115 220 Q 140 300 240 320 Q 300 330 350 280" stroke="#d63427" stroke-width="2.5" fill="none" stroke-linecap="round" />

        <!-- Nasal Branches -->
        <path d="M 100 185 Q 70 120 40 100" stroke="#7a0d02" stroke-width="4" fill="none" />
        <path d="M 100 215 Q 70 280 40 300" stroke="#7a0d02" stroke-width="4" fill="none" />

        <!-- Micro-vessel branching -->
        <path d="M 180 100 Q 210 130 230 150" stroke="#b02619" stroke-width="1.8" fill="none" />
        <path d="M 180 300 Q 210 270 230 250" stroke="#b02619" stroke-width="1.8" fill="none" />
        <path d="M 270 85 Q 275 120 280 140" stroke="#b02619" stroke-width="1.5" fill="none" />
        
        <!-- Clinical Indicators Overlay -->
        ${indicators}
      </g>
      
      <!-- Vignette Border -->
      <circle cx="200" cy="200" r="190" fill="none" stroke="#1e0802" stroke-width="8" opacity="0.6" />
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const DEMO_CASES: Record<string, ScreeningResultState> = {
  CASE_1: {
    caseId: 'CASE_1',
    caseTitle: 'CASE 1 — No Apparent DR',
    category: 'NO_APPARENT_DR',
    patient: DEMO_PATIENTS['RMT-001'],
    retinalImage: {
      url: createRetinalImageSvg('normal'),
      eye: 'Right Eye (OD)',
      capturedAt: '20 Sep 2026, 10:14 AM',
      featuresDetected: ['Normal vascular caliber', 'Clear macula', 'Defined optic disc margin']
    },
    quality: {
      status: 'SUITABLE',
      label: 'Suitable for screening',
      score: 96,
      clarity: 'High image clarity, optimal illumination & centration'
    },
    aiOutput: {
      class: 'No apparent DR',
      confidence: 0.94,
      isCalibrated: true,
      modelVersion: 'v1.2-calibrated'
    },
    statusBadge: {
      symbol: '🟢',
      colorClass: 'bg-emerald-500/10 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
      title: 'No apparent DR',
      description: 'No apparent DR indicators detected in this screening.'
    },
    referral: {
      level: 'ROUTINE',
      statusColor: 'green',
      badgeIcon: 'CheckCircle2',
      title: 'Routine Follow-up',
      actionText: 'Routine Annual Follow-up',
      whyRationale: 'No features requiring immediate specialist referral were identified during AI screening support.',
      suggestedTimeframe: 'Routine follow-up screening in 12 months as per PHC guidelines.'
    },
    screeningDate: '20 Sep 2026'
  },
  CASE_2: {
    caseId: 'CASE_2',
    caseTitle: 'CASE 2 — Mild DR',
    category: 'MILD_DR',
    patient: DEMO_PATIENTS['RMT-002'],
    retinalImage: {
      url: createRetinalImageSvg('mild'),
      eye: 'Left Eye (OS)',
      capturedAt: '19 Sep 2026, 02:45 PM',
      featuresDetected: ['Isolated microaneurysms detected', 'Normal optic disc']
    },
    quality: {
      status: 'SUITABLE',
      label: 'Suitable for screening',
      score: 91,
      clarity: 'Good contrast, minimal artifact'
    },
    aiOutput: {
      class: 'Mild DR',
      confidence: 0.88,
      isCalibrated: true,
      modelVersion: 'v1.2-calibrated'
    },
    statusBadge: {
      symbol: '🟡',
      colorClass: 'bg-amber-500/10 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
      title: 'Mild DR indicators detected',
      description: 'Follow-up with an eye-care professional is recommended.'
    },
    referral: {
      level: 'FOLLOW_UP',
      statusColor: 'yellow',
      badgeIcon: 'Clock',
      title: 'Eye-Care Professional Follow-up',
      actionText: 'Follow-up with Eye-Care Professional Recommended',
      whyRationale: 'AI screening detected early mild microvascular indicators requiring non-urgent clinical evaluation.',
      suggestedTimeframe: 'Comprehensive ophthalmic examination within 3 to 6 months.'
    },
    screeningDate: '19 Sep 2026'
  },
  CASE_3: {
    caseId: 'CASE_3',
    caseTitle: 'CASE 3 — Moderate DR (Primary Demo)',
    category: 'MODERATE_DR',
    patient: DEMO_PATIENTS['RMT-001'],
    retinalImage: {
      url: createRetinalImageSvg('moderate'),
      eye: 'Right Eye (OD)',
      capturedAt: '20 Sep 2026, 11:30 AM',
      featuresDetected: [
        'Multiple microaneurysms',
        'Hard exudates cluster in temporal macula',
        'Intraretinal microhemorrhage'
      ]
    },
    quality: {
      status: 'SUITABLE',
      label: 'Suitable for screening',
      score: 89,
      clarity: 'Adequate field definition & illumination'
    },
    aiOutput: {
      class: 'Moderate DR',
      confidence: 0.86,
      isCalibrated: true,
      modelVersion: 'v1.2-calibrated'
    },
    statusBadge: {
      symbol: '🟠',
      colorClass: 'bg-orange-500/10 text-orange-800 border-orange-300 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800',
      title: 'Moderate DR indicators detected',
      description: 'Ophthalmologist referral recommended.'
    },
    referral: {
      level: 'REFERRAL',
      statusColor: 'orange',
      badgeIcon: 'AlertTriangle',
      title: 'Ophthalmologist Referral',
      actionText: 'Ophthalmologist Referral Recommended',
      whyRationale: 'AI screening identified features requiring further clinical evaluation.',
      suggestedTimeframe: 'Referral evaluation recommended within 4 weeks at nearest eye hospital/clinic.'
    },
    screeningDate: '20 Sep 2026'
  },
  CASE_4: {
    caseId: 'CASE_4',
    caseTitle: 'CASE 4 — Severe DR',
    category: 'SEVERE_DR',
    patient: DEMO_PATIENTS['RMT-003'],
    retinalImage: {
      url: createRetinalImageSvg('severe'),
      eye: 'Left Eye (OS)',
      capturedAt: '18 Sep 2026, 09:15 AM',
      featuresDetected: [
        'Widespread intraretinal hemorrhages in >2 quadrants',
        'Prominent cotton wool spots',
        'Venous beading',
        'Hard exudate ring'
      ]
    },
    quality: {
      status: 'SUITABLE',
      label: 'Suitable for screening',
      score: 94,
      clarity: 'High resolution, clear macular & peripheral fields'
    },
    aiOutput: {
      class: 'Severe DR',
      confidence: 0.92,
      isCalibrated: true,
      modelVersion: 'v1.2-calibrated'
    },
    statusBadge: {
      symbol: '🔴',
      colorClass: 'bg-rose-500/10 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
      title: 'Severe DR indicators detected',
      description: 'Priority ophthalmic evaluation recommended.'
    },
    referral: {
      level: 'PRIORITY_REFERRAL',
      statusColor: 'red',
      badgeIcon: 'AlertCircle',
      title: 'Priority Ophthalmic Referral',
      actionText: 'Priority Ophthalmic Evaluation Recommended',
      whyRationale: 'AI screening identified multiple severe microvascular indicators requiring urgent clinical evaluation.',
      suggestedTimeframe: 'Priority consultation within 1 to 2 weeks at tertiary ophthalmic center.'
    },
    screeningDate: '18 Sep 2026'
  },
  CASE_5: {
    caseId: 'CASE_5',
    caseTitle: 'CASE 5 — Poor-Quality Image',
    category: 'POOR_QUALITY',
    patient: DEMO_PATIENTS['RMT-004'],
    retinalImage: {
      url: createRetinalImageSvg('blurry'),
      eye: 'Right Eye (OD)',
      capturedAt: '18 Sep 2026, 03:20 PM',
      featuresDetected: ['Image obscuration', 'Severe motion blur / low illumination']
    },
    quality: {
      status: 'POOR_QUALITY',
      label: 'Poor Quality / Ungradable',
      score: 34,
      clarity: 'Insufficient clarity — low contrast, media opacity',
      issues: ['Poor illumination', 'Motion blur', 'Small pupil opacity']
    },
    aiOutput: {
      class: 'Ungradable Image',
      confidence: null,
      isCalibrated: false,
      modelVersion: 'v1.2-calibrated'
    },
    statusBadge: {
      symbol: '⚠️',
      colorClass: 'bg-amber-500/10 text-amber-900 border-amber-300 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-700',
      title: 'Image quality insufficient for reliable AI analysis',
      description: 'Recapture image or request manual ophthalmic review.'
    },
    referral: {
      level: 'RECAPTURE_OR_MANUAL_REVIEW',
      statusColor: 'warning',
      badgeIcon: 'RefreshCw',
      title: 'Recapture Image / Manual Review',
      actionText: 'Image Recapture or Manual Ophthalmic Review Recommended',
      whyRationale: 'Member 3 quality assessment flagged this fundus image as ungradable. AI classification cannot be performed accurately.',
      suggestedTimeframe: 'Immediate image recapture with pupil dilation or direct specialist review.'
    },
    screeningDate: '18 Sep 2026'
  },
  CASE_6: {
    caseId: 'CASE_6',
    caseTitle: 'CASE 6 — Uncertain / Ungradable AI',
    category: 'UNCERTAIN_AI',
    patient: DEMO_PATIENTS['RMT-005'],
    retinalImage: {
      url: createRetinalImageSvg('mild'),
      eye: 'Right Eye (OD)',
      capturedAt: '17 Sep 2026, 11:05 AM',
      featuresDetected: ['Atypical vessel pattern', 'Ambiguous foveal reflection']
    },
    quality: {
      status: 'SUITABLE',
      label: 'Suitable for screening',
      score: 78,
      clarity: 'Acceptable sharpness, minor peripheral glare'
    },
    aiOutput: {
      class: 'Uncertain / Ungradable',
      confidence: null,
      isCalibrated: false,
      modelVersion: 'v1.2-calibrated'
    },
    statusBadge: {
      symbol: '⚠️',
      colorClass: 'bg-slate-500/10 text-slate-800 border-slate-300 dark:bg-slate-900/50 dark:text-slate-200 dark:border-slate-700',
      title: 'Image/result cannot be reliably classified.',
      description: 'Recapture or manual ophthalmic review recommended.'
    },
    referral: {
      level: 'RECAPTURE_OR_MANUAL_REVIEW',
      statusColor: 'warning',
      badgeIcon: 'HelpCircle',
      title: 'Manual Review Recommended',
      actionText: 'Manual Ophthalmic Review or Recapture Recommended',
      whyRationale: 'Member 4 AI pipeline encountered ambiguous retinal features outside high-confidence calibration bounds.',
      suggestedTimeframe: 'Forward scan for tele-ophthalmology expert review or perform fresh capture.'
    },
    screeningDate: '17 Sep 2026'
  }
};

export const INITIAL_SCREENING_HISTORY = [
  {
    patientId: 'RMT-001',
    patientName: 'Sunita Sharma',
    screeningDate: '20 Sep 2026',
    qualityStatus: 'Suitable',
    aiResult: 'Moderate DR indicators detected',
    referral: 'Ophthalmologist referral',
    statusColor: 'orange',
    symbol: '🟠'
  },
  {
    patientId: 'RMT-002',
    patientName: 'Rajesh Verma',
    screeningDate: '19 Sep 2026',
    qualityStatus: 'Suitable',
    aiResult: 'Mild DR indicators detected',
    referral: 'Follow-up with eye-care professional',
    statusColor: 'yellow',
    symbol: '🟡'
  },
  {
    patientId: 'RMT-003',
    patientName: 'Ramesh Patel',
    screeningDate: '18 Sep 2026',
    qualityStatus: 'Suitable',
    aiResult: 'Severe DR indicators detected',
    referral: 'Priority ophthalmic evaluation',
    statusColor: 'red',
    symbol: '🔴'
  },
  {
    patientId: 'RMT-004',
    patientName: 'Meena Devi',
    screeningDate: '18 Sep 2026',
    qualityStatus: 'Ungradable',
    aiResult: 'Poor quality — cannot classify',
    referral: 'Recapture required',
    statusColor: 'warning',
    symbol: '⚠️'
  },
  {
    patientId: 'RMT-005',
    patientName: 'Anil Kumar',
    screeningDate: '17 Sep 2026',
    qualityStatus: 'Suitable',
    aiResult: 'Uncertain / ungradable',
    referral: 'Manual review or recapture',
    statusColor: 'warning',
    symbol: '⚠️'
  },
  {
    patientId: 'RMT-006',
    patientName: 'Lata Bai',
    screeningDate: '15 Sep 2026',
    qualityStatus: 'Suitable',
    aiResult: 'No apparent DR',
    referral: 'Routine follow-up',
    statusColor: 'green',
    symbol: '🟢'
  }
];
