import React, { useState } from 'react';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import Modal from './common/Modal';
import Button from './common/Button';
import { triggerHeartConfetti } from '../utils/confetti';
import { audioService } from '../utils/audioSynthesizer';

export default function PhotoUploadModal({ isOpen, onClose, currentPhoto, onUpdatePhoto }) {
  const [preview, setPreview] = useState(currentPhoto);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileUpload = (e) => {
    setErrorMsg('');
    const file = e.target.files[0];
    if (!file) return;

    // File type validation
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    // Size validation (Max 8MB for performance and storage)
    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg('Image size must be under 8MB for smooth performance.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read image file. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onUpdatePhoto(preview);
    triggerHeartConfetti();
    audioService.playChime('sweet');
    onClose();
  };

  const presetPhotos = [
    { label: "Queen Sara 👑", url: "/images/sara_real/sara_grace.jpg" },
    { label: "Her Charming Smile", url: "/images/sara_real/sara_portrait.jpg" },
    { label: "Traditional Pink Lehenga", url: "/images/sara_real/sara_pink_lehenga.jpg" },
    { label: "Garden Sunshine Candid", url: "/images/sara_real/sara_candid.jpg" },
    { label: "Gentle Heart with Baby", url: "/images/sara_real/sara_sweet.jpg" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Customize Sara's Photo"
      maxWidth="max-w-lg"
    >
      <p className="text-xs text-slate-400 mb-5">
        Upload any cherished picture of Sara from your device or select a preset photo. It will update the 3D reveal card immediately.
      </p>

      {/* Live Preview */}
      <div className="flex justify-center mb-5">
        <div className="w-32 h-44 rounded-2xl overflow-hidden border-2 border-rose-400/50 shadow-xl bg-midnight-900 relative">
          <img
            src={preview}
            alt="Sara Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 inset-x-1 bg-black/60 backdrop-blur-sm text-[10px] text-center text-rose-200 py-0.5 rounded">
            Selected Photo
          </div>
        </div>
      </div>

      {/* Error message */}
      {errorMsg && (
        <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2 mb-4">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Upload File Input */}
      <div className="space-y-4">
        <label className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-rose-500/40 hover:border-rose-400 bg-white/[0.02] hover:bg-rose-500/10 cursor-pointer transition">
          <Upload className="w-6 h-6 text-rose-400 mb-1" />
          <span className="text-xs font-semibold text-slate-200">
            Upload from your phone or computer
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">
            JPG, PNG, WebP up to 8MB
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>

        {/* Preset Options */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80 mb-2">
            Or Choose Preset Photos:
          </div>
          <div className="grid grid-cols-2 gap-2">
            {presetPhotos.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPreview(preset.url);
                  setErrorMsg('');
                }}
                className={`p-2 rounded-xl text-left text-xs font-medium border transition ${
                  preview === preset.url
                    ? 'bg-rose-500/20 text-rose-200 border-rose-400'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end space-x-3">
        <Button variant="ghost" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" onClick={handleSave}>
          Save Photo
        </Button>
      </div>
    </Modal>
  );
}
