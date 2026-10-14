import { useEffect, useRef } from 'react';
import { useLead } from '../lead';

export default function HeroSection() {
  const { openLead } = useLead();
  const img = useRef<HTMLImageElement>(null);

  // Parallax rất nhẹ, tắt khi reduced-motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (img.current && window.scrollY < window.innerHeight) img.current.style.transform = `translate3d(0,${window.scrollY * 0.08}px,0)`;
      });
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="hero" id="top" aria-label="Giới thiệu">
      <img ref={img} className="hero__img" src="assets/m9-front.webp" alt="BYD M9 màu trắng góc 3/4 phía trước" width={1254} height={1009} {...{ fetchpriority: 'high' }} />
      <div className="hero__shade" />
      <div className="hero__content">
        <p className="eyebrow eyebrow--light reveal">BYD THUẬN MINH GIA LAI</p>
        <h1 className="reveal d1">Bước vào kỷ nguyên<br />di chuyển mới</h1>
        <p className="hero__lead reveal d2">Khám phá thế giới xe năng lượng mới BYD và tìm chiếc xe phù hợp với phong cách sống của bạn.</p>
        <div className="hero__cta reveal d3">
          <a className="btn btn--red" href="#kham-pha-xe">Khám phá các dòng xe</a>
          <button className="btn btn--ghost-light" onClick={() => openLead('testdrive')}>Đăng ký lái thử</button>
        </div>
      </div>
      <a className="scrollcue" href="#kham-pha-xe" aria-label="Cuộn xuống"><span /></a>
    </section>
  );
}
