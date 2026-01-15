# Hướng dẫn Kiểm tra Lỗi Đăng nhập Vercel

## 🔍 Tình huống

Bạn đã thử:
- ✅ Mật khẩu đúng: `admin123`
- ✅ Trình duyệt khác
- ❌ Vẫn bị redirect về `/login?callbackUrl=...`

→ **Vấn đề chắc chắn nằm ở Vercel configuration**

## 📋 Bước 1: Kiểm tra Environment Variables trong Vercel

### Truy cập Vercel Dashboard

1. Vào https://vercel.com/dashboard
2. Click vào project **wg-website**
3. Click tab **Settings** (thanh menu trên)
4. Click **Environment Variables** (menu bên trái)

### Kiểm tra các biến sau:

| Tên biến | Giá trị | Môi trường |
|----------|---------|------------|
| `NEXTAUTH_SECRET` | `hpqxRbrr40pZvENWaTWCKg70L5gpGtLCcDTD4z0X+54=` | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://wgi.vn` | Production |
| `RESEND_API_KEY` | (API key của bạn) | All |
| `SALES_EMAIL` | `tani.nguyen1989@gmail.com` | All |

> [!IMPORTANT]
> **Nếu thiếu bất kỳ biến nào → Đó là nguyên nhân!**
> 
> Đặc biệt `NEXTAUTH_SECRET` và `NEXTAUTH_URL` là BẮT BUỘC để login hoạt động.

### Cách thêm Environment Variable:

1. Click nút **"Add New"**
2. Nhập **Name**: `NEXTAUTH_SECRET`
3. Nhập **Value**: `hpqxRbrr40pZvENWaTWCKg70L5gpGtLCcDTD4z0X+54=`
4. Chọn **Environments**: ✓ Production ✓ Preview ✓ Development
5. Click **"Save"**

Lặp lại cho từng biến còn thiếu.

## 📋 Bước 2: Kiểm tra Deployment Logs

### Xem Function Logs:

1. Trong project Vercel, click tab **Deployments**
2. Click vào deployment mới nhất (màu xanh "Ready")
3. Click tab **"Functions"**
4. Click vào function `/api/auth/[...nextauth]`
5. Scroll xuống phần **"Logs"**

### Tìm thông tin debug:

Sau khi bạn thử login, refresh trang logs và tìm:

```
[AUTH] Login attempt: { username: 'admin' }
[USERS] Verifying password for: admin
[USERS] User found, comparing password hash
[USERS] Password comparison result: true/false
[AUTH] Password verification result: true/false
```

**Phân tích kết quả:**

- Nếu **KHÔNG thấy logs** → NextAuth không chạy được → Thiếu `NEXTAUTH_SECRET`
- Nếu thấy `[USERS] User not found` → File `data/users.json` không deploy
- Nếu thấy `Password comparison result: false` → Mật khẩu sai hoặc bcrypt lỗi
- Nếu thấy `Password comparison result: true` nhưng vẫn fail → Lỗi session/cookie

## 📋 Bước 3: Trigger Redeploy

Sau khi thêm environment variables:

1. Vào tab **Deployments**
2. Tìm deployment mới nhất
3. Click **•••** (three dots)
4. Click **"Redeploy"**
5. Chọn **"Use existing Build Cache"** → Click **"Redeploy"**

Đợi 2-3 phút để deployment hoàn tất.

## 📋 Bước 4: Test lại Login

1. Mở trình duyệt ẩn danh (Incognito)
2. Vào https://wgi.vn/login
3. Nhập:
   - Username: `admin`
   - Password: `admin123`
4. Click Sign In

## ❗ Nếu vẫn không được

Hãy chụp màn hình và gửi tôi:

1. **Environment Variables page** trong Vercel Settings
   - Để tôi verify các biến đã set đúng
   
2. **Function Logs** từ `/api/auth/[...nextauth]`
   - Để tôi xem chính xác lỗi gì

3. **Deployment status** 
   - Để confirm deployment đã hoàn tất

## 🎯 Khả năng cao nhất

Theo kinh nghiệm, **99% khả năng** là bạn chưa thêm environment variables vào Vercel.

NextAuth cần `NEXTAUTH_SECRET` để mã hóa session tokens. Không có nó sẽ fail ngay lập tức.

---

**Tóm lại:**
1. ✅ Thêm environment variables (đặc biệt `NEXTAUTH_SECRET` và `NEXTAUTH_URL`)
2. ✅ Redeploy
3. ✅ Test login lại

Nếu làm đúng 3 bước này, login sẽ work 100%.
