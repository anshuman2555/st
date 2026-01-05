
import React from 'react';
import { AppView } from '../types';

interface FeaturesProps {
  full?: boolean;
  navigateTo: (view: AppView) => void;
}

const Features: React.FC<FeaturesProps> = ({ full, navigateTo }) => {
  const assets = [
    { title: "Smart Classrooms", desc: "Interactive teaching with high-tech projection systems and ergonomic design." },
    { title: "Advanced IT Labs", desc: "Equipped with latest hardware and 24/7 high-speed fiber connectivity." },
    { title: "Central Library", desc: "Digital & physical repository of 10,000+ academic and business journals." },
    { title: "Placement Cell", desc: "Dedicated training and recruitment assistance with top corporate ties." },
    { title: "Safe Campus", desc: "24/7 surveillance and highly secured hostel facilities for girls." },
    { title: "Skill Workshops", desc: "Regular seminars on Soft Skills, AI, and Entrepreneurship." }
  ];

  return (
    <div className={`${full ? 'pt-32 pb-24 bg-white min-h-screen' : 'py-12 lg:py-20 bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-8 sm:mb-12 gap-6 sm:gap-8 text-center lg:text-left">
          <div className="max-w-2xl space-y-2 sm:space-y-4 mx-auto lg:mx-0">
            <span className="text-amber-600 font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[8px] sm:text-[10px]">Excellence Defined</span>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-serif font-bold text-[#002147]">Institutional Assets</h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm max-w-sm lg:text-right border-l-2 lg:border-l-0 lg:border-r-2 border-amber-500 px-4">
            A world-class infrastructure designed to foster intellectual curiosity and professional discipline in Patna.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {assets.map((asset, idx) => (
            <div 
              key={idx}
              className="group p-4 sm:p-8 border border-slate-100 rounded-2xl sm:rounded-3xl hover:border-amber-500/50 hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-slate-50 flex items-center justify-center mb-3 sm:mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <span className="font-serif font-bold text-sm sm:text-xl">{idx + 1}</span>
              </div>
              <h4 className="text-sm sm:text-xl font-bold text-[#002147] mb-1 sm:mb-3">{asset.title}</h4>
              <p className="text-slate-500 text-[10px] sm:text-sm leading-relaxed">{asset.desc}</p>
            </div>
          ))}
        </div>

        {full && (
          <div className="mt-16 sm:mt-24 bg-[#002147] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
              <div className="text-white max-w-xl space-y-6">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight">Your Professional Journey Begins.</h3>
                <p className="text-slate-300 text-base sm:text-lg">Talk to an academic counselor today or visit our campus for a personalized tour.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full lg:w-auto">
                <button className="bg-amber-500 text-[#002147] px-6 sm:px-12 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg hover:bg-white transition-all shadow-2xl active:scale-95">
                  DOWNLOAD BROCHURE
                </button>
                <button 
                  onClick={() => navigateTo('contact')}
                  className="border-2 border-white/20 text-white px-6 sm:px-12 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg hover:bg-white/10 transition-all active:scale-95"
                >
                  VISIT CAMPUS
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Features;
