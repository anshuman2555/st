
import React, { useState, useEffect } from 'react';

interface MobileVerificationProps {
  phone: string;
  onVerified: () => void;
}

const MobileVerification: React.FC<MobileVerificationProps> = ({ phone, onVerified }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
    setIsVerifying(true);
    // Simulate sending OTP
    setTimeout(() => {
      setIsVerifying(false);
      setOtpSent(true);
      setTimer(30);
    }, 1000);
  };

  const handleVerify = () => {
    if (!otpSent) {
      handleSendOtp();
      return;
    }

    if (otp.length !== 5) {
      alert("Please enter the 5-digit verification code.");
      return;
    }

    setIsVerifying(true);
    // Simulate API call for verification
    setTimeout(() => {
      setIsVerifying(false);
      setShowSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#002147] flex items-center justify-center p-6 relative">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-[600px] relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <div className="bg-white w-full max-w-[280px] h-24 rounded-2xl flex flex-col items-center justify-center mb-10 shadow-2xl p-4 border-b-4 border-amber-500">
          <div className="text-center flex flex-col">
             <span className="text-[#002147] font-serif font-black text-xl lg:text-2xl tracking-tighter leading-none">ST. GEORGIA</span>
             <span className="text-amber-500 font-bold text-[8px] lg:text-[10px] uppercase tracking-[0.4em] mt-1">Business Academy</span>
          </div>
          <div className="mt-2 flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          </div>
        </div>

        {/* Verification Card */}
        <div className="w-full bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-10 md:p-16 flex flex-col items-center shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          
          <div className="w-full bg-[#0d2b4d]/80 border border-white/10 rounded-2xl py-5 px-8 text-center mb-12 shadow-xl">
            <h2 className="text-white font-bold tracking-[0.25em] text-xs md:text-sm uppercase">
              {otpSent ? "ENTER VERIFICATION CODE" : "VERIFY MOBILE NUMBER"}
            </h2>
          </div>

          <div className="w-full space-y-8">
            <div className="relative group">
              <div className="flex items-center bg-white rounded-2xl overflow-hidden px-6 py-5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] border border-slate-100">
                <span className="text-slate-400 font-bold border-r border-slate-200 pr-5 mr-5 flex items-center gap-2 text-sm md:text-base">
                  +91
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </span>
                <input 
                  type="tel" 
                  defaultValue={phone || "6203241375"}
                  className="flex-grow bg-transparent text-slate-800 font-bold text-lg md:text-xl outline-none"
                  readOnly
                />
                {!otpSent && (
                  <button 
                    onClick={handleSendOtp}
                    className="text-amber-600 font-black text-xs md:text-sm whitespace-nowrap hover:text-amber-500 transition-colors uppercase tracking-widest border-b-2 border-amber-200 hover:border-amber-500"
                  >
                    Click to Verify
                  </button>
                )}
              </div>
            </div>

            {/* OTP Input Section */}
            {otpSent && (
              <div className="animate-fadeIn space-y-4">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] md:text-xs font-bold text-amber-500 uppercase tracking-widest">5-Digit OTP sent to your phone</label>
                  {timer > 0 ? (
                    <span className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-widest">Resend in {timer}s</span>
                  ) : (
                    <button onClick={handleSendOtp} className="text-[10px] md:text-xs font-bold text-amber-500 uppercase tracking-widest hover:underline">Resend Code</button>
                  )}
                </div>
                <input 
                  type="text" 
                  maxLength={5}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-white px-5 py-6 rounded-2xl border-2 border-amber-500/50 focus:border-amber-500 outline-none transition-all text-center text-3xl font-black tracking-[0.5em] text-[#002147] shadow-2xl animate-pulse-amber"
                  placeholder="00000"
                />
              </div>
            )}

            <p className="text-slate-400 text-[10px] md:text-xs text-center px-6 leading-relaxed opacity-60 italic">
              By submitting this form, I agree to receive notifications from the University in the form of SMS/E-mail/Call.
            </p>

            <button 
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full bg-[#c4161c] hover:bg-[#a31217] text-white font-black py-6 rounded-2xl uppercase tracking-[0.4em] text-sm md:text-base shadow-2xl transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 border border-white/10"
            >
              {isVerifying ? "Processing..." : otpSent ? "VERIFY & PROCEED" : "SEND OTP"}
            </button>
          </div>
        </div>

        {/* Support Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">Institutional Support Desk</p>
          <a href="tel:8797238275" className="text-amber-500/60 font-bold text-xs mt-2 inline-block hover:text-amber-500 transition-colors">+91 87972 38275</a>
        </div>
      </div>

      {/* Success Popup Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#002147]/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-[3rem] w-full max-w-md p-10 text-center shadow-[0_30px_100px_rgba(0,0,0,0.5)] transform scale-100 animate-fadeIn">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#002147] mb-4 tracking-tight">Success!</h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
              Thank you for verifying your mobile number. Your account is now active.
            </p>
            <button 
              onClick={onVerified}
              className="w-full py-5 bg-[#002147] text-white rounded-2xl font-bold uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-95"
            >
              PROCEED TO MY ACCOUNT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileVerification;
