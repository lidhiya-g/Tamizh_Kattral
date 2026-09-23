import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecommendationCardProps {
  title: string;
  description: string;
  actionUrl: string;
  badgeText?: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  description,
  actionUrl,
  badgeText = 'Recommended Next',
}) => {
  return (
    <div className="bg-gradient-to-r from-brand-600 to-brand-700 dark:from-brand-800 dark:to-brand-950 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden flex flex-col justify-between">
      <div className="relative z-10">
        <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <Compass className="w-3.5 h-3.5" />
          {badgeText}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-brand-100 text-sm mb-6 leading-relaxed max-w-lg">{description}</p>
      </div>

      <div className="relative z-10 flex items-center justify-end">
        <Link
          to={actionUrl}
          className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-brand-50 font-bold px-5 py-2.5 rounded-xl shadow transition-all hover:translate-x-1 text-sm"
        >
          Start Lesson <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
