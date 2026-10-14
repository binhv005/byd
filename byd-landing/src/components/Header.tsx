import { useEffect, useState } from 'react';
import { VEHICLES, thumb } from '../data';
import { useLead } from '../lead';

const LINKS = [
  { href: '#top', label: 'Trang chủ' },
  { href: '#ve-dai-ly', label: 'Về đại lý' },
  { href: '#cong-nghe', label: 'Công nghệ' },
  { href: '#tin-tuc', label: 'Tin tức & ưu đãi' },
  { href: '#lien-he', label: 'Liên hệ' },
];

export default function Header() {
  const { openLead, pickVehicle } = useLead();
  const [solid, setSolid] = useState(false);
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMega(false); setDrawer(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
  }, [drawer]);

  const dark = solid || mega || drawer;

  return (
    <>
      <header className={`header${dark ? ' is-solid' : ''}`}>
        <div className="header__bar">
          <a className="brand" href="#top" aria-label="BYD Thuận Minh Gia Lai — Trang chủ">
            <span className="brand__logo" aria-hidden="true" />
            <span className="brand__name">Thuận Minh Gia Lai</span>
          </a>
          <nav className="nav" aria-label="Điều hướng chính">
            <a href="#top">Trang chủ</a>
            <button className="nav__trigger" aria-expanded={mega} aria-controls="mega" onClick={() => setMega((v) => !v)}>
              Khám phá xe
              <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" className={mega ? 'flip' : ''}>
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {LINKS.slice(1).map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <div className="header__right">
            <button className="btn btn--red btn--sm" onClick={() => openLead('testdrive')}>Đăng ký lái thử</button>
            <button className={`burger${drawer ? ' open' : ''}`} aria-label={drawer ? 'Đóng menu' : 'Mở menu'} aria-expanded={drawer} onClick={() => setDrawer((v) => !v)}>
              <span /><span />
            </button>
          </div>
        </div>
        <div className={`mega${mega ? ' open' : ''}`} id="mega" aria-hidden={!mega}>
          <div className="mega__inner">
            {VEHICLES.map((v) => (
              <button key={v.id} tabIndex={mega ? 0 : -1} onClick={() => { setMega(false); pickVehicle(v.id); }}>
                <img src={thumb(v.images[0].src)} alt="" loading="lazy" width="120" height="96" />
                <b>{v.name}</b>
                <span>{v.segment.split(' · ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className={`drawer${drawer ? ' open' : ''}`} aria-hidden={!drawer}>
        <nav aria-label="Menu di động">
          <a href="#top" onClick={() => setDrawer(false)}>Trang chủ</a>
          <a href="#kham-pha-xe" onClick={() => setDrawer(false)}>Khám phá xe</a>
          {LINKS.slice(1).map((l) => <a key={l.href} href={l.href} onClick={() => setDrawer(false)}>{l.label}</a>)}
        </nav>
        <div className="drawer__cta">
          <a className="btn btn--ghost-light" href="tel:0931612679">Gọi 0931 612 679</a>
          <button className="btn btn--red" onClick={() => { setDrawer(false); openLead('testdrive'); }}>Đăng ký lái thử</button>
        </div>
      </div>
    </>
  );
}
