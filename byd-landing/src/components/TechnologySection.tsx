const ITEMS = [
  { n: '01', t: 'Blade Battery', p: 'Công nghệ pin được BYD giới thiệu tại showroom với các chủ đề an toàn, quãng đường và độ bền.' },
  { n: '02', t: 'Super Hybrid DM-i', p: 'Hệ truyền động hybrid trang bị trên dòng SEALION 5 DM-i.' },
  { n: '03', t: 'Tiện nghi & kết nối', p: 'Màn hình trung tâm cỡ lớn và cụm đồng hồ kỹ thuật số trong khoang lái BYD M9.' },
  { n: '04', t: 'Thông số chính thức', p: 'Liên hệ đại lý để được cung cấp thông số theo từng phiên bản phân phối tại Việt Nam.' },
];

export default function TechnologySection() {
  return (
    <section className="tech section section--dark" id="cong-nghe">
      <div className="wrap">
        <header className="sec-head sec-head--light reveal fx-left">
          <h2>Công nghệ kiến tạo<br />trải nghiệm di chuyển</h2>
        </header>
        <div className="tech__grid">
          <figure className="tech__fig reveal fx-clip">
            <div className="plxbox"><img className="plx" src="assets/sealion6.webp" alt="BYD SEALION 6 cạnh bảng giới thiệu Blade Battery tại showroom" loading="lazy" width={810} height={720} /></div>
            <figcaption>SEALION 6 tại showroom, bên cạnh bảng giới thiệu Blade Battery.</figcaption>
          </figure>
          <ol className="tech__list">
            {ITEMS.map((it, i) => (
              <li key={it.n} className={`reveal fx-right d${i}`}>
                <span>{it.n}</span>
                <div><h3>{it.t}</h3><p>{it.p}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
