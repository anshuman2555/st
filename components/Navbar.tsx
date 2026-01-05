
import React, { useState, useEffect, useRef } from 'react';
import { AppView } from '../types';

interface NavbarProps {
  scrolled: boolean;
  navigateTo: (view: AppView) => void;
  currentView: AppView;
  isLoggedIn: boolean;
  userName?: string;
  openLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, navigateTo, currentView, isLoggedIn, userName, openLogin }) => {
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const navItems: { name: string; view: AppView }[] = [
    { name: 'Home', view: 'home' },
    { name: 'About', view: 'about' },
    { name: 'Courses', view: 'courses' },
    { name: 'Features', view: 'features' },
    { name: 'Contact', view: 'contact' },
  ];

  const isLight = scrolled || currentView !== 'home';

  // Update slider position based on active item
  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.view === currentView);
    const activeElement = itemsRef.current[activeIndex];
    
    if (activeElement && navRef.current) {
      const { offsetLeft, offsetWidth } = activeElement;
      setSliderStyle({
        left: offsetLeft,
        width: offsetWidth,
        opacity: 1
      });

      // On mobile, scroll the active item into view if it's clipped
      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    } else {
      setSliderStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [currentView]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${
      isLight ? 'bg-white/95 backdrop-blur-md shadow-2xl py-2 sm:py-3 border-b border-slate-100' : 'bg-transparent py-4 sm:py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center gap-2 lg:gap-8">
          
          {/* Brand - Scaled for mobility */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex flex-col group cursor-pointer shrink-0 min-w-0 pr-2 lg:pr-6"
          >
            <span className={`font-serif font-black text-xs sm:text-lg lg:text-2xl leading-none transition-colors ${
              isLight ? 'text-[#002147]' : 'text-white'
            }`}>
              ST. GEORGIA <span className="text-amber-500">BUSINESS</span> <span className="hidden md:inline">ACADEMY</span>
            </span>
            <span className={`text-[6px] sm:text-[9px] tracking-[0.3em] font-bold uppercase mt-1 transition-colors ${
              isLight ? 'text-amber-600' : 'text-amber-400/80'
            }`}>
              Patna Campus
            </span>
          </div>

          {/* Sliding Navigation Slider */}
          <nav 
            ref={navRef}
            className="relative flex items-center overflow-x-auto no-scrollbar scroll-smooth px-1 py-1 bg-black/5 lg:bg-transparent rounded-full max-w-full lg:max-w-none"
          >
            {/* The sliding background pill */}
            <div 
              className="absolute h-[80%] sm:h-full top-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-0"
              style={{
                left: `${sliderStyle.left}px`,
                width: `${sliderStyle.width}px`,
                opacity: sliderStyle.opacity,
                backgroundColor: isLight ? '#002147' : '#F59E0B'
              }}
            />

            <div className="flex items-center gap-1 sm:gap-2 relative z-10">
              {navItems.map((item, idx) => (
                <button
                  key={item.view}
                  ref={el => itemsRef.current[idx] = el}
                  onClick={() => navigateTo(item.view)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-[9px] sm:text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 whitespace-nowrap ${
                    currentView === item.view 
                      ? (isLight ? 'text-white' : 'text-[#002147]') 
                      : (isLight ? 'text-slate-600 hover:text-[#002147]' : 'text-white/70 hover:text-white')
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {isLoggedIn ? (
              <div 
                onClick={() => navigateTo('dashboard')}
                className={`flex items-center gap-2 sm:gap-3 cursor-pointer group p-1 sm:p-1.5 sm:pr-5 rounded-xl sm:rounded-2xl transition-all border shadow-sm ${
                  isLight ? 'bg-slate-100/50 border-slate-100 hover:border-amber-200' : 'bg-white/10 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="w-7 h-7 sm:w-10 sm:h-10 bg-amber-500 rounded-lg sm:rounded-xl flex items-center justify-center text-[#002147] font-bold shadow-lg group-hover:scale-105 transition-all text-[10px] sm:text-base">
                  {userName?.charAt(0) || 'S'}
                </div>
                <div className="hidden lg:flex flex-col">
                  <span className={`text-[8px] font-bold uppercase tracking-widest ${isLight ? 'text-slate-400' : 'text-white/50'}`}>Student</span>
                  <span className={`text-xs font-bold ${isLight ? 'text-[#002147]' : 'text-white'}`}>{userName?.split(' ')[0] || 'User'}</span>
                </div>
              </div>
            ) : (
              <button 
                onClick={openLogin}
                className={`px-4 lg:px-8 py-2.5 rounded-full text-[9px] sm:text-[11px] font-bold uppercase tracking-widest transition-all border ${
                  isLight 
                    ? 'border-[#002147]/10 text-[#002147] hover:bg-[#002147] hover:text-white shadow-sm' 
                    : 'border-white/20 text-white hover:bg-white hover:text-[#002147]'
                }`}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
