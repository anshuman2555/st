
import React, { useState, useRef } from 'react';
import { User, ApplicationData, AppView } from '../types';

interface ApplyNowProps {
  user: User | null;
  navigateTo: (view: AppView) => void;
}

const ApplyNow: React.FC<ApplyNowProps> = ({ user, navigateTo }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appId, setAppId] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<ApplicationData>({
    fullName: user?.name || '',
    dob: '',
    gender: 'Male',
    category: 'General',
    nationality: 'Indian',
    email: user?.email || '',
    phone: '',
    address: '',
    city: 'Patna',
    state: 'Bihar',
    class10Board: '',
    class10Year: '',
    class10Percent: '',
    class12Board: '',
    class12Year: '',
    class12Percent: '',
    guardianName: '',
    guardianPhone: '',
    course: 'BCA'
  });

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
    setFormData(prev => ({ ...prev, dob: formatted }));
  };

  const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (!date) return;
    const [y, m, d] = date.split('-');
    setFormData(prev => ({ ...prev, dob: `${d}/${m}/${y}` }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (key: string, fileName: string) => {
    setFormData(prev => ({ ...prev, [key]: fileName }));
  };

  const validateStep1 = () => {
    const required = ['fullName', 'dob', 'email', 'phone', 'address', 'class10Board', 'class12Board', 'guardianName'];
    for (const field of required) {
      if (!formData[field as keyof ApplicationData]) {
        alert(`Please fill the required field: ${field.replace(/([A-Z])/g, ' $1').toUpperCase()}`);
        return false;
      }
    }
    return true;
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 600);
    }
  };

  const finalize = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `SGBA2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setAppId(generatedId);
      setIsSubmitting(false);
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (step === 1) {
    return (
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">Official Enrollment 2026-27</span>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#002147] uppercase tracking-tight">SGBA ADMISSION FORM 2026</h1>
          </div>

          <form onSubmit={nextStep} className="space-y-10">
            {/* Step 0: Preference */}
            <div className="bg-[#002147] rounded-[2.5rem] p-10 lg:p-14 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500" />
              <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Step 0: Admission Preference</span>
              <h3 className="text-3xl font-serif font-bold text-white mb-8">Which degree program are you applying for?</h3>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {['BCA', 'BBA'].map(course => (
                  <button
                    key={course}
                    type="button"
                    onClick={() => setFormData({ ...formData, course })}
                    className={`px-12 py-5 rounded-2xl font-bold text-xl transition-all border-2 ${
                      formData.course === course 
                        ? 'bg-amber-500 border-amber-500 text-[#002147] shadow-[0_10px_40px_rgba(245,158,11,0.3)]' 
                        : 'border-white/20 text-white hover:border-white/40'
                    }`}
                  >
                    {course} Program
                  </button>
                ))}
              </div>
            </div>

            {/* Section 1: Personal */}
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl border border-slate-100">
              <div className="flex items-center gap-4 mb-10 border-b border-slate-50 pb-6">
                <div className="w-12 h-12 bg-amber-100 text-[#002147] rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner">1</div>
                <h3 className="text-2xl font-serif font-bold text-[#002147]">Personal Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
                  <input required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 outline-none text-sm transition-all" placeholder="As per 10th marksheet" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">DOB (DD/MM/YYYY) *</label>
                  <div className="relative group">
                    <input 
                      required 
                      type="text"
                      name="dob" 
                      placeholder="DD/MM/YYYY"
                      value={formData.dob} 
                      onChange={handleDobChange} 
                      className="w-full px-5 pr-10 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 outline-none text-sm transition-all" 
                    />
                    <button 
                      type="button"
                      onClick={() => dateInputRef.current?.showPicker()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-amber-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Gender *</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 outline-none text-sm transition-all">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Contact */}
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl border border-slate-100">
              <div className="flex items-center gap-4 mb-10 border-b border-slate-50 pb-6">
                <div className="w-12 h-12 bg-amber-100 text-[#002147] rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner">2</div>
                <h3 className="text-2xl font-serif font-bold text-[#002147]">Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mobile Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 outline-none text-sm transition-all" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Permanent Address *</label>
                  <textarea required name="address" rows={3} value={formData.address} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 outline-none text-sm transition-all" placeholder="House No, Street, Landmark..." />
                </div>
              </div>
            </div>

            {/* Section 3: Academics */}
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl border border-slate-100">
              <div className="flex items-center gap-4 mb-10 border-b border-slate-50 pb-6">
                <div className="w-12 h-12 bg-amber-100 text-[#002147] rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner">3</div>
                <h3 className="text-2xl font-serif font-bold text-[#002147]">Academic History</h3>
              </div>
              <div className="space-y-12">
                {/* 10th */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                  <div className="lg:col-span-3">
                    <span className="text-xs font-bold text-[#002147] uppercase tracking-widest block mb-4">Secondary (10th)</span>
                  </div>
                  <div className="lg:col-span-4 space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Board Name *</label>
                    <input required name="class10Board" value={formData.class10Board} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 outline-none text-sm" placeholder="e.g. CBSE, ICSE, BSEB" />
                  </div>
                  <div className="lg:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Passing Year *</label>
                    <input required name="class10Year" value={formData.class10Year} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 outline-none text-sm" placeholder="YYYY" />
                  </div>
                  <div className="lg:col-span-3 space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Percentage / CGPA *</label>
                    <input required name="class10Percent" value={formData.class10Percent} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 outline-none text-sm" placeholder="Agg. %" />
                  </div>
                </div>
                <div className="h-px bg-slate-100" />
                {/* 12th */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                  <div className="lg:col-span-3">
                    <span className="text-xs font-bold text-[#002147] uppercase tracking-widest block mb-4">Higher Secondary (12th)</span>
                  </div>
                  <div className="lg:col-span-4 space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Board Name *</label>
                    <input required name="class12Board" value={formData.class12Board} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 outline-none text-sm" />
                  </div>
                  <div className="lg:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Passing Year *</label>
                    <input required name="class12Year" value={formData.class12Year} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 outline-none text-sm" />
                  </div>
                  <div className="lg:col-span-3 space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Percentage / CGPA *</label>
                    <input required name="class12Percent" value={formData.class12Percent} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 outline-none text-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl border border-slate-100">
              <div className="flex items-center gap-4 mb-10 border-b border-slate-50 pb-6">
                <div className="w-12 h-12 bg-amber-100 text-[#002147] rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner">4</div>
                <h3 className="text-2xl font-serif font-bold text-[#002147]">Document Uploads</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "10th Marksheet", key: "doc10th" },
                  { label: "12th Marksheet", key: "doc12th" },
                  { label: "Aadhaar Card", key: "docAadhar" }
                ].map(doc => (
                  <div key={doc.key} className="relative group">
                    <label className="block p-8 border-2 border-dashed border-slate-200 rounded-3xl hover:border-amber-500 hover:bg-amber-50/30 transition-all cursor-pointer text-center">
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => handleFileUpload(doc.key, e.target.files?.[0]?.name || '')} 
                      />
                      <div className="flex flex-col items-center">
                        <svg className="w-8 h-8 text-slate-300 group-hover:text-amber-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-[10px] font-bold text-[#002147] uppercase tracking-widest">{doc.label}</span>
                        <span className="text-[9px] text-slate-400 mt-1">{formData[doc.key as keyof ApplicationData] || "Choose File (PDF/JPG)"}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-6 bg-[#002147] text-white rounded-[2rem] font-bold text-xl shadow-2xl hover:bg-[#003167] transition-all flex items-center justify-center gap-4"
            >
              {isSubmitting ? (
                <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span>
              ) : 'PREVIEW APPLICATION'}
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-32 pb-24 bg-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {step === 2 ? (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-[#002147] p-10 text-center text-white">
              <h2 className="text-3xl font-serif font-bold">Application Summary</h2>
              <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mt-2">St. Georgia Business Academy, Patna</p>
            </div>
            
            <div className="p-12 space-y-12 bg-white">
              <section className="space-y-6">
                <h4 className="text-sm font-bold text-[#002147] uppercase tracking-[0.2em] border-b pb-2">1. Personal Info</h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                  {[
                    { l: "Selected Program", v: formData.course },
                    { l: "Full Name", v: formData.fullName },
                    { l: "Date of Birth", v: formData.dob },
                    { l: "Gender", v: formData.gender },
                    { l: "Category", v: formData.category },
                    { l: "Nationality", v: formData.nationality }
                  ].map(item => (
                    <div key={item.l}>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.l}</p>
                      <p className="font-bold text-[#002147]">{item.v}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h4 className="text-sm font-bold text-[#002147] uppercase tracking-[0.2em] border-b pb-2">2. Academic History</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-2">Secondary (10th)</p>
                    <p className="text-sm font-bold text-[#002147]">{formData.class10Board}</p>
                    <p className="text-xs text-slate-500">Year: {formData.class10Year} | Agg: {formData.class10Percent}%</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-2">Higher Secondary (12th)</p>
                    <p className="text-sm font-bold text-[#002147]">{formData.class12Board}</p>
                    <p className="text-xs text-slate-500">Year: {formData.class12Year} | Agg: {formData.class12Percent}%</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="p-8 bg-slate-50 flex flex-col md:flex-row gap-4">
              <button onClick={() => setStep(1)} className="flex-1 py-4 bg-white text-[#002147] border border-slate-200 rounded-2xl font-bold hover:bg-slate-100 transition-all">
                BACK TO EDIT
              </button>
              <button 
                onClick={finalize} 
                disabled={isSubmitting}
                className="flex-[1.5] py-4 bg-[#002147] text-white rounded-2xl font-bold hover:bg-[#003167] shadow-xl transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                ) : 'CONFIRM & FINAL SUBMIT'}
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl w-full mx-auto px-6">
            <div className="bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border-t-[12px] border-green-500 overflow-hidden p-12 text-center animate-fadeIn">
              <div className="w-28 h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl font-serif font-bold text-[#002147] mb-4">Submission Successful!</h2>
              <p className="text-slate-500 text-lg mb-10">
                Thank you for choosing St. Georgia Business Academy. Your application has been logged into our central portal.
              </p>
              
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 mb-10">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-3">Your Application ID</p>
                <p className="text-5xl font-serif font-bold text-[#002147] tracking-wider">{appId}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigateTo('home')} className="px-12 py-5 bg-[#002147] text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl">
                  RETURN TO HOME
                </button>
                <button onClick={() => window.print()} className="px-12 py-5 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                  PRINT RECEIPT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyNow;
