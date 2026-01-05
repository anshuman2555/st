
import React, { useState, useRef, useEffect } from 'react';

interface HomeProps {
  onEnquirySubmit: (phone: string) => void;
  onLoginClick: () => void;
  highlight?: boolean;
  onHighlightComplete?: () => void;
}

const Home: React.FC<HomeProps> = ({ onEnquirySubmit, onLoginClick, highlight, onHighlightComplete }) => {
  const [formData, setFormData] = useState({
    campus: 'Patna Main Campus',
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    city: '',
    course: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (highlight) {
      const timer = setTimeout(() => {
        if (onHighlightComplete) onHighlightComplete();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [highlight, onHighlightComplete]);

  const formatDob = (value: string) => {
    const v = value.replace(/\D/g, '').slice(0, 8);
    if (v.length >= 5) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    } else if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    return v;
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDob(e.target.value);
    setFormData({ ...formData, dob: formatted });
  };

  const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (!date) return;
    const [y, m, d] = date.split('-');
    setFormData({ ...formData, dob: `${d}/${m}/${y}` });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onEnquirySubmit(formData.phone);
    }, 1000);
  };

  return (
    <div className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#002147] via-[#002147]/80 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1523050853064-8504f2f40055?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Campus" 
          className="w-full h-full object-cover scale-105"
        />
      </div>

      {/* Horizontal Marquee Ticker */}
      <div className="absolute top-20 lg:top-24 left-0 w-full z-30 bg-amber-500/10 backdrop-blur-md border-y border-white/5 py-2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="flex items-center gap-8 px-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-amber-500 font-black text-[10px] sm:text-xs uppercase tracking-[0.2em]">Session 2026-27 Enrollment Open</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                <span className="text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest">Admissions Open for BCA & BBA</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-8 lg:pb-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        {/* Content */}
        <div className="text-white space-y-6 lg:space-y-8 animate-fadeIn">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold leading-tight drop-shadow-2xl">
            Shape Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Future at ST. GEORGIA BUSINESS ACADEMY</span>
          </h1>
          <p className="text-base lg:text-xl text-slate-300 max-w-xl leading-relaxed font-light">
            Empowering the next generation of business leaders and IT innovators through rigorous academic standards and industry-first training in Patna.
          </p>
          
          <div className="flex items-center gap-4 py-2 border-y border-white/5 max-w-max">
             <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 border border-amber-500/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
             </div>
             <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Reach Us Directly</span>
                <a href="mailto:admissions@stgeorgiabusinessacademy.in" className="text-sm font-bold text-white hover:text-amber-500 transition-colors">admissions@stgeorgiabusinessacademy.in</a>
             </div>
          </div>

          <div className="flex flex-wrap gap-6 lg:gap-8 pt-2">
            <div className="flex flex-col">
              <span className="text-2xl lg:text-3xl font-serif font-bold text-amber-500">100%</span>
              <span className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Placement Assist</span>
            </div>
            <div className="w-px h-10 lg:h-12 bg-white/10 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-2xl lg:text-3xl font-serif font-bold text-amber-500">A+</span>
              <span className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Industry Rating</span>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div id="admission-form-section" className="flex flex-col items-center scroll-mt-32">
          {/* Guidance Badge - Shows when redirected from "Create Account" or "Enroll Now" */}
          <div className={`mb-6 transition-all duration-700 transform ${highlight ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'}`}>
             <div className="bg-amber-500 text-[#002147] px-6 py-2.5 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-black text-xs uppercase tracking-widest">Fill this form to create your account</span>
             </div>
          </div>

          <div className="text-center mb-4 lg:mb-6 text-white drop-shadow-lg">
            <h2 className="text-xl md:text-3xl font-bold tracking-tight uppercase">SGBA ADMISSION FORM 2026</h2>
            <p className="text-[10px] md:text-sm font-bold mt-1 tracking-wider opacity-90 uppercase">APPLY FOR BCA & BBA PROFESSIONAL COURSES</p>
          </div>

          <div className={`bg-white rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden w-full max-w-[550px] transition-all duration-700 ${highlight ? 'animate-pulse-amber ring-4 ring-amber-500 border-transparent' : 'border-white'}`}>
            <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-3 lg:space-y-4">
              <div className="relative">
                <select 
                  className="w-full bg-white px-4 py-2.5 lg:py-3 rounded border border-slate-200 text-slate-400 text-xs focus:outline-none appearance-none"
                  value={formData.campus}
                  onChange={e => setFormData({...formData, campus: e.target.value})}
                >
                  <option>SELECT CAMPUS</option>
                  <option value="Patna Main Campus">Patna Main Campus</option>
                  <option value="Online Wing">Online Wing</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input 
                  required
                  type="text" 
                  placeholder="STUDENT NAME"
                  className="w-full bg-white px-3 py-2.5 lg:py-3 rounded border border-slate-200 text-slate-600 text-[10px] sm:text-xs focus:outline-none placeholder:text-slate-400 truncate"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
                <input 
                  required
                  type="email" 
                  placeholder="STUDENT EMAIL ID"
                  className="w-full bg-white px-3 py-2.5 lg:py-3 rounded border border-slate-200 text-slate-600 text-[10px] sm:text-xs focus:outline-none placeholder:text-slate-400 truncate"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="flex border border-slate-200 rounded overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-2.5 lg:py-3 border-r border-slate-200 bg-white text-slate-400 text-xs shrink-0">
                  <span>+91</span>
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                </div>
                <input 
                  required
                  type="tel" 
                  placeholder="STUDENT MOBILE NO"
                  className="w-full bg-white px-4 py-2.5 lg:py-3 text-slate-600 text-xs focus:outline-none placeholder:text-slate-400"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative group">
                  <input 
                    required
                    type="text" 
                    placeholder="DOB (DD/MM/YYYY)"
                    className="w-full bg-white px-3 pr-10 py-2.5 lg:py-3 rounded border border-slate-200 text-slate-600 text-[10px] sm:text-xs focus:outline-none placeholder:text-slate-400"
                    value={formData.dob}
                    onChange={handleDobChange}
                  />
                  <button 
                    type="button"
                    onClick={() => dateInputRef.current?.showPicker()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-amber-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <input 
                    ref={dateInputRef}
                    type="date"
                    className="absolute inset-0 opacity-0 pointer-events-none"
                    onChange={handleDatePickerChange}
                  />
                </div>
                <div className="relative">
                  <select 
                    required
                    className="w-full bg-white px-3 py-2.5 lg:py-3 rounded border border-slate-200 text-slate-400 text-[10px] sm:text-xs focus:outline-none appearance-none"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  >
                    <option value="">STUDENT CITY</option>
                    <option value="Patna">Patna</option>
                    <option value="Gaya">Gaya</option>
                    <option value="Others">Others</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="relative">
                <select 
                  required
                  className="w-full bg-white px-4 py-2.5 lg:py-3 rounded border border-slate-200 text-slate-400 text-xs focus:outline-none appearance-none"
                  value={formData.course}
                  onChange={e => setFormData({...formData, course: e.target.value})}
                >
                  <option value="">SELECT PROGRAM</option>
                  <option value="BCA">BCA (Software)</option>
                  <option value="BBA">BBA (Management)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              <p className="text-[9px] lg:text-[10px] text-slate-400 text-center leading-relaxed py-1">
                By submitting this form, I agree to receive notifications via SMS/E-mail/Call.
              </p>

              <div className="flex flex-col items-center md:items-end gap-3 lg:gap-5 pt-1">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-[#c4161c] hover:bg-[#a31217] text-white px-8 py-2.5 lg:py-3 rounded font-bold text-sm lg:text-base transition-all shadow-lg active:scale-95 uppercase"
                >
                  {isSubmitting ? 'WORKING...' : 'APPLY NOW'}
                </button>
                <div className="text-[10px] lg:text-xs font-medium text-slate-700">
                  Already Registered? <button type="button" onClick={onLoginClick} className="text-[#c4161c] hover:underline font-bold">Click to Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
