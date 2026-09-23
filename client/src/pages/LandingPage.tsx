import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen, PenTool, Layers, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { enableGuestMode } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-charcoal-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden kolam-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 text-gold-500" /> Aurex’26 Hackathon Track 04 — Learning Portal
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
            <span className="font-tamil text-brand-600 dark:text-brand-400 block mb-2 text-5xl sm:text-7xl">
              தமிழ்ச்சோலை
            </span>
            <span className="text-slate-900 dark:text-white">From your first letter to your first Tamil book.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            A structured, interactive learning journey guiding complete beginners step-by-step from letter recognition to independently reading authentic Tamil literature.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/onboarding"
              className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/25 transition-all text-lg flex items-center justify-center gap-2"
            >
              Start Learning Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/learn"
              onClick={enableGuestMode}
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-charcoal-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold rounded-2xl shadow-md transition-all text-lg flex items-center justify-center gap-2"
            >
              Explore Guest Journey
            </Link>
          </div>

          {/* Hero Visual Transformation Progression Flow */}
          <div className="bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl max-w-4xl mx-auto">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
              The Progression Narrative
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center items-center">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="font-tamil text-4xl font-bold text-brand-600 dark:text-brand-400 block mb-1">அ</span>
                <span className="text-xs font-semibold text-slate-500">1. Letters</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="font-tamil text-2xl font-bold text-slate-800 dark:text-white block mb-1">அம்மா</span>
                <span className="text-xs font-semibold text-slate-500">2. Words</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="font-tamil text-base font-bold text-slate-800 dark:text-white block mb-1">நான் தமிழ் கற்கிறேன்.</span>
                <span className="text-xs font-semibold text-slate-500">3. Sentences</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="font-tamil text-sm font-bold text-slate-800 dark:text-white block mb-1">திருக்குறள்</span>
                <span className="text-xs font-semibold text-slate-500">4. Classical</span>
              </div>
              <div className="p-4 bg-brand-500 text-white rounded-2xl shadow-lg shadow-brand-500/30 col-span-2 md:col-span-1">
                <span className="font-tamil text-xl font-bold block mb-1">நூல்கள்</span>
                <span className="text-xs font-medium text-brand-100">5. Books</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white dark:bg-charcoal-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Learning Tamil shouldn't feel disconnected.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Beginners often drop off because available resources fragment letter recognition, stroke practice, and authentic literature into isolated tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-50 dark:bg-charcoal-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 flex items-center justify-center font-bold text-xl mb-4">
                01
              </div>
              <h3 className="text-xl font-bold mb-2">Disconnected Resources</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Relying on flashcards without structural transition leaves learners unable to form full sentences or read continuous text.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-charcoal-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center font-bold text-xl mb-4">
                02
              </div>
              <h3 className="text-xl font-bold mb-2">Writing Practice Gap</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Lack of tactile stroke feedback prevents learners from mastering complex Tamil glyph geometries.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-charcoal-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center font-bold text-xl mb-4">
                03
              </div>
              <h3 className="text-xl font-bold mb-2">Literature Gap</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                No direct bridge exists between basic grammar lessons and engaging with classical masterpieces like Thirukkural or Avvaiyar.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 font-bold text-brand-600 dark:text-brand-400 text-xl bg-brand-50 dark:bg-brand-950/50 px-6 py-3 rounded-2xl border border-brand-200 dark:border-brand-800">
              <CheckCircle2 className="w-6 h-6" /> Tamizh Cholai connects the complete journey.
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators & Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">Product Capabilities</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Designed for hackathon excellence with zero static placeholders and complete full-stack backend synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white dark:bg-charcoal-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <BookOpen className="w-8 h-8 text-brand-600 mb-3" />
            <h4 className="font-bold text-lg mb-1">8 Milestone Stages</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Progressive server-enforced unlock rules based on real mastery.</p>
          </div>
          <div className="p-6 bg-white dark:bg-charcoal-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <PenTool className="w-8 h-8 text-brand-600 mb-3" />
            <h4 className="font-bold text-lg mb-1">Canvas Writing Studio</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Interactive stroke drawing on HTML Canvas with guide lines.</p>
          </div>
          <div className="p-6 bg-white dark:bg-charcoal-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <Layers className="w-8 h-8 text-brand-600 mb-3" />
            <h4 className="font-bold text-lg mb-1">Morphological Builder</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Construct words and tokens with real-time feedback & pronunciation.</p>
          </div>
          <div className="p-6 bg-white dark:bg-charcoal-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-brand-600 mb-3" />
            <h4 className="font-bold text-lg mb-1">Server-Validated Gamification</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Atomic database XP transactions, badge auto-evaluator, and streaks.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
