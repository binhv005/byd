import { useLead } from '../lead';

export default function AfterSalesSection() {
  const { openLead } = useLead();
  return (
    <section className="after section section--light" id="hau-mai">
      <div className="wrap after__grid">
        <h2 className="reveal fx-left">An tâm<br />trên mọi hành trình</h2>
        <div className="reveal fx-right d1">
          <ul className="plain">
            <li>Tư vấn về bảo dưỡng</li>
            <li>Hỗ trợ tìm hiểu dịch vụ sau bán hàng</li>
            <li>Hướng dẫn liên hệ bộ phận phụ trách</li>
          </ul>
          <p className="note">Thông tin dịch vụ, phụ tùng và chính sách bảo hành sẽ được đại lý xác nhận khi bạn liên hệ.</p>
          <button className="btn btn--dark" onClick={() => openLead('consult', { need: 'Tư vấn dịch vụ hậu mãi' })}>Liên hệ tư vấn dịch vụ</button>
        </div>
      </div>
    </section>
  );
}
