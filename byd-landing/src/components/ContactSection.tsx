import { SITE } from '../data';
import { useLead } from '../lead';

export default function ContactSection() {
  const { openLead } = useLead();
  const q = encodeURIComponent(SITE.mapsQuery);
  return (
    <section className="contact section section--light" id="lien-he">
      <div className="wrap contact__grid">
        <div className="reveal fx-left">
          <h2>Gặp gỡ<br />BYD Thuận Minh Gia Lai</h2>
          <dl className="info">
            <dt>Đại lý</dt><dd>{SITE.dealer}</dd>
            <dt>Hotline</dt><dd><a href={SITE.hotlineTel}>{SITE.hotline}</a></dd>
            <dt>Địa chỉ</dt><dd>{SITE.address}</dd>
            <dt>Giờ hoạt động</dt><dd>{SITE.hours || 'Vui lòng liên hệ hotline để biết giờ làm việc'}</dd>
          </dl>
          <div className="ex__cta">
            <a className="btn btn--dark" href={SITE.hotlineTel}>Gọi điện</a>
            <a className="btn btn--outline" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}>Chỉ đường</a>
            <button className="btn btn--red" onClick={() => openLead('testdrive')}>Đăng ký lái thử</button>
            {SITE.facebook && <a className="btn btn--outline" target="_blank" rel="noopener noreferrer" href={SITE.facebook}>Facebook</a>}
          </div>
          <p className="note">Địa chỉ lấy từ ấn phẩm của đại lý; vui lòng kiểm tra lại bản đồ trước khi đến.</p>
        </div>
        <div className="map reveal fx-clip-up d1">
          <iframe title="Bản đồ BYD Thuận Minh Gia Lai" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${q}&output=embed`} />
        </div>
      </div>
    </section>
  );
}
