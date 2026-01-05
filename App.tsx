
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import LoginModal from './components/LoginModal';
import Home from './components/Home';
import About from './components/About';
import Courses from './components/Courses';
import Features from './components/Features';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Redirecting from './components/Redirecting';
import MobileVerification from './components/MobileVerification';
import { AppView, User } from './types';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<AppView | null>(null);
  const [pendingPhone, setPendingPhone] = useState('');
  const [highlightHomeForm, setHighlightHomeForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const savedSession = localStorage.getItem('sgba_session');
    if (savedSession) {
      const userData = JSON.parse(savedSession);
      setUser(userData);
      setIsLoggedIn(true);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (view: AppView) => {
    if (view === 'dashboard' && !isLoggedIn) {
      setRedirectAfterLogin(view);
      setShowLogin(true);
      return;
    }
    if (view === 'admin' && user?.role !== 'admin') {
      alert("Unauthorized: Admin credentials required.");
      setShowLogin(true);
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnrollClick = () => {
    setHighlightHomeForm(true);
    
    const scrollToForm = () => {
      const formElement = document.getElementById('admission-form-section');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    if (currentView !== 'home') {
      setCurrentView('home');
      // Delay to allow Home component to mount/render
      setTimeout(scrollToForm, 300);
    } else {
      scrollToForm();
    }
  };

  const handleLoginSuccess = (userData: User) => {
    localStorage.setItem('sgba_session', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
    setShowLogin(false);
    
    const target = redirectAfterLogin || (userData.role === 'admin' ? 'admin' : 'dashboard');
    setCurrentView(target);
    setRedirectAfterLogin(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('sgba_session');
    setIsLoggedIn(false);
    setUser(null);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const startRedirection = (phone: string) => {
    setPendingPhone(phone);
    setCurrentView('redirecting');
  };

  const renderView = () => {
    const views: Partial<Record<AppView, React.ReactNode>> = {
      home: (
        <>
          <Home 
            onEnquirySubmit={startRedirection} 
            onLoginClick={() => setShowLogin(true)} 
            highlight={highlightHomeForm}
            onHighlightComplete={() => setHighlightHomeForm(false)}
          />
          <About preview navigateTo={navigateTo} />
          <Courses navigateTo={navigateTo} onEnrollClick={handleEnrollClick} />
          <Features navigateTo={navigateTo} />
        </>
      ),
      about: <About navigateTo={navigateTo} />,
      courses: <Courses navigateTo={navigateTo} full onEnrollClick={handleEnrollClick} />,
      features: <Features navigateTo={navigateTo} full />,
      contact: <Contact />,
      dashboard: isLoggedIn ? <Dashboard user={user} onLogout={handleLogout} /> : <Home onEnquirySubmit={startRedirection} onLoginClick={() => setShowLogin(true)} />,
      admin: <AdminDashboard onLogout={handleLogout} />,
      redirecting: <Redirecting onComplete={() => setCurrentView('verification')} />,
      verification: <MobileVerification phone={pendingPhone} onVerified={() => navigateTo('dashboard')} />,
    };

    return (
      <div key={currentView} className="animate-fadeIn transition-all duration-300">
        {views[currentView] || views.home}
      </div>
    );
  };

  const hideFrame = currentView === 'admin' || currentView === 'dashboard' || currentView === 'redirecting' || currentView === 'verification';

  return (
    <div className="min-h-screen flex flex-col relative bg-white text-slate-900 selection:bg-amber-200">
      {!hideFrame && (
        <Navbar 
          scrolled={scrolled} 
          navigateTo={navigateTo} 
          currentView={currentView}
          isLoggedIn={isLoggedIn}
          userName={user?.name}
          openLogin={() => setShowLogin(true)}
        />
      )}

      <main className="flex-grow">
        {renderView()}
      </main>

      {!hideFrame && <Footer />}
      {!hideFrame && <Chatbot />}
      
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onSuccess={handleLoginSuccess} 
          onSignUpClick={() => {
            setShowLogin(false);
            handleEnrollClick();
          }}
        />
      )}

      {!hideFrame && (
        <div className="fixed bottom-6 left-6 z-[60] flex flex-col gap-3">
          <a 
            href="tel:+918797238275" 
            className="w-11 h-11 bg-amber-500 text-[#002147] rounded-xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all group relative"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="absolute left-14 bg-white text-[#002147] px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
              Call Admission
            </span>
          </a>
          <a 
            href="https://wa.me/918797238275" 
            target="_blank" 
            rel="noreferrer"
            className="w-11 h-11 bg-green-500 text-white rounded-xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all group relative"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.139c1.52.907 3.0 1.353 4.545 1.353 5.4 0 9.802-4.402 9.802-9.803 0-2.621-1.02-5.086-2.871-6.938a9.75 9.75 0 00-6.929-2.871c-5.401 0-9.804 4.403-9.804 9.803 0 1.642.41 3.25 1.189 4.673l-.997 3.637 3.731-.979zm11.233-6.195c-.3-.15-1.77-.874-2.046-.975-.276-.1-.476-.15-.676.15s-.776.975-.951 1.176-.35.225-.65.075c-.3-.15-1.265-.467-2.41-1.487-.892-.795-1.493-1.776-1.668-2.076-.175-.3-.019-.462.13-.611.134-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525s-.676-1.625-.926-2.225c-.244-.583-.49-.504-.676-.513-.175-.008-.375-.01-.575-.01s-.525.075-.8.375c-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.116 3.231 5.126 4.531.716.309 1.275.494 1.71.632.719.229 1.375.196 1.891.118.576-.086 1.77-.724 2.021-1.424.25-.7.25-1.3 1.75-1.425-.075-.125-.275-.225-.575-.375z"/>
            </svg>
            <span className="absolute left-14 bg-white text-[#002147] px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
              WhatsApp Us
            </span>
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
