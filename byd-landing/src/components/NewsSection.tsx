import { NEWS } from '../data';

export default function NewsSection() {
  return (
    <section className="news section section--dark" id="tin-tuc">
      <div className="wrap">
        <header className="sec-head sec-head--light reveal fx-left"><h2>Tin tức và trải nghiệm BYD</h2></header>
        <div className="news__grid">
          {NEWS.map((n, i) => (
            <article key={n.title} className={`post reveal fx-zoom d${i}${i === 0 ? ' post--lead' : ''}`}>
              <a href={n.href}>
                <div className="post__img"><img src={n.image} alt={n.alt} loading="lazy" width={1254} height={1009} /></div>
                <p className="eyebrow eyebrow--light">{n.tag}{n.date ? ` · ${n.date}` : ''}</p>
                <h3>{n.title}</h3>
                <p>{n.excerpt}</p>
                <span className="more">Xem chi tiết →</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
