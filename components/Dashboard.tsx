
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface DashboardProps {
  user: User | null;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleTabChange = (tab: string) => {
    setLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const navItems = [
    { id: 'overview', label: 'Command Center', icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
    { id: 'profile', label: 'My Identity', icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { id: 'results', label: 'Academic Vault', icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { id: 'finance', label: 'Fee & Payments', icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" },
  ];

  const renderOverview = () => (
    <div className="space-y-10 animate-fadeIn">
      <div className="bg-[#002147] rounded-[2.5rem] p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-28 h-28 bg-amber-500 rounded-[2rem] flex items-center justify-center text-[#002147] text-4xl font-serif font-bold shadow-2xl border-4 border-white transform rotate-3">
            {user?.name.charAt(0)}
          </div>
          <div className="text-center md:text-left space-y-3">
            <span className="text-amber-500 font-bold text-[10px] uppercase tracking-[0.4em] block">Session 2026-27 Active</span>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold tracking-tight">Welcome, {user?.name.split(' ')[0]}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span className="px-4 py-1.5 bg-white/10 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest">
                REG ID: {user?.regId || 'SGA/26/PEND'}
              </span>
              <span className="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-xl border border-green-500/20 text-xs font-bold uppercase tracking-widest">
                Sem {user?.semester || 1} Registered
              </span>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { id: 'enrollment', t: 'Enrollment', d: 'Check registration status & details.', c: 'bg-blue-600', i: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
          { id: 'exam-form', t: 'Exam Form', d: 'Submit semester examination form.', c: 'bg-amber-500', i: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
          { id: 'admit-card', t: 'Admit Card', d: 'Generate & download hall ticket.', c: 'bg-indigo-600', i: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" },
          { id: 'results', t: 'Marksheets', d: 'View semester results & grades.', c: 'bg-emerald-600', i: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
          { id: 'finance', t: 'Fee Portal', d: 'Clear dues & view payment history.', c: 'bg-red-500', i: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
          { id: 'backlog', t: 'Backlog/Supp', d: 'Manage supplementary exam status.', c: 'bg-purple-600', i: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
          { id: 'profile', t: 'Update Profile', d: 'Keep contact details up to date.', c: 'bg-slate-700', i: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
        ].map(card => (
          <button 
            key={card.id}
            onClick={() => handleTabChange(card.id)}
            className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left flex flex-col relative overflow-hidden"
          >
            <div className={`w-12 h-12 rounded-xl ${card.c} text-white flex items-center justify-center mb-5 shadow-lg transform group-hover:rotate-6 transition-transform`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.i} />
              </svg>
            </div>
            <h4 className="text-base font-bold text-[#002147] mb-1">{card.t}</h4>
            <p className="text-slate-400 text-[10px] leading-relaxed mb-4">{card.d}</p>
            <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">Launch Service</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderEnrollment = () => (
    <div className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-xl border border-slate-100 animate-fadeIn">
      <h3 className="text-3xl font-serif font-bold text-[#002147] mb-8">Enrollment Dossier</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Registration</span>
            <p className="text-lg font-bold text-[#002147] mt-1">{user?.regId || 'PENDING'}</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Program Applied</span>
            <p className="text-lg font-bold text-[#002147] mt-1">BCA (Professional Degree)</p>
          </div>
        </div>
        <div className="bg-green-50 p-8 rounded-[2rem] border border-green-100 flex flex-col justify-center text-center">
          <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="text-green-700 font-bold text-xl">Verified Student</h4>
          <p className="text-green-600 text-sm mt-2">All documents verified by Registrar Office on 24 Feb, 2026.</p>
        </div>
      </div>
      <button onClick={() => setActiveTab('overview')} className="mt-12 text-amber-600 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Console
      </button>
    </div>
  );

  const renderFinance = () => (
    <div className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-xl border border-slate-100 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h3 className="text-3xl font-serif font-bold text-[#002147]">Finance Portal</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">SGA-2026-LEDGER</p>
        </div>
        <div className="bg-red-50 px-6 py-3 rounded-2xl border border-red-100">
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Balance Due</span>
          <p className="text-2xl font-serif font-bold text-red-700">₹42,500</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {[
          { t: "Semester 1 Tuition Fee", a: 35000, d: "15 Mar, 2026", s: "pending" },
          { t: "Infrastructure Charges", a: 7500, d: "15 Mar, 2026", s: "pending" },
          { t: "Admission Processing", a: 5000, d: "12 Feb, 2026", s: "paid" }
        ].map((fee, idx) => (
          <div key={idx} className="flex justify-between items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 group">
            <div>
              <p className="font-bold text-[#002147]">{fee.t}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Due Date: {fee.d}</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xl font-serif font-bold text-slate-800">₹{fee.a.toLocaleString()}</span>
              {fee.s === 'paid' ? (
                <span className="bg-green-100 text-green-600 px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase">PAID</span>
              ) : (
                <button onClick={() => { setLoading(true); setTimeout(() => {setLoading(false); setNotification("Payment Initiated...")}, 1000)}} className="bg-[#002147] text-white px-6 py-2 rounded-xl text-[10px] font-bold uppercase hover:bg-amber-500 transition-colors">
                  PAY NOW
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-xl border border-slate-100 animate-fadeIn">
      <h3 className="text-3xl font-serif font-bold text-[#002147] mb-10">Identity Management</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-5xl font-serif font-bold text-[#002147] border-4 border-white shadow-xl relative group">
            {user?.name.charAt(0)}
            <button className="absolute bottom-1 right-1 bg-amber-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <p className="mt-4 font-bold text-[#002147]">{user?.name}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user?.regId || 'Candidate'}</p>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Mobile Number</label>
            <div className="flex gap-2">
              <input type="tel" className="flex-grow px-5 py-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none text-sm" defaultValue="+91 87972 38275" />
              <button onClick={() => setNotification("Update OTP sent!")} className="bg-amber-500 text-[#002147] px-6 rounded-xl text-[10px] font-bold uppercase">Update</button>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Institutional Email</label>
            <input disabled type="email" className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-sm" defaultValue={user?.email} />
          </div>
          <div className="pt-4 flex gap-4">
            <button className="bg-[#002147] text-white px-8 py-3 rounded-xl text-xs font-bold uppercase shadow-xl hover:bg-slate-800 transition-all">
              SAVE ALL CHANGES
            </button>
            <button className="text-red-500 text-xs font-bold uppercase tracking-widest">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-xl border border-slate-100 animate-fadeIn">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-3xl font-serif font-bold text-[#002147]">Results Vault</h3>
        <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold">
          <option>Semester 1 (Autumn 2026)</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject</th>
              <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Code</th>
              <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Int</th>
              <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ext</th>
              <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { s: "Data Structures", c: "BCA-101", i: 28, e: 62, g: "A" },
              { s: "Programming in C", c: "BCA-102", i: 29, e: 65, g: "A+" },
              { s: "Business Comm.", c: "BBA-103", i: 25, e: 55, g: "B+" }
            ].map((res, idx) => (
              <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                <td className="py-5 font-bold text-[#002147] text-sm">{res.s}</td>
                <td className="py-5 text-slate-400 font-mono text-xs">{res.c}</td>
                <td className="py-5 text-slate-600 text-sm">{res.i}</td>
                <td className="py-5 text-slate-600 text-sm">{res.e}</td>
                <td className="py-5">
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-xs font-bold">{res.g}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 bg-slate-50 p-6 rounded-2xl flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current CGPA</span>
          <p className="text-3xl font-serif font-bold text-[#002147]">8.65 / 10.0</p>
        </div>
        <button className="bg-[#002147] text-white px-8 py-3 rounded-xl text-xs font-bold uppercase hover:bg-amber-500 transition-all">
          Download Full Marksheet
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'enrollment': return renderEnrollment();
      case 'finance': return renderFinance();
      case 'profile': return renderProfile();
      case 'results': return renderResults();
      case 'admit-card': return (
        <div className="bg-white rounded-[3rem] p-12 lg:p-20 shadow-xl animate-fadeIn text-center border border-slate-100">
           <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
             </svg>
           </div>
           <h2 className="text-4xl font-serif font-bold text-[#002147] mb-4">Admit Card Vault</h2>
           <p className="text-slate-500 max-w-md mx-auto mb-10 text-lg leading-relaxed">Internal Assessment Admit Cards for Semester 1 (Batch 2026) are now available for generation.</p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button onClick={() => {setLoading(true); setTimeout(() => {setLoading(false); setNotification("Admit Card Downloaded!")}, 1500)}} className="px-12 py-5 bg-[#002147] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl hover:bg-indigo-600 transition-all">
               GENERATE & DOWNLOAD
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
               </svg>
             </button>
             <button className="px-12 py-5 bg-white text-slate-400 border border-slate-200 rounded-2xl font-bold">PREVIEW HALL TICKET</button>
           </div>
        </div>
      );
      default: return (
        <div className="bg-white rounded-[3rem] p-20 text-center animate-fadeIn">
          <p className="text-slate-400 font-serif italic text-xl">Service module for {activeTab} is currently being synchronized with our university server...</p>
          <button onClick={() => setActiveTab('overview')} className="mt-8 bg-amber-500 text-[#002147] px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest">Back to Overview</button>
        </div>
      );
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Processing Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-[#002147]/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 text-amber-500 mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xs font-bold text-[#002147] uppercase tracking-widest">Processing Request...</p>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-12 right-12 z-[100] bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl animate-fadeIn flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-bold text-sm">{notification}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-20 lg:w-72 bg-[#002147] text-white flex flex-col z-50 transition-all duration-300">
        <div className="p-8 border-b border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-[#002147]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.853a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="font-serif font-bold text-lg leading-tight">ST. GEORGIA</span>
            <span className="text-[8px] font-bold text-amber-500 uppercase tracking-[0.4em]">ACADEMY PORTAL</span>
          </div>
        </div>

        <nav className="flex-grow p-4 lg:p-6 space-y-2 mt-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                activeTab === item.id 
                  ? 'bg-amber-500 text-[#002147] shadow-[0_10px_30px_rgba(245,158,11,0.2)]' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              <span className="hidden lg:block text-[11px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center lg:justify-start gap-4 px-4 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all border border-red-500/20 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden lg:block text-[11px] font-bold uppercase tracking-widest">Logout Portal</span>
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-grow ml-20 lg:ml-72 p-6 lg:p-12 pt-28 lg:pt-36 bg-slate-50 min-h-screen">
        <header className="mb-12 flex justify-between items-center bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 mt-2 lg:mt-0">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#002147] capitalize tracking-tight">{activeTab.replace('-', ' ')}</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Student Command Centre / Official Resource</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Auth</span>
              <span className="text-xs font-bold text-[#002147]">{new Date().toLocaleTimeString()} Today</span>
            </div>
            <div className="w-px h-10 bg-slate-100" />
            <div className="relative cursor-pointer">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[#002147] hover:bg-amber-100 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-[1400px] mx-auto pb-12">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
