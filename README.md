# Karang Taruna Backend API

Backend API untuk aplikasi Karang Taruna Website menggunakan Express.js dan MongoDB.

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Buat file `.env` dan konfigurasi:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/karang-taruna
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

3. Jalankan seed untuk membuat user awal:
```bash
npm run seed
```

4. Jalankan server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (require token)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

## Default Users

Setelah menjalankan seed, akan dibuat 2 user:

1. **Admin**
   - Email: admin@email.com
   - Password: admin123
   - Role: admin

2. **User Biasa**
   - Email: user@email.com
   - Password: user123
   - Role: user

## Struktur Database

### Users Collection
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  role: String ('user' | 'admin'),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```
