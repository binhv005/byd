/* ============================================================
   DỮ LIỆU & CẤU HÌNH — chỉnh sửa tại đây, không cần sửa giao diện.
   Chỉ ghi thông tin đã thấy trên ấn phẩm/hình ảnh của đại lý.
   Mục để trống ("") sẽ được ẩn hoặc hiển thị "Liên hệ".
   ============================================================ */
export const SITE = {
  dealer: 'BYD Thuận Minh Gia Lai',
  hotline: '0931 612 679',
  hotlineTel: 'tel:0931612679',
  // Địa chỉ lấy từ ấn phẩm "Super Hybrid Day" của đại lý — cần đại lý xác nhận lại.
  address: '662A Lê Duẩn, Pleiku, Gia Lai',
  hours: '', // TODO: điền giờ làm việc đã xác minh
  facebook: '', // TODO: URL Facebook chính thức (để trống = ẩn nút)
  mapsQuery: 'BYD Thuận Minh Gia Lai 662A Lê Duẩn Pleiku Gia Lai',
  // TODO: URL API nhận form (POST JSON). Để trống = chế độ DEMO, KHÔNG báo thành công giả.
  formEndpoint: '',
};

export type GroupId = 'all' | 'suv' | 'mpv';

export interface Vehicle {
  id: string;
  name: string;
  group: Exclude<GroupId, 'all'>;
  segment: string;
  tagline: string;
  price: string; // "" => "Liên hệ nhận báo giá"
  highlights: string[];
  images: { src: string; alt: string; fit?: 'cover' | 'contain' }[];
}

export const VEHICLES: Vehicle[] = [
  {
    id: 'm9',
    name: 'BYD M9',
    group: 'mpv',
    segment: 'MPV 7 chỗ · Plug-in hybrid cao cấp',
    tagline: 'Không gian thượng lưu cho những hành trình dài.',
    price: '',
    highlights: [
      'MPV 7 chỗ, định vị Luxury Plug-in Hybrid MPV',
      'Hàng ghế 2 chỉnh điện, có chức năng massage',
      'Bàn gập dành cho hàng ghế 2',
      'Màn hình giải trí cỡ lớn trên bảng điều khiển',
    ],
    images: [
      { src: 'assets/m9-front.webp', alt: 'BYD M9 góc 3/4 phía trước, lưới tản nhiệt chrome' },
      { src: 'assets/m9-outdoor.webp', alt: 'BYD M9 màu trắng tại sự kiện ngoài trời' },
      { src: 'assets/m9-cockpit.webp', alt: 'Khoang lái BYD M9 với màn hình trung tâm cỡ lớn' },
      { src: 'assets/m9-interior-poster.webp', alt: 'Nội thất hàng ghế 2 BYD M9 màu kem', fit: 'contain' },
    ],
  },
  {
    id: 'sealion5',
    name: 'BYD SEALION 5 DM-i',
    group: 'suv',
    segment: 'SUV · Super Hybrid',
    tagline: 'SUV hybrid cho nhịp sống đô thị và những chuyến đi xa.',
    price: '',
    highlights: [
      'Dòng SUV trang bị công nghệ Super Hybrid DM-i',
      'Thiết kế ngoại thất hiện đại, dải đèn LED liền khối',
      'Liên hệ đại lý để biết thông số theo từng phiên bản',
    ],
    images: [{ src: 'assets/sealion5.webp', alt: 'BYD SEALION 5 DM-i màu trắng góc 3/4 phía trước' }],
  },
  {
    id: 'sealion6',
    name: 'BYD SEALION 6',
    group: 'suv',
    segment: 'SUV · Hybrid',
    tagline: 'SUV mang đậm tinh thần công nghệ của BYD.',
    price: '',
    highlights: [
      'Từng được giới thiệu tại sự kiện Super Hybrid Day của đại lý',
      'Showroom trưng bày thông tin Blade Battery',
      'Liên hệ đại lý để biết thông số theo từng phiên bản',
    ],
    images: [{ src: 'assets/sealion6.webp', alt: 'BYD SEALION 6 màu trắng tại showroom BYD Thuận Minh Gia Lai' }],
  },
];

/* Chỉ nhóm đã có xe xác minh. Thêm "sedan" khi có dữ liệu. */
export const thumb = (src: string) => src.replace('assets/', 'assets/thumbs/');

export const GROUPS: { id: GroupId; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'suv', label: 'SUV' },
  { id: 'mpv', label: 'MPV' },
];

/* Tin tức — DỮ LIỆU MẪU, thay bằng bài thực tế. */
export const NEWS = [
  { tag: 'Sự kiện', title: 'Super Hybrid Day tại BYD Thuận Minh Gia Lai', excerpt: 'Khách hàng tìm hiểu công nghệ hybrid và trực tiếp xem xe tại showroom Pleiku.', date: '', image: 'assets/showroom-event.webp', alt: 'Buổi giới thiệu xe BYD SEALION 6 tại showroom', href: '#lien-he' },
  { tag: 'Sản phẩm', title: 'BYD M9 — Uy thế thượng lưu', excerpt: 'Khám phá không gian hàng ghế 2 chỉnh điện, massage và bàn gập tiện nghi.', date: '', image: 'assets/m9-outdoor.webp', alt: 'BYD M9 màu trắng', href: '#kham-pha-xe' },
  { tag: 'Sản phẩm', title: 'BYD SEALION 5 DM-i — Super Hybrid', excerpt: 'Dòng SUV hybrid dành cho nhịp sống hiện đại.', date: '', image: 'assets/sealion5.webp', alt: 'BYD SEALION 5 DM-i màu trắng', href: '#kham-pha-xe' },
];

export const NEEDS = [
  'Tư vấn lựa chọn mẫu xe',
  'Nhận báo giá theo phiên bản',
  'Tư vấn phương án trả góp',
  'Tìm hiểu chính sách ưu đãi hiện hành',
  'Tư vấn dịch vụ hậu mãi',
];
