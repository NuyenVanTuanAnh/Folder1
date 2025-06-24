# Giải thích hàm `fetchData` trong `Dashboard.jsx`

## 📌 Mục tiêu:

Hàm `fetchData` dùng để tải dữ liệu chính của dashboard, bao gồm:

- Danh sách loại ao (pond types)
- Danh sách ao (ponds)
- Ao đang hoạt động
- Ngày vệ sinh cảm biến
- Trạng thái kết nối tủ điện 1 & 2

---

## 🔧 1. Khai báo hàm và kiểm tra `farmName`

```tsx
const fetchData = useCallback(() => {
  if (!farmName || farmName.trim() === "") {
    //trim() loại bỏ khoảng trắng
    setIsLoading(false);
    toast.error("Vui lòng chọn một trang trại!");
    return;
  }
```

> 🔸 Nếu người dùng chưa chọn trang trại → ngăn gọi API và báo lỗi.

---

## 🔁 2. Gọi 6 API song song

```tsx
  callApi(
    [
      DashboardRequestApi.pondTypeRequest.getPondTypeRequestByFamrId(farmId), //Lấy danh sách loại ao (pondTypes)
      DashboardRequestApi.pondRequest.getPondRequestByFarmId(farmId),//Lấy danh sách ao
      DashboardRequestApi.pondRequest.getPondRequestByStatus(farmId, 1),//Lấy danh sách ao đang hoạt động
      DashboardRequestApi.timeRequest.getTimeCleaning(farmId),//Lấy thời gian lần vệ sinh cảm biến gần nhất
      AlarmRequestApi.alarmRequest.getStatusCabin(farmId, "ESP tủ điện 1"),//Lấy trạng thái tủ điện 1
      AlarmRequestApi.alarmRequest.getStatusCabin(farmId, "ESP tủ điện 2"),//Lấy trạng thái tủ điện 2
    ],
    //kết quả trả về
    (res) => {
      ...
    },
    (err) => {
      ...
    }
  );
```

> ✅ Gọi 6 API và nhận kết quả qua `res = [res0, res1, ..., res5]`

---

## ✅ 3. Xử lý dữ liệu trả về

```tsx
setPondTypes(res[0] || []); //loại ao đang có
setPonds(res[1] || []); // danh sách tất cả ao
setActivePonds(res[2]?.length || 0); //số lượng ao đang hoạt động
```

---

## 🧮 4. Tính số ngày kể từ lần vệ sinh cảm biến

```tsx
const lastCleaningTime = new Date(res[3].cleanTime);
const currentTime = new Date();
const days = Math.floor(
  (currentTime - lastCleaningTime) / (1000 * 60 * 60 * 24)
);
setDaysOperated(days);
if (days >= 60) {
  setNeedsCleaning(true);
} else {
  setNeedsCleaning(false);
}
```

---

## ⚙️ 5. Cập nhật trạng thái tủ điện

```tsx
setCabinData((prevData) => {
  const updatedData = [...prevData];
  updatedData[0] = {
    ...updatedData[0],
    status: cabinStatusMapping["Tủ điện 1"][res[4].status] || "Offline",
  };
  updatedData[1] = {
    ...updatedData[1],
    status: cabinStatusMapping["Tủ điện 2"][res[5].status] || "Offline",
  };
  return updatedData;
});
```

---

## ❌ 6. Xử lý lỗi nếu gọi API thất bại

```tsx
(err) => {
  toast.error("Không thể tải dữ liệu từ API!");
  console.error("Lỗi", err);
  setIsLoading(false);
};
```

---

## 🔁 7. Gọi tự động khi `Dashboard` render

```tsx
useEffect(() => {
  fetchData();
}, [fetchData]);
```

---

## 🎯 8. Hàm `handleSelected`

```tsx
const handleSelected = (pondTypeId, pondTypeName) => {
  setSelectedPondTypeId(pondTypeId);
  setSelectedPondTypeName(pondTypeName);
};
```

---

## ✅ Tổng kết

| Phần                   | Chức năng                                           |
| ---------------------- | --------------------------------------------------- |
| Kiểm tra `farmName`    | Ngăn gọi API nếu chưa chọn trang trại               |
| `callApi([...])`       | Gọi đồng thời 6 API chính                           |
| Xử lý `res`            | Cập nhật state: loại ao, ao, số ngày vệ sinh, cabin |
| `useEffect(fetchData)` | Gọi dữ liệu khi dashboard hiển thị                  |
| `handleSelected()`     | Ghi nhớ loại ao khi người dùng thao tác             |
