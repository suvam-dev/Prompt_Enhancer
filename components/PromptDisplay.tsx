import React, { useState } from 'react';
import { Copy, Check, Share2, Sparkles } from 'lucide-react';

interface PromptDisplayProps {
  prompt: string;
  isGenerating: boolean;
  placeholder?: string;
}

export const PromptDisplay: React.FC<PromptDisplayProps> = ({
  prompt,
  isGenerating,
  placeholder = "Your enhanced prompt will appear here ready to copy...",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-slate-400 flex items-center">
          <Sparkles size={16} className="mr-2 text-emerald-400" />
          Enhanced Output
        </label>
        {prompt && (
          <button
            onClick={handleCopy}
            className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
              copied
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30'
            }`}
          >
            {copied ? (
              <>
                <Check size={14} className="mr-1.5" /> Copied!
              </>
            ) : (
              <>
                <Copy size={14} className="mr-1.5" /> Copy
              </>
            )}
          </button>
        )}
      </div>
      
      <div className="relative flex-1 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-xl opacity-20 blur group-hover:opacity-40 transition duration-500"></div>
        <div className={`relative h-full w-full bg-slate-900 border border-slate-700 rounded-xl p-4 overflow-hidden flex flex-col ${isGenerating ? 'animate-pulse' : ''}`}>
          
          {isGenerating ? (
             <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                <div className="relative w-12 h-12">
                   <div className="absolute inset-0 rounded-full border-4 border-indigo-500/30"></div>
                   <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin"></div>
                </div>
                <p className="animate-pulse">Forging your prompt...</p>
             </div>
          ) : prompt ? (
            <textarea
              readOnly
              className="w-full h-full bg-transparent border-none focus:ring-0 text-slate-200 resize-none font-mono text-sm leading-relaxed"
              value={prompt}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-600">
               <Sparkles size={48} className="mb-4 opacity-20" />
               <p>{placeholder}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};