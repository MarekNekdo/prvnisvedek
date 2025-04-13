
'use client';
import { useEffect, useState } from 'react';

export default function LightPresence({ mood = 'neutral' }) {
  const [pulseClass, setPulseClass] = useState('');

  useEffect(() => {
    switch (mood) {
      case 'serious':
        setPulseClass('animate-pulse-slow');
        break;
      case 'funny':
        setPulseClass('animate-pulse-fast');
        break;
      default:
        setPulseClass('animate-pulse');
    }
  }, [mood]);

  return (
    <div className={`w-24 h-24 rounded-full bg-yellow-400 shadow-xl mb-6 ${pulseClass}`} />
  );
}
