
import React from 'react';
import { AppView } from '../types';

interface AboutProps {
  preview?: boolean;
  navigateTo: (view: AppView) => void;
}

const About: React.FC<AboutProps> = ({ preview, navigateTo }) => {
  return (
    <div className={`${preview ? 'py-12 lg:py-20 bg-white' : 'pt-32 pb-24 bg-white min-h-screen'}`}>
      {!preview && (
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center lg:text-left">
          <span className="text-amber-600 font-bold uppercase tracking-[0.4em] text-xs">Our Institution</span>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-[#002147] mt-4">Legacy & Vision</h1>
          <p className="text-slate-500 text-lg mt-6 max-w-2xl leading-relaxed">
            Founded with the mission to produce ethically responsible and globally competitive business and technology professionals.
          </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50" />
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/800/1000?university" 
              alt="Campus Architecture" 
              className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-amber-600 font-bold uppercase tracking-[0.3em] text-xs">Pioneering Education</span>
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-[#002147] leading-tight">
              Nurturing Future Leaders in <br />
              <span className="text-amber-500">Patna, Bihar</span>
            </h2>
          </div>
          
          <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-amber-500 pl-6">
            "Our academy is a launchpad for successful careers, built on values of discipline and industry-relevant methodology."
          </p>

          <p className="text-slate-600 leading-relaxed">
            St. Georgia Business Academy offers state-of-the-art infrastructure combined with an academic curriculum that is aligned with current industry standards. We believe in learning by doing.
          </p>

          <div className="grid grid-cols-2 gap-8 pt-4">
            <div>
              <h4 className="font-bold text-[#002147] mb-2 text-xl">UGC Recognized</h4>
              <p className="text-sm text-slate-500">Curriculum aligned with leading university guidelines.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#002147] mb-2 text-xl">Global Network</h4>
              <p className="text-sm text-slate-500">Access to a vast network of alumni and corporate partners.</p>
            </div>
          </div>

          {preview && (
            <button 
              onClick={() => navigateTo('about')}
              className="inline-flex items-center gap-2 text-[#002147] font-bold group border-b-2 border-amber-500 pb-1 hover:border-[#002147] transition-all"
            >
              EXPLORE OUR LEGACY
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
