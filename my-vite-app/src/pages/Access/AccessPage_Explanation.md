
# 📄 Giải Thích Chi Tiết `Access.jsx`

## 🧾 Tổng quan chức năng
Page `Access` thực hiện chức năng **truy xuất nguồn gốc lô tôm** trong một trại nuôi, với khả năng:
- Chọn mã lô (`seedId`) và lần thu hoạch (`harvestTime`)
- Hiển thị thông tin chi tiết như: ao nuôi, size tôm, giấy chứng nhận, số ngày nuôi, v.v.
- Hiển thị và tải mã QR
- Tải giấy chứng nhận dạng PDF

---

## 🧱 1. Cấu trúc thư viện sử dụng

| Thư viện | Mục đích |
|---------|----------|
| `react-router-dom` | Điều hướng |
| `qrcode.react` | Tạo mã QR |
| `jspdf` | Tạo file PDF từ ảnh (base64) |
| `react-toastify` | Thông báo dạng toast |
| `useCallApi` | Hook tự định nghĩa để gọi API |
| `Sidebar`, `Loading` | Các component con đã tách riêng |

---

## 🧠 2. Khởi tạo và quản lý trạng thái

```tsx
const [data, setData] = useState(null);
const [seedOptions, setSeedOptions] = useState([]);
const [harvestTimeOptions, setHarvestTimeOptions] = useState([]);
const [selectedLot, setSelectedLot] = useState('');
const [selectedHarvestTime, setSelectedHarvestTime] = useState('');
const [showQRCode, setShowQRCode] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [formData, setFormData] = useState({ seedId: '', harvestTime: '0' });
```
- Quản lý dữ liệu form và trạng thái loading
- `data` là thông tin được trả về từ API sau khi người dùng chọn mã lô và lần thu hoạch
- `qrCodeRef` là `useRef` dùng để lấy ảnh mã QR từ canvas để tải về

---

## 🔄 3. API Call

### a. Lấy danh sách mã lô (seedId)
```tsx
AccessRequestApi.AccessRequest.getSeedIdList(farmId)
```

### b. Lấy danh sách lần thu hoạch (harvestTime)
```tsx
AccessRequestApi.AccessRequest.getTimeHarvestList(farmId)
```

### c. Lấy dữ liệu truy xuất nguồn gốc
```tsx
AccessRequestApi.AccessRequest.getAccessRequestBySeedId(selectedLot, selectedHarvestTime, farmId)
```

---

## 🧮 4. Giao diện người dùng

### a. Form chọn thông tin
- Hai `<select>`: `Chọn lô`, `Chọn lần thu hoạch`
- Nút **"Tìm kiếm thông tin"** gọi hàm `fetchData()`

### b. Hiển thị kết quả
- Thông tin cơ bản (mã ao, size, số lượng, địa chỉ…)
- Danh sách giấy chứng nhận (base64) → có nút tải PDF
- Mã QR chứa thông tin truy xuất → có nút tải ảnh PNG

---

## 🧾 5. QR Code & PDF Export

### a. QR Code
```tsx
<QRCodeCanvas ref={qrCodeRef} value={generateQRCodeData()} size={200} />
```

### b. Tải QR
```tsx
const imageURI = canvas.toDataURL('image/png');
```

### c. Tải giấy chứng nhận (PDF)
```tsx
pdf.addImage(base64, 'JPEG', 10, 10, 180, 160);
```

---

## 🧠 6. Các hàm quan trọng

| Tên hàm | Vai trò |
|--------|--------|
| `fetchLotOptions`, `fetchHarvestTimes` | Lấy danh sách options |
| `fetchData` | Lấy dữ liệu truy xuất |
| `handleInputChange` | Cập nhật form |
| `generateQRCodeData` | Tạo nội dung mã QR |
| `downloadQRCode` | Tải mã QR |
| `downloadCertificateAsPDF` | Tải giấy chứng nhận |
| `handleSubmit` | Submit form tìm kiếm |

---

## ✅ 7. Ưu điểm
- Viết rõ ràng, chia hàm tốt, tách logic ra khỏi giao diện
- Có dùng `useCallback` để tránh render lại không cần thiết
- Hiển thị QR và PDF tiện lợi

---

## ⚠️ 8. Gợi ý cải tiến
- Có thể thêm loading riêng cho QR hoặc certificates nếu muốn tối ưu UX
- Sử dụng `React Hook Form` + `Yup` để validate form hiệu quả hơn
- Dùng `useMemo` cho `generateQRCodeData` để tránh tính lại khi không cần thiết

---

## 📌 Ghi chú
Bạn có thể tiếp tục tách component `QRSection`, `CertificateList`, `TraceInfo` nếu muốn tái sử dụng hoặc làm gọn lại file chính.
