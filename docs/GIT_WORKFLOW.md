# Git Workflow & Naming Convention

Tài liệu này quy định quy tắc đặt tên nhánh (Branch) và quy tắc viết Commit Message cho dự án Task Management System.

## 1. Quy Tắc Đặt Tên Nhánh (Branch Naming)

Cấu trúc: `SCOPE_TYPE/tên-nhánh-ngắn-gọn` (Sử dụng `snake_case` hoặc `kebab-case` cho phần tên).

### Các thành phần:

*   **SCOPE**: Phạm vi tác động của nhánh (Viết hoa).
    *   `FE`: Frontend (Giao diện React/Next.js).
    *   `BE`: Backend (API, Database, Logic Hono).
    *   `SHARED`: Cả hai hoặc thư mục shared (ví dụ sửa Schema).
    *   `DOCS`: Tài liệu.

*   **TYPE**: Loại công việc (Viết thường).
    *   `feat`: Tính năng mới (Feature).
    *   `fix`: Sửa lỗi (Bug fix).
    *   `ref`: Tối ưu code (Refactor - không đổi logic).
    *   `chore`: Công việc linh tinh (Update package, config...).

### Ví dụ:

*   `FE_feat/login` -> Làm tính năng Login phía Frontend.
*   `BE_feat/env_file` -> Cấu hình file môi trường cho Backend.
*   `FE_ref/register_page` -> Refactor code trang Register.
*   `BE_fix/login_error` -> Sửa lỗi API Login.
*   `SHARED_feat/update_schema` -> Cập nhật User Schema.

---

## 2. Quy Tắc Viết Commit Message (Commit Convention)

Cấu trúc: `[scope][type]: <description>`

### Giải thích:

*   **scope**: Phạm vi thay đổi (viết thường).
    *   `frontend`
    *   `backend`
    *   `shared`
    *   `docs`
*   **type**: Loại thay đổi (như phần Branch).
    *   `feat`: Tính năng mới.
    *   `fix`: Sửa lỗi.
    *   `ref`: Refactor code.
    *   `style`: Sửa giao diện, format (CSS, space).
    *   `docs`: Sửa tài liệu.
    *   `chore`: Config, build script...

### Ví dụ:

*   `[frontend][feat]: create login page UI`
*   `[backend][feat]: implement login api with jwt`
*   `[shared][feat]: add login schema`
*   `[frontend][ref]: use input component for register page`
*   `[backend][fix]: update env path configuration`

---

## 3. Quy Trình Làm Việc (Workflow)

1.  **Cập nhật code mới nhất từ nhánh chính (dev/main):**
    ```bash
    git switch dev
    git pull origin dev
    ```

2.  **Tạo nhánh mới để làm việc:**
    ```bash
    git checkout -b FE_feat/login_page
    ```

3.  **Code và Commit:**
    ```bash
    git add .
    git commit -m "[frontend][feat]: implement login page layout"
    ```

4.  **Cập nhật code mới nhất về nhánh mình (đề phòng xung đột):**
    ```bash
    git pull origin dev  # (Xử lý conflict nếu có)
    ```

5.  **Đẩy code lên (Push):**
    ```bash
    git push origin FE_feat/login_page
    ```

6.  **Tạo Pull Request (PR) trên GitHub để merge vào `dev`.**
