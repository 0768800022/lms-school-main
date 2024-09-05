# lms-school

## Cài Đặt

1. **Cài đặt Node.js 18:**
    - Tải về và cài đặt nvm:
    ```bash
    https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe
    ```
    - Khởi động terminal cài đặt Node.js 18:
    ```bash
    nvm install 18
    ```
   - Đặt phiên bản Node.js 18 làm phiên bản mặc định:
    ```bash
    nvm use 18
    ```

   - Kiểm tra xem Node.js đã được cài đặt chính xác bằng lệnh:
    ```bash
    node -v
    ```

2. **Cài đặt dependencies:**
    - Cài đặt yarn
    ```bash
    npm install --global yarn
    ```
    - Cài đặt dependencies
    ```bash
    yarn
    ```

4. **Cài Đặt Extension Prettier Eslint cho Visual Studio Code:**
    - Mở Visual Studio Code.
    - Truy cập thanh bên trái và chọn biểu tượng Extensions (hoặc nhấn `Ctrl + Shift + X`).
    - Tìm kiếm "Prettier Eslint" trong hộp tìm kiếm.
    - Chọn "Prettier Eslint".
    - Nhấn nút "Install" để cài đặt extension.

## Chạy ứng dụng

Sau khi cài đặt xong, chạy ứng dụng bằng cách sử dụng lệnh:
```bash
yarn dev
```
Sau khi ứng dụng đã chạy, mở trình duyệt và truy cập http://localhost:3003.

## Debugging
- Truy cập thanh bên trái và chọn biểu tượng Debug (hoặc nhấn `Ctrl + Shift + D`).
- Chọn debug `Server-side` hoặc `Full-stack`,
- Nhấn `F5` hoặc chọn "Start Debugging" từ thanh công cụ để bắt đầu quá trình debug.

## Cấu trúc thư mục

- **`pages/`**: Chứa các trang của ứng dụng. Tên file trong thư mục này tương ứng với URL của trang.
- **`components/`**: Chứa các thành phần React tái sử dụng.
- **`styles/`**: Chứa các file CSS hoặc SCSS cho giao diện của ứng dụng.
- **`public/`**: Thư mục này chứa các tài nguyên tĩnh như hình ảnh, font chữ, ...
