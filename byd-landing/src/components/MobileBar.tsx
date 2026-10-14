import { useLead } from '../lead';

export default function MobileBar() {
  const { openLead } = useLead();
  return (
    <div className="mbar">
      <a className="btn btn--ghost-dark" href="tel:0931612679">Gọi tư vấn</a>
      <button className="btn btn--red" onClick={() => openLead('testdrive')}>Lái thử</button>
    </div>
  );
}
