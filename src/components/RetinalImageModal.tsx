import { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Eye, Layers, CheckCircle } from 'lucide-react';
import type { ScreeningResultState } from '../types/screening';

interface RetinalImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultState: ScreeningResultState;
}

export const RetinalImageModal: React.FC<RetinalImageModalProps> = ({
  isOpen,
  onClose,
  resultState
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showAnnotations, setShowAnnotations] = useState(true);

  if (!isOpen) return null;

  const { patient, retinalImage, aiOutput } = resultState;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 medico-bg-gradient">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                High-Resolution Retinal Image Viewer
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                {patient.patientId} • {retinalImage.eye} • Captured {retinalImage.capturedAt}
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

        {/* Viewer Toolbar */}
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mr-1">
              Zoom: {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all"
              title="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* AI Annotation Toggle */}
          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all ${
              showAnnotations
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>AI Feature Overlay: {showAnnotations ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Main Image Canvas Container */}
        <div className="flex-1 bg-slate-950 relative overflow-auto p-6 flex items-center justify-center min-h-[350px]">
          <div
            className="transition-transform duration-200 relative max-w-full max-h-full"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={retinalImage.url}
              alt="Retinal Fundus"
              className="max-h-[50vh] object-contain rounded-full border-2 border-slate-800 shadow-2xl"
            />
            {showAnnotations && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-emerald-400/70 animate-pulse flex items-center justify-center">
                  <span className="text-[10px] font-mono font-bold bg-slate-900/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/40">
                    Indicator Region
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-600 font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Ingested AI Output: <strong>{aiOutput.class}</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-all"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
