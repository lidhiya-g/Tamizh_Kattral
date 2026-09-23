import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface AudioButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text, className = '', size = 'md' }) => {
  const { speak, isPlaying, stop } = useAudio();

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stop();
    } else {
      speak(text);
    }
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const btnClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base',
  };

  return (
    <button
      onClick={handleAudio}
      title="Listen Pronunciation"
      aria-label="Listen Pronunciation"
      className={`inline-flex items-center justify-center rounded-full bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-400 font-medium transition-colors ${btnClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <VolumeX className={`${iconSizes[size]} animate-pulse`} />
      ) : (
        <Volume2 className={iconSizes[size]} />
      )}
    </button>
  );
};
