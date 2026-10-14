import { useLead } from '../lead';

export default function TestDriveSection() {
  const { openLead } = useLead();
  return (
    <section className="drive" id="lai-thu">
      <img className="plx" src="assets/m9-outdoor.webp" alt="" loading="lazy" width={1254} height={1009} />
      <div className="drive__shade" />
      <div className="wrap drive__content reveal fx-zoom">
        <h2>Cảm nhận sự khác biệt<br />sau tay lái</h2>
        <p>Đăng ký lái thử để trực tiếp khám phá thiết kế, công nghệ và trải nghiệm vận hành của mẫu xe bạn quan tâm.</p>
        <div className="hero__cta">
          <button className="btn btn--red" onClick={() => openLead('testdrive')}>Đăng ký lái thử ngay</button>
          <button className="btn btn--ghost-light" onClick={() => openLead('consult', { need: 'Tư vấn lựa chọn mẫu xe' })}>Tư vấn chọn xe</button>
        </div>
      </div>
    </section>
  );
}
