import { useLead } from '../lead';

export default function VehicleFeatureSection() {
  const { openLead, pickVehicle } = useLead();
  return (
    <section className="feature section section--gray" id="chi-tiet-xe" aria-labelledby="featTitle">
      <div className="wrap feature__grid">
        <div className="feature__media reveal fx-clip">
          <img className="plx" src="assets/m9-interior-poster.webp" alt="Nội thất BYD M9: hàng ghế 2 chỉnh điện, massage và bàn gập" loading="lazy" width={1254} height={1254} />
        </div>
        <div className="feature__text reveal fx-right d1">
          <p className="eyebrow">Xe nổi bật · MPV 7 chỗ</p>
          <h2 id="featTitle">BYD M9<br /><span>Uy thế thượng lưu</span></h2>
          <p>Luxury plug-in hybrid MPV với không gian hàng ghế 2 được chăm chút như khoang hạng thương gia.</p>
          <ul className="spec">
            <li><b>Hàng ghế 2</b><span>Chỉnh điện &amp; massage</span></li>
            <li><b>Tiện nghi</b><span>Bàn gập cho hàng ghế 2</span></li>
            <li><b>Cấu hình</b><span>MPV 7 chỗ</span></li>
            <li><b>Giá &amp; thông số</b><span>Liên hệ nhận báo giá</span></li>
          </ul>
          <div className="ex__cta">
            <button className="btn btn--dark" onClick={() => pickVehicle('m9')}>Khám phá chi tiết</button>
            <button className="btn btn--red" onClick={() => openLead('testdrive', { car: 'BYD M9' })}>Đăng ký lái thử</button>
          </div>
        </div>
      </div>
      <div className="wrap feature__wide reveal fx-clip-up">
        <div className="plxbox"><img className="plx" src="assets/m9-cockpit.webp" alt="Khoang lái BYD M9 với màn hình trung tâm cỡ lớn" loading="lazy" width={1254} height={1009} /></div>
        <p className="cap">Khoang lái BYD M9 — màn hình giải trí cỡ lớn, vô lăng bọc da nâu</p>
      </div>
    </section>
  );
}
