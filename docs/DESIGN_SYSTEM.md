# Design System & Brand Identity

Tài liệu quy định hệ thống thiết kế và nhận diện thương hiệu cho dự án Task Management System.

## 1. Color Palette (Bảng Màu)

Dựa trên Logo chính thức, bảng màu chủ đạo (Brand Colors) được quy định như sau:

| Tên Màu | Mã Hex | Vai trò (Role) | Sử dụng (Usage) |
| :--- | :--- | :--- | :--- |
| **Deep Navy** | `#000c44` | **Primary (Chủ đạo)** | Header, Footer, Tiêu đề chính, Nút chính (trạng thái thường), Text quan trọng. |
| **Vibrant Red** | `#f24855` | **Secondary / Accent** | Điểm nhấn, Nút Call-to-Action (CTA), Thông báo quan trọng, Hover state. |
| **White** | `#ffffff` | **Background** | Nền trang, Nền thẻ (Card), Text trên nền tối. |
| **Black** | `#000000` | **Neutral / Text** | Văn bản chính (Body text), Viền (Border). |

---

## 2. Cấu hình Tailwind CSS (Proposed)

Để sử dụng các màu này trong code, ta sẽ cấu hình `tailwind.config.ts` như sau:

```typescript
// frontend/tailwind.config.ts

theme: {
  extend: {
    colors: {
      // Màu chủ đạo - Xanh đậm
      primary: {
        DEFAULT: "#000c44",
        50: "#e6e7f0",
        100: "#c1c4d9", // Nhạt hơn để làm nền
        900: "#000622", // Đậm hơn để làm shadow
      },
      // Màu điểm nhấn - Đỏ
      accent: {
        DEFAULT: "#f24855",
        hover: "#d63a45", // Màu khi di chuột vào (đậm hơn chút)
      },
      // Màu trung tính
      dark: "#000000",
      light: "#ffffff",
    }
  }
}
```

## 3. Ví dụ áp dụng

*   **Nút Đăng Nhập (Login Button):**
    *   Background: `bg-primary` (#000c44)
    *   Text: `text-white`
    *   Hover: `hover:bg-primary/90`

*   **Nút Đăng Ký (Register Button) - Muốn nổi bật:**
    *   Background: `bg-accent` (#f24855)
    *   Text: `text-white`

*   **Header:**
    *   Background: `bg-white` hoặc `bg-primary` (nếu muốn header tối).
    *   Text: `text-primary` (nếu nền trắng).

*   **Tiêu đề (Heading):**
    *   Color: `text-primary`
    *   Font-weight: `font-bold`
