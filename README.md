<div align="center">
  <img src="docs/assets/logo.jpg" alt="RETINA-MITRA Logo" width="150" />
  <h1>👁️ RETINA-MITRA</h1>
  <p><strong>AI-Powered Retinal Screening & Referral Support System</strong></p>
  
  [![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
</div>

<br />

**RETINA-MITRA** is a low-resource point-of-care screening tool designed specifically for Primary Health Centres (PHCs). By leveraging advanced machine learning inference pipelines, it provides instant, deterministic referral guidance for diabetic retinopathy and other retinal anomalies, acting as a crucial triage layer before specialist intervention.

---

## ✨ Core Capabilities

- 🤖 **Member 4 AI Inference**: Fast, reliable ML assessment of retinal fundus scans.
- 📊 **Member 5 Clinical Guidance**: Generates strict referral actions and rationale based on AI confidence scores and clinical thresholds.
- 📄 **Member 6 Hand-Off Reporting**: Structured JSON payload generation for secure clinical hand-offs and printable screening reports.
- 📱 **Mobile-First Ergonomics**: Highly responsive, swipe-friendly interface designed specifically for tablets and mobile devices used by field health workers.
- 📶 **Offline Resilience**: Asynchronous state management to handle intermittent or non-existent PHC network connectivity.

---

## 🏗️ System Architecture

The RETINA-MITRA application is modularly decoupled into specific "Members" that handle discrete responsibilities in the screening pipeline.

```mermaid
graph TD
    subgraph "Primary Health Centre (PHC)"
        HW[Health Worker]
        Tablet[Mobile / Tablet Interface]
    end

    subgraph "RETINA-MITRA Pipeline"
        M3[Member 3: Image Ingestion & QC]
        M4[Member 4: AI Inference Engine]
        M5[Member 5: Referral Logic & Summary]
        M6[Member 6: Report Generation]
    end

    subgraph "Specialist Node"
        Ophth[Ophthalmologist Review Queue]
    end

    HW -- Captures Fundus Scan --> Tablet
    Tablet -- Uploads Payload --> M3
    M3 -- Validated Image Array --> M4
    M4 -- ML Classification & Confidence Matrix --> M5
    M5 -- Structured Clinical Action --> M6
    M6 -- PDF Report & JSON Contract --> Tablet
    M5 -. Severe/Referable Cases .-> Ophth

    style HW fill:#f8fafc,stroke:#cbd5e1,color:#1e293b
    style Tablet fill:#f8fafc,stroke:#cbd5e1,color:#1e293b
    style M3 fill:#e2e8f0,stroke:#94a3b8,color:#1e293b
    style M4 fill:#dcfce7,stroke:#22c55e,color:#166534
    style M5 fill:#dcfce7,stroke:#22c55e,color:#166534
    style M6 fill:#dbeafe,stroke:#3b82f6,color:#1e40af
    style Ophth fill:#fee2e2,stroke:#ef4444,color:#991b1b
```

---

## 📸 Interface Preview

The interface has been meticulously crafted to feel professional, trustworthy, and heavily grounded in modern healthcare UX design paradigms.

### Desktop View (Dashboard & Results)
<img src="docs/assets/screenshot_desktop.png" alt="Desktop Dashboard View" width="100%" style="border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" />

### Mobile View (Field Device Optimization)
<div align="center">
  <img src="docs/assets/screenshot_mobile.png" alt="Mobile View" width="350px" style="border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);" />
</div>

---

## 🚀 Getting Started

To spin up the RETINA-MITRA frontend development server locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🔒 Data Contracts & JSON Payloads

RETINA-MITRA heavily relies on strictly typed TypeScript interfaces to ensure reliable data flow between the AI Inference module (Member 4) and the Reporting module (Member 6). 

You can inspect live JSON payloads directly within the application via the **Data Contracts Inspector** modal, which provides raw access to the exact schemas being passed through the pipeline.

---
<div align="center">
  <small>Built with ❤️ for better rural healthcare accessibility.</small>
</div>
