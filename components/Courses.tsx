
import React from 'react';
import { AppView } from '../types';

interface CoursesProps {
  full?: boolean;
  navigateTo: (view: AppView) => void;
  onEnrollClick?: () => void;
}

const Courses: React.FC<CoursesProps> = ({ full, navigateTo, onEnrollClick }) => {
  const programs = [
    {
      code: 'BCA',
      name: 'BCA Program',
      fullName: 'Bachelor of Computer Applications',
      icon: (
        <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      desc: 'Master software dev, networking, and IT.',
      duration: '3 Years / 6 Semesters',
      color: 'from-blue-600 to-blue-800'
    },
    {
      code: 'BBA',
      name: 'BBA Program',
      fullName: 'Bachelor of Business Administration',
      icon: (
        <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      desc: 'Develop corporate & leadership excellence.',
      duration: '3 Years / 6 Semesters',
      color: 'from-amber-500 to-amber-700'
    }
  ];

  return (
    <div className={`${full ? 'pt-32 pb-24 bg-slate-50 min-h-screen' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-20 space-y-2 sm:space-y-4">
          <span className="text-amber-600 font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[8px] sm:text-[10px]">Academic Portfolio</span>
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-serif font-bold text-[#002147]">Degree Programs</h2>
          <div className="w-12 sm:w-24 h-1 sm:h-1.5 bg-amber-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-12 max-w-5xl mx-auto">
          {programs.map(program => (
            <div 
              key={program.code}
              className="group relative bg-white rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-12 shadow-md sm:shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col items-center text-center overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -mr-10 -mt-10 sm:-mr-16 sm:-mt-16 rounded-full`} />
              
              <div className={`w-10 h-10 sm:w-20 sm:h-20 rounded-lg sm:rounded-2xl bg-gradient-to-br ${program.color} text-white flex items-center justify-center mb-4 sm:mb-8 shadow-lg transform group-hover:rotate-6 transition-transform`}>
                {program.icon}
              </div>

              <span className="text-amber-600 font-bold text-xl sm:text-5xl mb-1 sm:mb-2 font-serif opacity-30">{program.code}</span>
              <h3 className="text-sm sm:text-2xl font-bold text-[#002147] mb-2 sm:mb-4">{program.name}</h3>
              <p className="hidden sm:block text-slate-500 mb-8 leading-relaxed text-sm">{program.desc}</p>
              
              <div className="w-full bg-slate-50 rounded-lg sm:rounded-2xl p-2 sm:p-4 flex justify-center items-center gap-1 sm:gap-2 mb-4 sm:mb-8 border border-slate-100">
                <svg className="w-3 h-3 sm:w-5 sm:h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[8px] sm:text-sm font-bold text-[#002147] uppercase tracking-wider">{program.duration}</span>
              </div>

              <button 
                onClick={onEnrollClick}
                className={`w-full py-2.5 sm:py-4 rounded-lg sm:rounded-2xl text-white font-bold text-[10px] sm:text-base bg-gradient-to-r ${program.color} shadow-lg transition-all transform hover:scale-105 active:scale-95 uppercase`}
              >
                ENROLL NOW
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
