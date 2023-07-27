### Khởi động Backend
- Thiết lập thông tin kết nối db `.env` file
- Run `php artisan migrate`
- Run `php artisan serve`

### Khởi động Frontend
- Run `cd resources/react-fe`
- Run `npm install`
- Run `npm start`
- Mở trình duyệt và truy cập `http://localhost:3000`
- Chú ý, trong file `.env` của react cần thiết lập url backend cho đúng với url backend đang chạy
- Khi thay đổi xong nhớ chạy lại `npm start` để cập nhật lại biến môi trường
