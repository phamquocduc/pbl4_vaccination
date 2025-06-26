# Hệ thống Quản lý Tiêm chủng

Đây là một hệ thống quản lý tiêm chủng toàn diện được xây dựng bằng NestJS cho backend và React cho frontend. Hệ thống cho phép người dùng đặt lịch tiêm chủng, quản lý hồ sơ tiêm chủng và theo dõi lịch sử tiêm chủng của họ.

## Tính năng chính

- Đăng ký và quản lý tài khoản người dùng
- Đặt lịch tiêm chủng và quản lý lịch hẹn
- Quản lý hồ sơ tiêm chủng
- Tích hợp thanh toán qua VNPay
- Quản lý trung tâm tiêm chủng
- Quản lý vaccine và kho vaccine
- Tải lên và lưu trữ hình ảnh qua Cloudinary

## Yêu cầu hệ thống

- Node.js (>= 14.x)
- npm hoặc yarn
- PostgreSQL
- Tài khoản VNPay (cho tích hợp thanh toán)
- Tài khoản Cloudinary (cho lưu trữ hình ảnh)

## Cài đặt và Chạy

### Backend

1. Di chuyển vào thư mục backend:
```bash
cd backend
```

2. Cài đặt các dependencies:
```bash
npm install
```

3. Tạo file .env và cấu hình các biến môi trường cần thiết:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
JWT_SECRET=your_jwt_secret
VNPAY_TMN_CODE=your_vnpay_tmn_code
VNPAY_HASH_SECRET=your_vnpay_hash_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Chạy ứng dụng:
```bash
npm run start:dev
```

### Frontend

1. Di chuyển vào thư mục frontend:
```bash
cd frontend
```

2. Cài đặt các dependencies:
```bash
npm install
```

3. Tạo file .env và cấu hình các biến môi trường:
```env
REACT_APP_API_URL=http://localhost:3000
```

4. Chạy ứng dụng:
```bash
npm start
```

## Tác giả

- Phạm Quốc Đức
- Trần Quang Khải
