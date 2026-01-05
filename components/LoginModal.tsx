
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
  onSignUpClick: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccess, onSignUpClick }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [form, setForm] = useState({ fullName: '', mobile: '', otp: '' });

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = () => {
    if (form.mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      setTimer(30);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isOtpSent) {
      handleSendOtp();
      return;
    }

    if (form.otp.length !== 5) {
      alert("Please enter a 5-digit OTP.");
      return;
    }

    setIsLoading(true);
    // Simulate auth verification
    setTimeout(() => {
      setIsLoading(false);
      // Determine user role based on mock logic (Admin if mobile is 9999999999)
      if (form.mobile === '9999999999') {
        onSuccess({ id: '1', name: 'Administrator', email: 'admin@stgeorgia.com', role: 'admin' });
      } else {
        onSuccess({ 
          id: '2', 
          name: form.fullName || 'Student User', 
          email: 'student@stgeorgia.com', 
          role: 'student', 
          regId: `SGBA26${Math.floor(1000 + Math.random() * 9000)}`, 
          semester: 1 
        });
      }
    }, 1200);
  };

  const resetFlow = () => {
    setIsOtpSent(false);
    setForm({ ...form, otp: '' });
    setTimer(0);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#002147]/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-[2.5rem] w-full max-w-4xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row animate-fadeIn relative">
        <button onClick={onClose} className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#002147] hover:text-white transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          {/* Left Decorative Side */}
          <div className="hidden md:flex bg-[#002147] p-12 text-white flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10">
              <span className="text-amber-500 font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Student Portal Access</span>
              <h2 className="text-4xl font-serif font-bold leading-tight">Join the Academy of Excellence.</h2>
              <div className="mt-8 space-y-6">
                {[
                  { t: "Passwordless Login", d: "Secure and fast access using your registered mobile number." },
                  { t: "Instant Verification", d: "One-time passwords sent directly to your device." },
                  { t: "Live Tracking", d: "Monitor your merit and application status 24/7." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-[#002147]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-amber-500">{item.t}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form Side */}
          <div className="p-8 md:p-14 bg-white">
            <div className="mb-10 text-center md:text-left">
              <h3 className="text-3xl font-serif font-bold text-[#002147] mb-2">
                Portal Login
              </h3>
              <p className="text-slate-400 text-sm">
                {isOtpSent 
                  ? `OTP sent to +91 ${form.mobile.replace(/.(?=.{4})/g, '*')}` 
                  : 'Enter your mobile number to receive an OTP.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#002147] uppercase tracking-widest pl-1">Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold border-r pr-3 border-slate-200">+91</span>
                  <input 
                    required 
                    type="tel" 
                    maxLength={10}
                    disabled={isOtpSent}
                    value={form.mobile} 
                    onChange={e => setForm({...form, mobile: e.target.value.replace(/\D/g, '')})} 
                    className={`w-full pl-16 pr-5 py-3.5 rounded-2xl border ${isOtpSent ? 'bg-slate-50 border-slate-100 text-slate-400' : 'border-slate-200 focus:ring-2 focus:ring-amber-400'} outline-none transition-all text-sm font-bold tracking-widest`} 
                    placeholder="7000XXXXXX" 
                  />
                  {isOtpSent && (
                    <button 
                      type="button" 
                      onClick={resetFlow} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 text-[10px] font-bold uppercase tracking-widest hover:underline"
                    >
                      Change
                    </button>
                  )}
                </div>
              </div>

              {isOtpSent && (
                <div className="space-y-1 animate-fadeIn">
                  <div className="flex justify-between items-center pl-1">
                    <label className="text-[10px] font-bold text-[#002147] uppercase tracking-widest">Enter 5-Digit OTP</label>
                    {timer > 0 ? (
                      <span className="text-[10px] font-bold text-slate-400">Resend in {timer}s</span>
                    ) : (
                      <button type="button" onClick={handleSendOtp} className="text-[10px] font-bold text-amber-600 uppercase hover:underline">Resend OTP</button>
                    )}
                  </div>
                  <input 
                    required 
                    type="text" 
                    maxLength={5}
                    value={form.otp} 
                    onChange={e => setForm({...form, otp: e.target.value.replace(/\D/g, '')})} 
                    className="w-full px-5 py-3.5 rounded-2xl border border-amber-200 focus:ring-2 focus:ring-amber-400 outline-none transition-all text-center text-xl font-black tracking-[0.5em] text-[#002147]" 
                    placeholder="00000" 
                  />
                </div>
              )}

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-4 bg-[#002147] text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
                >
                  {isLoading && (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isLoading ? 'WORKING...' : isOtpSent ? 'VERIFY & LOGIN' : 'SEND OTP'}
                </button>
              </div>

              <div className="text-center pt-2">
                <button 
                  type="button" 
                  onClick={onSignUpClick} 
                  className="text-xs font-bold text-[#002147] uppercase tracking-widest hover:text-amber-600 transition-colors"
                >
                  New Admission? Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
