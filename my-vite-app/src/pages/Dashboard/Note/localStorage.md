# Giải thích về `localStorage` trong trình duyệt

## ✅ `localStorage` là gì?

`localStorage` **không phải là một hàm**, mà là một **đối tượng toàn cục (global object)** do trình duyệt cung cấp.

- Nó là một **object** cung cấp khả năng **lưu trữ dữ liệu vĩnh viễn** (persistent) trên trình duyệt dưới dạng **key–value (chuỗi)**.
- Dữ liệu **không mất đi sau khi reload hoặc đóng tab**, trừ khi bị xóa thủ công hoặc bởi trình duyệt.

## 📦 Cách dùng `localStorage`

Lấy giá trị ra:

```ts
const farmName = localStorage.getItem("farmName"); // "Trại A"`
```

Xoá một giá trị theo key:

```ts
`localStorage.removeItem("farmName");
```

Xoá toàn bộ dữ liệu đã lưu:

```ts
localStorage.clear();
```

Ví dụ dùng localStorage trong hàm getFarmInfo

```ts
function getFarmInfo() {
  return {
    farmName: localStorage.getItem("farmName") || "",
    farmId: Number(localStorage.getItem("farmId")),
  };
}
```

| `farmName` | Lấy **tên trang trại** mà người dùng đã chọn hoặc đăng nhập gần nhất. Thường được hiển thị ở giao diện dashboard để người dùng biết họ đang xem trang trại nào. |
| `farmId` | Lấy **ID số của trang trại** để dùng khi gọi các API. Đây là khóa chính quan trọng để truy vấn dữ liệu liên quan đến ao, tủ điện, cảnh báo, v.v... |

Giả sử khi người dùng chọn trang trại, ứng dụng lưu vào localStorage:

```ts
localStorage.setItem("farmName", "Trang trại Bình An");
localStorage.setItem("farmId", "101");
```

Khi Dashboard.jsx chạy:

```ts
const farmName = localStorage.getItem("farmName") || "";
const farmId = Number(localStorage.getItem("farmId"));
```

kết quả là:

```ts
farmName = "Trang trại Bình An"
farmId = 101
📦 Sử dụng trong Dashboard
```

farmName hiển thị trên UI:

```ts
<h1>Trang trại: {farmName}</h1>
farmId được truyền vào các API:
```

```ts
DashboardRequestApi.pondRequest.getPondRequestByFarmId(farmId);
```

⚠️ Kiểm tra dữ liệu hợp lệ
Nếu farmName trống, hệ thống sẽ hiển thị cảnh báo và không gọi API:

```ts
if (!farmName || farmName.trim() === "") {
  setIsLoading(false);
  toast.error("Vui lòng chọn một trang trại!");
  return;
}
```
