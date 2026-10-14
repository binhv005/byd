import { useEffect, useRef } from 'react';

export default function PrivacyModal({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  return (
    <dialog ref={ref} className="modal" aria-labelledby="pvTitle" onClose={onClose} onClick={(e) => e.target === ref.current && ref.current?.close()}>
      <button type="button" className="modal__x" aria-label="Đóng" onClick={() => ref.current?.close()}>×</button>
      <h2 id="pvTitle">Quyền riêng tư</h2>
      <p>Thông tin bạn nhập vào biểu mẫu (họ tên, số điện thoại, nhu cầu) chỉ được dùng để đại lý liên hệ tư vấn. Bạn có thể yêu cầu ngừng liên hệ bất kỳ lúc nào qua hotline 0931 612 679.</p>
      <p className="note">Nội dung mẫu — đại lý cần thay bằng chính sách quyền riêng tư chính thức.</p>
    </dialog>
  );
}
