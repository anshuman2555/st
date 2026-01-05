
import React from 'react';

const Contact: React.FC = () => {
  const contacts = [
    {
      t: "Direct Call",
      d: "Admissions help from 9 AM to 6 PM.",
      v: "+91 87972 38275",
      h: "tel:8797238275",
      c: "bg-amber-100 text-amber-600",
      i: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    },
    {
      t: "Official Email",
      d: "Send documents or detailed inquiries.",
      v: "admissions@stgeorgiabusinessacademy.in",
      h: "mailto:admissions@stgeorgiabusinessacademy.in",
      c: "bg-blue-100 text-blue-600",
      i: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    },
    {
      t: "WhatsApp Desk",
      d: "Quick resolution via chat support.",
      v: "Chat on WhatsApp",
      h: "https://wa.me/918797238275",
      c: "bg-green-100 text-green-600",
      i: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-6">
          <span className="text-amber-600 font-bold uppercase tracking-[0.4em] text-xs">Reach Out to Us</span>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-[#002147] leading-tight">
            Institutional Support & <br />
            <span className="text-amber-500">Academic Inquiry</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Our support teams are here to assist prospective students, parents, and corporate partners with all their requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {contacts.map((contact, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform">
              <div className={`w-16 h-16 ${contact.c} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={contact.i} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#002147] mb-2 uppercase tracking-wide">{contact.t}</h3>
              <p className="text-slate-400 text-sm mb-6">{contact.d}</p>
              <a href={contact.h} className="text-lg lg:text-xl font-serif font-bold text-[#002147] hover:text-amber-600 transition-colors break-all">
                {contact.v}
              </a>
            </div>
          ))}
        </div>

        <div className="bg-[#002147] rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
            <div className="space-y-8">
              <h2 className="text-4xl font-serif font-bold">Official Campus</h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                St. Georgia Business Academy stands as a beacon of academic rigor and professional development in Patna. Visit us during official hours.
              </p>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#002147]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Campus Address</h4>
                    <p className="text-slate-300">ST. GEORGIA BUSINESS ACADEMY, Sai Niwas, Adarsh Nagar, Sampatchak, Patna - 800007</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#002147]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Campus Hours</h4>
                    <p className="text-slate-300">Mon - Sat: 09:00 AM - 06:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-[2rem] overflow-hidden min-h-[400px] border border-white/10 shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.4447493630256!2d85.1610427!3d25.5568853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed594379e9559d%3A0x868c644c9b3a7b6b!2sSt.%20Georgia%20Business%20Academy!5e0!3m2!1sen!2sin!4v1715600000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
              />
              <a 
                href="https://maps.app.goo.gl/GWBPp7kuyvFpxJof7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-amber-500 text-[#002147] px-4 py-2 rounded-lg text-xs font-bold shadow-xl hover:bg-white transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
