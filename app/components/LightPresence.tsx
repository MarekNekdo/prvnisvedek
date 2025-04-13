'use client';

import { useEffect, useState } from 'react';

export default function LightPresence() {
  const [answer, setAnswer] = useState('');
  const [pulseClass, setPulseClass] = useState('animate-pulse-slow');

  useEffect(() => {
    const interval = setInterval(() => {
      const chatBox = document.querySelector('[data-answer-box]');
      if (chatBox) {
        const content = chatBox.textContent || '';
        if (content !== answer) {
          setAnswer(content);

          const lower = content.toLowerCase();
          if (
            lower.includes('haha') ||
            lower.includes('směšné') ||
            lower.includes('vtip') ||
            lower.includes('sranda') ||
            lower.includes('lol')
          ) {
            setPulseClass('animate-pulse-fast');
          } else {
            setPulseClass('animate-pulse-slow');
          }
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [answer]);

  return (
    <div className={`w-10 h-10 mb-4 rounded-full bg-white blur-lg opacity-70 ${pulseClass}`} />
  );
}
