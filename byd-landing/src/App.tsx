import { useCallback, useEffect, useState } from 'react';
import { LeadContext, LeadMode, LeadPreset } from './lead';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import VehicleExplorer from './components/VehicleExplorer';
import VehicleFeatureSection from './components/VehicleFeatureSection';
import TechnologySection from './components/TechnologySection';
import TestDriveSection from './components/TestDriveSection';
import ConsultationSection from './components/ConsultationSection';
import DealerIntroduction from './components/DealerIntroduction';
import AfterSalesSection from './components/AfterSalesSection';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LeadModal from './components/LeadModal';
import PrivacyModal from './components/PrivacyModal';
import MobileBar from './components/MobileBar';

export default function App() {
  const [lead, setLead] = useState<{ mode: LeadMode; preset: LeadPreset; n: number } | null>(null);
  const [privacy, setPrivacy] = useState(false);
  const [picked, setPicked] = useState<{ id: string; n: number } | null>(null);

  const openLead = useCallback(
    (mode: LeadMode, preset: LeadPreset = {}) => setLead((l) => ({ mode, preset, n: (l?.n ?? 0) + 1 })),
    [],
  );
  const pickVehicle = useCallback((id: string) => {
    setPicked((p) => ({ id, n: (p?.n ?? 0) + 1 }));
    document.getElementById('kham-pha-xe')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Hiệu ứng xuất hiện khi cuộn (CSS tắt khi prefers-reduced-motion)
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  // Parallax nhẹ cho ảnh .plx + thanh tiến trình cuộn
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const imgs = Array.from(document.querySelectorAll<HTMLElement>('.plx'));
    const bar = document.getElementById('progress');
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      imgs.forEach((el) => {
        const r = (el.parentElement ?? el).getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1
        el.style.transform = `translate3d(0,${(p * -36).toFixed(1)}px,0) scale(1.12)`;
      });
      if (bar) bar.style.transform = `scaleX(${window.scrollY / Math.max(1, document.documentElement.scrollHeight - vh)})`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <LeadContext.Provider value={{ openLead, openPrivacy: () => setPrivacy(true), pickVehicle }}>
      <a className="skip" href="#main">Bỏ qua điều hướng</a>
      <div id="progress" className="progress" aria-hidden="true" />
      <Header />
      <main id="main">
        <HeroSection />
        <VehicleExplorer picked={picked} />
        <VehicleFeatureSection />
        <TechnologySection />
        <TestDriveSection />
        <ConsultationSection />
        <DealerIntroduction />
        <AfterSalesSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileBar />
      {lead && <LeadModal key={lead.n} mode={lead.mode} preset={lead.preset} onClose={() => setLead(null)} />}
      {privacy && <PrivacyModal onClose={() => setPrivacy(false)} />}
    </LeadContext.Provider>
  );
}
