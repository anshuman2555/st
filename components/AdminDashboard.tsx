
import React, { useState } from 'react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('stats');

  const stats = [
    { label: "Total Enquiries", value: "412", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Admissions", value: "86", color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Pending Review", value: "24", color: "text-red-600", bg: "bg-red-50" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <aside className="w-full lg:w-80 bg-[#002147] text-white p-10 flex flex-col justify-between">
        <div className="space-y-12">
          <div className="flex flex-col">
            <span className="font-serif font-bold text-2xl text-amber-500">ST. GEORGIA</span>
            <span className="text-[8px] tracking-[0.5em] font-bold text-white/50 uppercase">Admin Command Centre</span>
          </div>
          
          <nav className="flex flex-col gap-4">
            {['stats', 'admissions', 'enquiries'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab ? 'bg-amber-500 text-[#002147]' : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>

        <button 
          onClick={onLogout}
          className="flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-400/10 transition-all border border-red-400/20"
        >
          LOGOUT SESSION
        </button>
      </aside>

      <main className="flex-grow p-8 lg:p-14 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center mb-14">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#002147] capitalize">{activeTab}</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Management Console / 2026-27</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administrator</p>
              <p className="text-sm font-bold text-[#002147]">Admin User</p>
            </div>
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-[#002147]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </header>

        {activeTab === 'stats' && (
          <div className="space-y-10 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className={`${stat.bg} p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between`}>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <h4 className={`text-4xl font-serif font-bold ${stat.color}`}>{stat.value}</h4>
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-white shadow-inner">
                    <svg className={`w-6 h-6 ${stat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#002147] rounded-[3rem] p-12 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-serif font-bold mb-4">Academic Session Activity</h2>
                <p className="text-slate-300 max-w-xl">Monitor lead generation and verify document dossiers for the 2026-27 admission cycle.</p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        )}

        {activeTab !== 'stats' && (
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden animate-fadeIn">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-2xl font-serif font-bold text-[#002147]">Records List</h3>
              <button className="text-blue-600 font-bold text-xs uppercase tracking-widest">Download CSV</button>
            </div>
            <div className="p-12 text-center text-slate-400 italic">
              Record retrieval system active. Connection established to database...
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
