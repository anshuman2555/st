
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#002147] text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="space-y-8 text-center md:text-left">
          <div className="flex flex-col">
            <span className="font-serif font-bold text-2xl text-white">
              ST. GEORGIA <span className="text-[#FFB800]">BUSINESS</span> ACADEMY
            </span>
            <span className="text-[10px] tracking-[0.4em] text-[#FFB800] font-bold uppercase mt-1">EXCELLENCE IN EDUCATION</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            Patna's leading institution for BBA and BCA, dedicated to professional growth, character building, and academic excellence.
          </p>
        </div>

        <div className="text-center md:text-left">
          <h4 className="text-lg font-bold mb-8 text-[#FFB800] uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-medium">
            {['Home', 'About Institution', 'Academic Courses', 'Placement Cell', 'Campus Life', 'Admissions'].map(link => (
              <li key={link}>
                <a href="#" className="hover:text-[#FFB800] transition-colors inline-block hover:translate-x-1 transition-transform">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h4 className="text-lg font-bold mb-8 text-[#FFB800] uppercase tracking-widest text-xs">Reach Us</h4>
          <ul className="space-y-6 text-slate-400 text-sm">
            <li className="flex gap-4 justify-center md:justify-start">
              <svg className="w-6 h-6 text-[#FFB800] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>ST. GEORGIA BUSINESS ACADEMY,<br/>Sai Niwas, Adarsh Nagar, Sampatchak, Patna - 800007</span>
            </li>
            <li className="flex gap-4 justify-center md:justify-start">
              <svg className="w-6 h-6 text-[#FFB800] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:8797238275" className="hover:text-[#FFB800] transition-colors">+91 87972 38275</a>
            </li>
            <li className="flex gap-4 justify-center md:justify-start">
              <svg className="w-6 h-6 text-[#FFB800] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:admissions@stgeorgiabusinessacademy.in" className="hover:text-[#FFB800] transition-colors break-all">admissions@stgeorgiabusinessacademy.in</a>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h4 className="text-lg font-bold mb-8 text-[#FFB800] uppercase tracking-widest text-xs">Newsletter</h4>
          <p className="text-slate-400 text-xs mb-4">Stay updated with latest college events and placement drives.</p>
          <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10 max-w-xs mx-auto md:mx-0">
            <input type="email" placeholder="Your email" className="bg-transparent px-4 text-xs w-full focus:outline-none" />
            <button className="bg-[#FFB800] p-3 rounded-xl hover:bg-amber-400 transition-all text-[#002147]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] text-center md:text-left">
          © {new Date().getFullYear()} ST. GEORGIA BUSINESS ACADEMY. PRODUCING LEADERS.
        </p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-[#FFB800] p-4 rounded-2xl hover:bg-white text-[#002147] transition-all shadow-2xl active:scale-90"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
