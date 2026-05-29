# Piring Sehat - Frontend

Piring Sehat adalah aplikasi web pelacak kalori bergaya retro (Windows 95/98 UI) yang dibangun untuk membantu pengguna memantau asupan kalori harian mereka. Proyek ini merupakan antarmuka pengguna (Frontend) yang terhubung dengan backend Java Spring Boot dan database Supabase PostgreSQL.

## 🌟 Fitur Utama
- **Autentikasi Aman:** Login/Register via Email, Google, dan GitHub menggunakan Supabase Auth terintegrasi.
- **Calorie Tracker:** Catat makanan harian (sarapan, makan siang, makan malam, camilan) beserta detail makronutrien (protein, karbohidrat, lemak).
- **Retro UI/UX:** Tampilan antarmuka bergaya klasik menggunakan komponen kustom yang diadaptasi untuk pengalaman pengguna modern yang responsif.
- **Interaksi Real-time:** Forum komunitas tempat pengguna dapat berbagi pencapaian dan tips kesehatan.

## 🛠️ Tech Stack
- **Framework:** React 18 + Vite
- **Styling:** Vanilla CSS (Custom Retro System) & Tailwind CSS (Utility)
- **State Management:** React Context (untuk Auth)
- **Database & Auth (BaaS):** Supabase
- **Backend API:** Java Spring Boot (REST MVC)

---

## 🚀 Cara Menjalankan Proyek Secara Lokal (Localhost)

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi Piring Sehat di komputer Anda.

### 1. Persyaratan Sistem
Pastikan Anda telah menginstal perangkat lunak berikut:
- **Node.js** (versi 18 atau lebih baru)
- **npm** (biasanya sudah termasuk dalam instalasi Node.js)
- **Java Development Kit (JDK) 21** (untuk menjalankan backend Spring Boot)

### 2. Kloning Repositori
Buka terminal dan jalankan perintah berikut untuk mengkloning repositori ini:
```bash
git clone https://github.com/iyeppp/piring-sehat-pbo-fe.git
cd piring-sehat-pbo-fe
```

### 3. Konfigurasi Environment Variables
Aplikasi membutuhkan variabel lingkungan agar dapat terhubung dengan Supabase dan Backend API.
Buat file bernama `.env` di folder *root* `piring-sehat-pbo-fe` (sejajar dengan `package.json`), dan isi dengan:

```env
# Koneksi Supabase (Dapatkan dari Supabase Dashboard -> Project Settings -> API)
VITE_SUPABASE_URL=https://[project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...[anon-key-anda]...

# Koneksi Backend Java Spring Boot
VITE_API_BASE_URL=http://localhost:8080
```

### 4. Instalasi Dependensi
Jalankan perintah berikut untuk mengunduh semua *library* yang dibutuhkan:
```bash
npm install
```

### 5. Menjalankan Server Pengembangan Frontend
Untuk menjalankan website di mode pengembangan (*development mode*):
```bash
npm run dev
```
Setelah server berjalan, Vite akan memberikan URL lokal (biasanya `http://localhost:5173`). Buka URL tersebut di browser Anda.

---

### ⚠️ PENTING: Menjalankan Backend API
Agar fitur seperti **Calorie Tracker** berfungsi dengan baik, Anda **WAJIB** menjalankan backend Spring Boot secara bersamaan di terminal terpisah.

1. Buka terminal baru dan masuk ke direktori backend (asumsi repositori backend sejajar dengan frontend):
   ```bash
   cd ../piring-sehat-pbo-be/piring-sehat-api
   ```
2. Pastikan file `src/main/resources/application.properties` di backend sudah terisi dengan kredensial database JDBC Supabase yang benar.
3. Jalankan backend menggunakan Maven Wrapper:
   ```bash
   ./mvnw spring-boot:run
   ```
4. Tunggu hingga terminal menampilkan pesan `Started PiringSehatApiApplication in ... seconds` di port `8080`.

---

## 🤝 Kontribusi
Aplikasi ini dikembangkan sebagai bagian dari tugas Pemrograman Berorientasi Objek (PBO) Semester 4. Semua bentuk masukan dan kontribusi sangat dihargai!
