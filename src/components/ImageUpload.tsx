"use client";

import { useState, useRef } from "react";
import { UploadCloud, Loader2, Check, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Casino Logo / Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-300 block uppercase">{label}</label>

      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-white/10">
        {/* Preview Box */}
        <div className="w-20 h-20 rounded-2xl bg-[#080C15] border border-white/15 overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-8 h-8 text-slate-600" />
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1 space-y-2 w-full">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition disabled:opacity-50 shadow-md shadow-red-600/30"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  Upload From Computer
                </>
              )}
            </button>

            {value && (
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Image Attached
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-500">
            JPG, PNG, WEBP, or SVG saved directly onto your website server.
          </div>

          {/* Or manual URL fallback */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste external image URL..."
            className="w-full px-3 py-1.5 rounded-lg bg-[#080C15] border border-white/10 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-400 font-bold">{error}</p>}
    </div>
  );
}
