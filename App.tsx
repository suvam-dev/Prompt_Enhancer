import React, { useState, useEffect } from 'react';
import { Settings, Zap, History, Menu, Wand2, ArrowRight } from 'lucide-react';
import { TargetModel, Tone, HistoryItem, GenerationConfig } from './types';
import { MODEL_OPTIONS, TONE_OPTIONS } from './constants';
import { elaboratePrompt } from './services/geminiService';
import { HistorySidebar } from './components/HistorySidebar';
import { PromptDisplay } from './components/PromptDisplay';

function App() {
  // State
  const [inputValue, setInputValue] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [config, setConfig] = useState<GenerationConfig>({
    targetModel: TargetModel.GEMINI_GENERAL,
    tone: Tone.PROFESSIONAL,
    includeReasoning: false,
  });
  
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('promptForgeHistory');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('promptForgeHistory', JSON.stringify(history));
  }, [history]);

  // Handlers
  const handleGenerate = async () => {
    if (!inputValue.trim()) return;
    
    setIsGenerating(true);
    setEnhancedPrompt('');
    
    try {
      const result = await elaboratePrompt(inputValue, config.targetModel, config.tone);
      setEnhancedPrompt(result);
      
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        original: inputValue,
        enhanced: result,
        model: config.targetModel,
        timestamp: Date.now(),
      };
      
      setHistory(prev => [newItem, ...prev]);
    } catch (error) {
      setEnhancedPrompt('Error: Could not generate prompt. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('promptForgeHistory');
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setInputValue(item.original);
    setEnhancedPrompt(item.enhanced);
    setConfig(prev => ({ ...prev, targetModel: item.model }));
    setIsHistoryOpen(false); // Close sidebar on mobile/desktop after selection for cleaner view
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-200 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl opacity-50"></div>
         <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Mobile Overlay for Sidebar */}
      {isHistoryOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsHistoryOpen(false)}
        />
      )}

      {/* History Sidebar */}
      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelect={handleSelectHistory}
        onClear={clearHistory}
      />

      {/* Main Content */}
      <main className={`flex-1 flex flex-col h-screen transition-all duration-300 ${isHistoryOpen ? 'md:ml-80' : ''} z-10`}>
        
        {/* Navbar */}
        <header className="flex items-center justify-between p-4 md:px-8 border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
           <div className="flex items-center space-x-3">
             <button 
               onClick={() => setIsHistoryOpen(!isHistoryOpen)}
               className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
             >
               <Menu size={20} />
             </button>
             <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-br from-indigo-500 to-emerald-500 p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
                   <Zap size={20} className="text-white fill-current" />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  PromptForge
                </h1>
             </div>
           </div>
           
           <div className="hidden md:flex items-center text-xs text-slate-500 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
             <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
             v1.0.0 • Powered by Gemini
           </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
           <div className="max-w-5xl mx-auto h-full flex flex-col md:flex-row gap-6">
              
              {/* Left Column: Input & Config */}
              <div className="flex-1 flex flex-col space-y-6">
                 
                 {/* Input Card */}
                 <div className="glass-panel rounded-2xl p-5 flex flex-col flex-grow shadow-2xl shadow-black/20">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-semibold text-slate-300 flex items-center">
                        <Wand2 size={16} className="mr-2 text-indigo-400" />
                        Quick Idea
                      </label>
                      <span className="text-xs text-slate-500">{inputValue.length} chars</span>
                    </div>
                    
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="e.g. A cyberpunk cat playing piano in neon rain..."
                      className="w-full flex-grow bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent resize-none transition-all duration-300"
                    />

                    {/* Quick Config Bar */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                       <div className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-500 ml-1">Model</label>
                          <div className="relative">
                            <select
                              value={config.targetModel}
                              onChange={(e) => setConfig({ ...config, targetModel: e.target.value as TargetModel })}
                              className="w-full appearance-none bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 text-sm rounded-lg p-2.5 pr-8 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none transition-all cursor-pointer"
                            >
                              {MODEL_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                            <Settings size={14} className="absolute right-3 top-3 text-slate-500 pointer-events-none" />
                          </div>
                       </div>
                       
                       <div className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-500 ml-1">Tone</label>
                          <select
                            value={config.tone}
                            onChange={(e) => setConfig({ ...config, tone: e.target.value as Tone })}
                            className="w-full bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none transition-all cursor-pointer"
                          >
                            {TONE_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                       </div>
                    </div>

                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating || !inputValue.trim()}
                      className="mt-6 w-full group relative flex items-center justify-center py-3.5 px-6 rounded-xl text-white font-medium transition-all duration-200 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 group-hover:from-indigo-500 group-hover:to-violet-500 transition-all duration-200"></div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-400/20 to-transparent skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                      
                      <span className="relative flex items-center">
                        {isGenerating ? 'Forging...' : 'Forge Prompt'}
                        {!isGenerating && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                      </span>
                    </button>
                 </div>
              </div>

              {/* Right Column: Output */}
              <div className="flex-1 flex flex-col h-[500px] md:h-auto">
                 <div className="glass-panel rounded-2xl p-1 flex-grow shadow-2xl shadow-black/20 overflow-hidden">
                    <PromptDisplay 
                      prompt={enhancedPrompt} 
                      isGenerating={isGenerating} 
                    />
                 </div>
              </div>

           </div>
        </div>
      </main>
    </div>
  );
}

export default App;