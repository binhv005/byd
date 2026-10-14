import { useEffect, useMemo, useState } from 'react';
import { GROUPS, GroupId, VEHICLES, thumb } from '../data';
import { useLead } from '../lead';

export default function VehicleExplorer({ picked }: { picked: { id: string; n: number } | null }) {
  const { openLead } = useLead();
  const [group, setGroup] = useState<GroupId>('all');
  const [id, setId] = useState(VEHICLES[0].id);
  const [shot, setShot] = useState(0);
  const [fade, setFade] = useState(false);

  const list = useMemo(() => VEHICLES.filter((v) => group === 'all' || v.group === group), [group]);
  const car = list.find((v) => v.id === id) ?? list[0];

  // Chọn xe từ menu / nút "Khám phá chi tiết"
  useEffect(() => {
    if (picked) { setGroup('all'); select(picked.id); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked]);

  function swap(fn: () => void) {
    setFade(true);
    window.setTimeout(() => { fn(); setFade(false); }, 160);
  }
  function select(next: string) { if (next !== car?.id) swap(() => { setId(next); setShot(0); }); }
  function changeGroup(g: GroupId) {
    if (g === group) return;
    const first = VEHICLES.find((v) => g === 'all' || v.group === g);
    swap(() => { setGroup(g); if (first) { setId(first.id); setShot(0); } });
  }

  const img = car.images[shot] ?? car.images[0];

  return (
    <section className="explorer section section--light" id="kham-pha-xe">
      <div className="wrap">
        <header className="sec-head reveal fx-left">
          <h2>Khám phá thế giới BYD</h2>
          <p>Lựa chọn mẫu xe phù hợp với nhu cầu di chuyển, phong cách và trải nghiệm công nghệ của bạn.</p>
        </header>

        <div className="tabs reveal fx-clip" role="tablist" aria-label="Lọc theo kiểu thân xe">
          {GROUPS.map((g) => (
            <button key={g.id} role="tab" aria-selected={group === g.id} className={group === g.id ? 'on' : ''} onClick={() => changeGroup(g.id)}>
              {g.label}
            </button>
          ))}
        </div>

        <div className={`ex${fade ? ' is-fading' : ''}`}>
          <div className="ex__stage reveal fx-left">
            <div className={`ex__frame${img.fit === 'contain' ? ' is-contain' : ''}`}><img src={img.src} alt={img.alt} width={1254} height={1009} /></div>
            {car.images.length > 1 && (
              <div className="ex__thumbs" role="group" aria-label="Góc nhìn khác">
                {car.images.map((im, i) => (
                  <button key={im.src} className={i === shot ? 'on' : ''} aria-label={`Xem ảnh ${i + 1}`} aria-pressed={i === shot} onClick={() => setShot(i)}>
                    <img src={thumb(im.src)} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="ex__info reveal fx-right d1" aria-live="polite">
            <p className="eyebrow">{car.segment}</p>
            <h3>{car.name}</h3>
            <p className="ex__tag">{car.tagline}</p>
            <ul className="ex__list">{car.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            <p className="ex__price">{car.price || 'Liên hệ nhận báo giá'}</p>
            <div className="ex__cta">
              <button className="btn btn--dark" onClick={() => openLead('consult', { car: car.name, need: 'Tư vấn lựa chọn mẫu xe' })}>Khám phá xe</button>
              <button className="btn btn--outline" onClick={() => openLead('consult', { car: car.name, need: 'Nhận báo giá theo phiên bản' })}>Nhận báo giá</button>
              <button className="btn btn--red" onClick={() => openLead('testdrive', { car: car.name })}>Đăng ký lái thử</button>
            </div>
          </div>
        </div>

        <ul className="models reveal fx-zoom" aria-label="Chọn mẫu xe">
          {list.map((v) => (
            <li key={v.id}>
              <button className={v.id === car.id ? 'on' : ''} aria-pressed={v.id === car.id} onClick={() => select(v.id)}>
                <img src={thumb(v.images[0].src)} alt="" loading="lazy" width={160} height={129} />
                <span>{v.name}</span>
                <small>{v.segment.split(' · ')[0]}</small>
              </button>
            </li>
          ))}
        </ul>
        <p className="note">Danh mục hiển thị các mẫu xe đại lý đang giới thiệu. Thông số và giá theo từng phiên bản — vui lòng liên hệ đại lý để được xác nhận.</p>
      </div>
    </section>
  );
}
