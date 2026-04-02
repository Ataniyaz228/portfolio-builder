'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface DownloadCVProps {
  username: string;
}

export default function DownloadCV({ username }: DownloadCVProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadCV = async () => {
    setDownloading(true);
    try {
      // Dynamic import to avoid SSR issues with html2pdf
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('cv-content');
      
      if (!element) {
        console.error('CV content element not found');
        return;
      }
      
      // Temporarily show the element for capturing
      const originalDisplay = element.style.display;
      element.style.display = 'block';

      const opt = {
        margin:       10,
        filename:     `${username}_cv.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(element).save();
      
      // Restore original display
      element.style.display = originalDisplay;
    } catch (err) {
      console.error('PDF Generation Error:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
      <button 
        onClick={handleDownloadCV} 
        disabled={downloading} 
        className="px-5 py-2.5 bg-surface/80 backdrop-blur border border-border rounded-xl font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-colors shadow-2xl disabled:opacity-50 text-sm"
      >
        {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        {downloading ? 'Generating...' : 'Download CV'}
      </button>
    </div>
  );
}
