import React from 'react';
import { History, Trash2, Copy, X, ChevronRight } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  isOpen,
  onClose,
  history,
  onSelect,
  onClear,
}) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-80 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-indigo-400">
            <History size={20} />
            <h2 className="font-semibold text-lg">History</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded-md transition-colors text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center text-slate-500 mt-10">
              <p>No history yet.</p>
              <p className="text-sm mt-2">Generate prompts to see them here.</p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className="group p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/30 rounded-lg cursor-pointer transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-medium text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-950/30 border border-indigo-900/50">
                    {item.model}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-slate-300 line-clamp-2 font-medium mb-1">
                  {item.original}
                </p>
                <div className="flex items-center text-xs text-slate-500 group-hover:text-indigo-400 transition-colors">
                  <span>View Details</span>
                  <ChevronRight size={12} className="ml-1" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-800">
            <button
              onClick={onClear}
              className="flex items-center justify-center w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors border border-transparent hover:border-red-900/50"
            >
              <Trash2 size={16} className="mr-2" />
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};