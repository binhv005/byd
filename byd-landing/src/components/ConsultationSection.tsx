import { NEEDS } from '../data';
import { useLead } from '../lead';

export default function ConsultationSection() {
  const { openLead } = useLead();
  return (
    <section className="consult section section--light" id="tu-van">
      <div className="wrap consult__grid">
        <div className="reveal fx-left">
          <h2>Chọn chiếc xe<br />phù hợp với bạn</h2>
          <p className="lead">Đội ngũ tư vấn đồng hành theo nhu cầu sử dụng, ngân sách dự kiến và phương án thanh toán của bạn.</p>
          <div className="ex__cta">
            <button className="btn btn--red" onClick={() => openLead('consult', { need: NEEDS[0] })}>Nhận tư vấn mua xe</button>
            <a className="btn btn--outline" href="#lien-he">Liên hệ đại lý</a>
          </div>
        </div>
        <ul className="topics">
          {NEEDS.slice(0, 4).map((n, i) => (
            <li key={n} className={`reveal fx-right d${i}`}>
              <button onClick={() => openLead('consult', { need: n })}><span>{n}</span><i aria-hidden="true">→</i></button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
