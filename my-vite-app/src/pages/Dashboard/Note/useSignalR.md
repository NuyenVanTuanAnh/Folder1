```ts
useSignalR(handleCabinStatusChanged);
```

✅ Chức năng
Đây là hook tùy chỉnh (custom hook) được gọi để:

Kết nối đến máy chủ SignalR và lắng nghe sự kiện cabin trả về, sau đó xử lý sự kiện đó bằng handleCabinStatusChanged.

🔧 Tưởng tượng cụ thể:
📡 1. useSignalR(...) làm gì?
Mặc định nó:

Tạo kết nối tới máy chủ SignalR (WebSocket)

Đăng ký lắng nghe một số sự kiện (ví dụ "CabinStatusChanged")

Khi sự kiện đó được gửi từ server, nó sẽ gọi hàm handleCabinStatusChanged(data)

🧩 Trong Dashboard.jsx, câu này nghĩa là:

```ts
useSignalR(handleCabinStatusChanged);
```

→ Mỗi khi server gửi sự kiện "CabinStatusChanged", hàm handleCabinStatusChanged(data) sẽ được gọi để:

Cập nhật trạng thái tủ điện

Trigger animation trong UI

🟡 Lưu ý:
useSignalR là custom hook, bạn có thể tìm trong thư mục hooks/useSignalR.ts

Được gắn vào vòng đời của component (useEffect) → tự kết nối khi Dashboard mount, và ngắt khi unmount
