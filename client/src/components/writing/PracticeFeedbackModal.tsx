import React from 'react';
import { CheckCircle2, RefreshCw, Eye, ArrowRight, X } from 'lucide-react';
import { ValidationResult } from '../../utils/writingDirectionValidator';
import { useLanguage } from '../../context/LanguageContext';

interface PracticeFeedbackModalProps {
  validationResult: ValidationResult | null;
  onClose: () => void;
  onTryAgain: () => void;
  onShowGuide: () => void;
  onContinue: () => void;
}

export const PracticeFeedbackModal: React.FC<PracticeFeedbackModalProps> = ({
  validationResult,
  onClose,
  onTryAgain,
  onShowGuide,
  onContinue,
}) => {
  const { t } = useLanguage();

  if (!validationResult) return null;

  const isGood = validationResult.result === 'good';
  const isRetry = validationResult.result === 'retry';
  const isInsufficient = validationResult.result === 'insufficient_data';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl transition-all scale-in-95 duration-200 ${
          isGood
            ? 'bg-white dark:bg-charcoal-900 border-emerald-500/40'
            : isRetry
            ? 'bg-white dark:bg-charcoal-900 border-amber-500/40'
            : 'bg-white dark:bg-charcoal-900 border-slate-300 dark:border-slate-700'
        }`}
      >
        {/* Header Icon & Close Button */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {isGood && (
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>
            )}
            {isRetry && (
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
                <RefreshCw className="w-6 h-6" />
              </div>
            )}
            {isInsufficient && (
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shadow-inner">
                <RefreshCw className="w-6 h-6" />
              </div>
            )}

            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {isGood ? t('writing.goodJob') : isRetry ? `${t('writing.tryAgain')} ↻` : t('common.tryAgainButton')}
              </h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Direction Feedback
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Content */}
        <div className="mb-6 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
          {validationResult.message}
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center gap-3">
          {isGood ? (
            <button
              onClick={onContinue}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{t('common.continue')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <button
                onClick={onTryAgain}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t('common.tryAgainButton')}</span>
              </button>

              <button
                onClick={onShowGuide}
                className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye className="w-4 h-4 text-amber-500" />
                <span>{t('writing.showGuide')}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
