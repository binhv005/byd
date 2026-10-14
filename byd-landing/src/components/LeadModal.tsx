import { FormEvent, useEffect, useRef, useState } from 'react';
import { NEEDS, SITE, VEHICLES } from '../data';
import type { LeadMode, LeadPreset } from '../lead';

type Errors = Record<string, string>;
type Status = { kind: 'idle' | 'sending' | 'success' | 'error' | 'demo'; msg: string };

const PHONE_RE = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
const CONTACTS = ['Lái thử tại showroom', 'Gọi điện cho tôi', 'Nhắn tin Zalo/SMS'];

export default function LeadModal({ mode, preset, onClose }: { mode: LeadMode; preset: LeadPreset; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle', msg: '' });
  const drive = mode === 'testdrive';

  useEffect(() => { ref.current?.showModal(); }, []);
  const today = new Date().toISOString().slice(0, 10);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? '').trim();
    const err: Errors = {};
    if (!v('name')) err.name = 'Vui lòng nhập họ và tên.';
    if (!PHONE_RE.test(v('phone').replace(/[\s.\-]/g, ''))) err.phone = 'Số điện thoại chưa đúng định dạng (VD: 0931 612 679).';
    if (!v('car')) err.car = 'Vui lòng chọn mẫu xe.';
    if (drive) {
      if (!v('date')) err.date = 'Vui lòng chọn ngày mong muốn.';
      else if (v('date') < today) err.date = 'Ngày lái thử không được ở quá khứ.';
    }
    if (!f.get('agree')) err.agree = 'Vui lòng đồng ý để đại lý liên hệ.';
    setErrors(err);
    if (Object.keys(err).length) return;
    if (v('website')) return; // honeypot chống spam

    const payload = { type: mode, name: v('name'), phone: v('phone'), car: v('car'), date: v('date'), need: v('need'), contact: v('contact'), note: v('note') };

    // TODO(API): cấu hình SITE.formEndpoint trong src/data.ts. Server cần validate lại + chống spam (rate-limit/captcha).
    if (!SITE.formEndpoint) {
      setStatus({ kind: 'demo', msg: `CHẾ ĐỘ DEMO: chưa kết nối hệ thống nên thông tin CHƯA được gửi. Vui lòng gọi ${SITE.hotline} để đăng ký.` });
      return;
    }
    setStatus({ kind: 'sending', msg: 'Đang gửi…' });
    try {
      const r = await fetch(SITE.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error(String(r.status));
      setStatus({ kind: 'success', msg: 'Đã gửi thông tin. Đại lý sẽ liên hệ với bạn sớm nhất.' });
    } catch {
      setStatus({ kind: 'error', msg: `Gửi không thành công. Vui lòng thử lại hoặc gọi ${SITE.hotline}.` });
    }
  }

  const Err = ({ k }: { k: string }) => <small className="err" role="alert">{errors[k] ?? ''}</small>;
  const done = status.kind === 'success';

  return (
    <dialog ref={ref} className="modal" aria-labelledby="fmTitle" onClose={onClose} onClick={(e) => e.target === ref.current && ref.current?.close()}>
      <form onSubmit={submit} noValidate>
        <button type="button" className="modal__x" aria-label="Đóng" onClick={() => ref.current?.close()}>×</button>
        <h2 id="fmTitle">{drive ? 'Đăng ký lái thử' : 'Nhận tư vấn mua xe'}</h2>
        <p className="modal__sub">{drive ? 'Để lại thông tin, đại lý sẽ liên hệ xác nhận lịch lái thử.' : 'Cho chúng tôi biết nhu cầu của bạn để được tư vấn phù hợp.'}</p>

        <div className="field"><label htmlFor="f_name">Họ và tên *</label><input id="f_name" name="name" autoComplete="name" aria-invalid={!!errors.name} /><Err k="name" /></div>
        <div className="field"><label htmlFor="f_phone">Số điện thoại *</label><input id="f_phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="09xx xxx xxx" aria-invalid={!!errors.phone} /><Err k="phone" /></div>
        <div className="field"><label htmlFor="f_car">Mẫu xe quan tâm *</label>
          <select id="f_car" name="car" defaultValue={preset.car ?? ''} aria-invalid={!!errors.car}>
            <option value="">Chọn mẫu xe</option>
            {VEHICLES.map((v) => <option key={v.id}>{v.name}</option>)}
            <option>Chưa xác định — cần tư vấn</option>
          </select><Err k="car" /></div>
        {drive ? (
          <div className="field"><label htmlFor="f_date">Ngày mong muốn lái thử *</label><input id="f_date" name="date" type="date" min={today} aria-invalid={!!errors.date} /><Err k="date" /></div>
        ) : (
          <div className="field"><label htmlFor="f_need">Nhu cầu</label>
            <select id="f_need" name="need" defaultValue={preset.need ?? NEEDS[0]}>{NEEDS.map((n) => <option key={n}>{n}</option>)}</select></div>
        )}
        <div className="field"><label htmlFor="f_contact">Địa điểm / hình thức liên hệ</label>
          <select id="f_contact" name="contact" defaultValue={drive ? CONTACTS[0] : CONTACTS[1]}>{CONTACTS.map((c) => <option key={c}>{c}</option>)}</select></div>
        <div className="field"><label htmlFor="f_note">Ghi chú (không bắt buộc)</label><textarea id="f_note" name="note" rows={2} /></div>
        <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <label className="check"><input type="checkbox" name="agree" /><span>Tôi đồng ý để BYD Thuận Minh Gia Lai liên hệ tư vấn theo thông tin trên.</span></label>
        <Err k="agree" />

        <div className={`status status--${status.kind}`} role="status" aria-live="polite">{status.msg}</div>
        {done ? (
          <button type="button" className="btn btn--dark btn--block" onClick={() => ref.current?.close()}>Đóng</button>
        ) : (
          <button className="btn btn--red btn--block" type="submit" disabled={status.kind === 'sending'}>{status.kind === 'sending' ? 'Đang gửi…' : 'Gửi đăng ký'}</button>
        )}
      </form>
    </dialog>
  );
}
