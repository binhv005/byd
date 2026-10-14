import { SITE } from '../data';
import { useLead } from '../lead';

export default function Footer() {
  const { openPrivacy } = useLead();
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <div className="brand brand--footer"><span className="brand__logo" aria-hidden="true" /><span className="brand__name">Thuận Minh Gia Lai</span></div>
          <p className="footer__muted">Hotline: <a href={SITE.hotlineTel}>{SITE.hotline}</a></p>
        </div>
        <nav aria-label="Chân trang">
          <a href="#kham-pha-xe">Khám phá xe</a>
          <a href="#ve-dai-ly">Về đại lý</a>
          <a href="#cong-nghe">Công nghệ</a>
          <a href="#tin-tuc">Tin tức &amp; ưu đãi</a>
          <a href="#lien-he">Liên hệ</a>
        </nav>
        <nav aria-label="Liên kết">
          {SITE.facebook && <a href={SITE.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`} target="_blank" rel="noopener noreferrer">Google Maps</a>
          <button onClick={openPrivacy}>Chính sách quyền riêng tư</button>
        </nav>
      </div>
      <div className="wrap footer__legal">
        <p>© {new Date().getFullYear()} {SITE.dealer}</p>
      </div>
    </footer>
  );
}
