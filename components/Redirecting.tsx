
import React, { useEffect } from 'react';

interface RedirectingProps {
  onComplete: () => void;
}

const Redirecting: React.FC<RedirectingProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="pattern-hex" x="0" y="0" width="40" height="69.28" patternUnits="userSpaceOnUse" viewBox="0 0 40 69.28">
            <path d="M0 34.64L20 0l20 34.64-20 34.64z" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern-hex)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-6">
        {/* Animated 5-Dot Loader */}
        <div className="flex gap-3 mb-12">
          {[
            'bg-orange-500',
            'bg-orange-600',
            'bg-red-500',
            'bg-pink-500',
            'bg-pink-600'
          ].map((color, i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full ${color} animate-bounce shadow-lg`} 
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight">
          Thank you for submitting your details, Please wait..
        </h1>
        
        <p className="text-slate-500 text-lg md:text-xl font-medium mb-2">
          You will be redirected to our registration page in less than a minute.
        </p>
        
        <p className="text-slate-900 text-lg font-black uppercase tracking-widest">
          PLEASE DON'T REFRESH THIS PAGE
        </p>
      </div>
    </div>
  );
};

export default Redirecting;
