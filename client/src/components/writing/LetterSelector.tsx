import React, { useState } from 'react';
import { Search, Grid, Filter } from 'lucide-react';
import { TamilLetterMeta, TAMIL_VOWELS, TAMIL_CONSONANTS, ALL_TAMIL_LETTERS } from '../../data/tamilLetters';
import { LetterCard } from './LetterCard';

interface LetterSelectorProps {
  onSelectLetter: (letter: TamilLetterMeta) => void;
  selectedLetter: TamilLetterMeta | null;
  getStatus: (char: string) => 'Not started' | 'In progress' | 'Completed';
}

export const LetterSelector: React.FC<LetterSelectorProps> = ({
  onSelectLetter,
  selectedLetter,
  getStatus,
}) => {
  const [category, setCategory] = useState<'ALL' | 'VOWEL' | 'CONSONANT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const lettersPool = category === 'VOWEL' ? TAMIL_VOWELS : category === 'CONSONANT' ? TAMIL_CONSONANTS : ALL_TAMIL_LETTERS;

  const filteredLetters = lettersPool.filter(l => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return l.character.includes(q) || l.transliteration.toLowerCase().includes(q) || l.exampleMeaning.toLowerCase().includes(q);
  });

  return (
    <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
      {/* Title & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Choose a letter to practice</h2>
          <p className="text-xs text-slate-500">Select any Vowel (உயிர்) or Consonant (மெய்) to launch guided stroke practice.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl shrink-0 self-start">
          {[
            { key: 'ALL', label: 'All Letters' },
            { key: 'VOWEL', label: 'Vowels (உயிர்)' },
            { key: 'CONSONANT', label: 'Consonants (மெய்)' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setCategory(tab.key as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                category === tab.key
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search Tamil letter (e.g. அ or a)..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
        />
      </div>

      {/* Grid of Letter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-[380px] overflow-y-auto pr-1">
        {filteredLetters.length === 0 ? (
          <div className="col-span-full py-8 text-center text-xs text-slate-400 italic">
            No matching Tamil letter found for "{searchQuery}".
          </div>
        ) : (
          filteredLetters.map(letter => (
            <LetterCard
              key={letter.id}
              letter={letter}
              status={getStatus(letter.character)}
              isSelected={selectedLetter?.character === letter.character}
              onClick={() => onSelectLetter(letter)}
            />
          ))
        )}
      </div>
    </div>
  );
};
