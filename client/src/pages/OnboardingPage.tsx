import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, CheckCircle2, Sparkles, Clock, Target, Compass } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { enableGuestMode } = useAuth();

  const [step, setStep] = useState(1);
  const [level, setLevel] = useState('Complete Beginner');
  const [goal, setGoal] = useState('Learn Tamil from scratch');
  const [targetMinutes, setTargetMinutes] = useState(15);

  const levels = [
    { title: 'Complete Beginner', desc: 'No prior knowledge of Tamil script or sounds.' },
    { title: 'Know a few letters', desc: 'Familiar with basic vowels or some sounds.' },
    { title: 'Can read basic Tamil', desc: 'Want to build reading speed and sentence comprehension.' },
    { title: 'Want to read literature', desc: 'Aiming for classical texts like Thirukkural and books.' },
  ];

  const goals = [
    'Learn Tamil from scratch',
    'Read Tamil confidently',
    'Understand classical literature',
    'Reconnect with Tamil heritage',
  ];

  const times = [
    { mins: 5, label: '5 mins/day', desc: 'Casual learner' },
    { mins: 10, label: '10 mins/day', desc: 'Regular habit' },
    { mins: 15, label: '15 mins/day', desc: 'Recommended pace' },
    { mins: 20, label: '20+ mins/day', desc: 'Intensive mastery' },
  ];

  const handleFinish = () => {
    enableGuestMode();
    navigate('/learn');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-charcoal-950 flex items-center justify-center p-4 kolam-pattern">
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-xl w-full shadow-2xl relative overflow-hidden">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Step {step} of 4
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? 'w-8 bg-brand-500' : 'w-2 bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/40 text-brand-600 rounded-3xl flex items-center justify-center font-tamil text-4xl font-bold mx-auto mb-4 shadow-lg shadow-brand-500/20">
              த
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              Welcome to Tamizh Cholai
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
              We are excited to guide you on your journey from recognizing your very first letter to independently reading authentic Tamil literature.
            </p>
            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Tamil Level */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-500" /> What is your starting level?
            </h2>
            <p className="text-xs text-slate-500 mb-6">Select the option that best describes your experience.</p>

            <div className="space-y-3 mb-8">
              {levels.map(item => (
                <button
                  key={item.title}
                  onClick={() => setLevel(item.title)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    level === item.title
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-brand-300'
                  }`}
                >
                  <span className="font-bold text-sm text-slate-900 dark:text-white block">{item.title}</span>
                  <span className="text-xs text-slate-500">{item.desc}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 3: Learning Goal */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-500" /> What is your primary learning goal?
            </h2>
            <p className="text-xs text-slate-500 mb-6">We will personalize your recommended learning path.</p>

            <div className="space-y-3 mb-8">
              {goals.map(g => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`w-full p-4 rounded-2xl border text-left font-bold text-sm transition-all ${
                    goal === g
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-brand-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(4)}
              className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 4: Daily Learning Time */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-500" /> Set your daily learning target
            </h2>
            <p className="text-xs text-slate-500 mb-6">Consistency is key to mastering script and literature.</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {times.map(t => (
                <button
                  key={t.mins}
                  onClick={() => setTargetMinutes(t.mins)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    targetMinutes === t.mins
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-brand-300'
                  }`}
                >
                  <span className="font-extrabold text-base text-slate-900 dark:text-white block">{t.label}</span>
                  <span className="text-xs text-slate-500">{t.desc}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
            >
              Enter Learning Portal <Sparkles className="w-4 h-4 text-gold-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
