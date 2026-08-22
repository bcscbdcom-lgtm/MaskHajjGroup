import React from 'react';
import { Layers, X, ArrowRight, Trash2 } from 'lucide-react';
import { Language, PackageItem } from '../types';

interface PackageCompareBarProps {
  selectedPackages: PackageItem[];
  lang: Language;
  onOpenCompare: () => void;
  onRemovePackage: (pkgId: string) => void;
  onClearAll: () => void;
}

export const PackageCompareBar: React.FC<PackageCompareBarProps> = ({
  selectedPackages,
  lang,
  onOpenCompare,
  onRemovePackage,
  onClearAll,
}) => {
  if (selectedPackages.length === 0) return null;

  return (
    <aside
      aria-label={lang === 'en' ? 'Package comparison toolbar' : 'প্যাকেজ তুলনা টুলবার'}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl bg-slate-900/95 dark:bg-slate-850/95 backdrop-blur-md text-white rounded-3xl p-3 sm:p-4 shadow-2xl border border-slate-700/80 animate-slide-up flex flex-col sm:flex-row items-center justify-between gap-3.5"
    >
      <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
        <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-xs">
          <Layers className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-white">
              {lang === 'en' ? 'Package Comparison' : 'প্যাকেজ তুলনা'}
            </span>
            <span className="bg-blue-500/30 text-blue-300 text-[11px] font-extrabold px-2 py-0.5 rounded-full border border-blue-400/30">
              {selectedPackages.length}/4
            </span>
          </div>

          {/* Selected package chips */}
          <div className="flex items-center gap-1.5 mt-1 overflow-x-auto no-scrollbar py-0.5">
            {selectedPackages.map((pkg) => (
              <span
                key={pkg.id}
                className="inline-flex items-center gap-1 text-[11px] font-bold bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-xl flex-shrink-0"
              >
                <span className="truncate max-w-[120px]">
                  {lang === 'en' ? pkg.nameEn : pkg.nameBn}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemovePackage(pkg.id);
                  }}
                  className="hover:text-rose-400 text-slate-400 p-0.5 cursor-pointer"
                  title="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-shrink-0">
        <button
          onClick={onClearAll}
          className="text-xs font-semibold text-slate-400 hover:text-rose-400 px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{lang === 'en' ? 'Clear' : 'মুছুন'}</span>
        </button>

        <button
          onClick={onOpenCompare}
          className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold px-5 py-2.5 rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer hover:shadow-blue-500/25"
        >
          <span>
            {lang === 'en'
              ? `Compare (${selectedPackages.length})`
              : `তুলনা দেখুন (${selectedPackages.length})`}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
