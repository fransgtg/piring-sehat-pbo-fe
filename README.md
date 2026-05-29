# Piring Sehat - Frontend (React + Vite)

Aplikasi web bergaya **Retro (Windows 95/98)** untuk memantau kesehatan Anda, melacak kalori, menghitung BMI, dan berdiskusi di forum komunitas. Proyek ini dibangun menggunakan **React** dengan **Vite** dan di-styling menggunakan **Tailwind CSS**.

Aplikasi ini terintegrasi dengan **Backend Java Spring Boot** untuk operasi database dan logika bisnis, serta menggunakan **Supabase** untuk autentikasi pengguna.

## 🚀 Fitur Utama
- **Autentikasi:** Login dan Registrasi menggunakan Email, Google, atau Github (via Supabase).
- **Calorie Tracker:** Lacak asupan kalori harian Anda dengan kalender interaktif bergaya retro. Data disimpan permanen ke database melalui backend Spring Boot.
- **Kalkulator Kesehatan:** Hitung BMI (Body Mass Index) dan kebutuhan kalori harian Anda.
- **Community Forum:** Berdiskusi dengan pengguna lain dalam antarmuka forum bergaya klasik.
- **UI Retro:** Antarmuka unik yang membawa nostalgia sistem operasi klasik.

## 🛠️ Teknologi yang Digunakan
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (dengan custom retro UI components)
- **Autentikasi:** Supabase Auth
- **Routing:** React Router (atau state-based routing)

## 📦 Prasyarat (Prerequisites)
Sebelum menjalankan aplikasi, pastikan Anda telah menginstal:
- **Node.js** (versi 16 atau lebih baru disarankan)
- **npm** (biasanya sudah termasuk dalam Node.js)
- **Java Development Kit (JDK)** versi 21 (untuk menjalankan backend Spring Boot)
- **Maven** (opsional, sudah disediakan Maven Wrapper `mvnw` di backend)

## ⚙️ Konfigurasi Environment (Frontend)
Buat sebuah file bernama `.env` di root folder `piring-sehat-pbo-fe` (sejajar dengan `package.json`). Isi file tersebut dengan kredensial Supabase Anda dan URL Backend:

```env
VITE_SUPABASE_URL=https://[project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI... (Kunci anonim Supabase Anda)
VITE_API_BASE_URL=http://localhost:8080
```



## 🏃‍♂️ Cara Menjalankan Proyek di Localhost

Karena aplikasi ini bergantung pada Backend Java, Anda harus menjalankan kedua server (Backend dan Frontend) secara bersamaan.

### Langkah 1: Jalankan Backend (Java Spring Boot)
1. Buka terminal baru.
2. Masuk ke direktori backend:
   ```bash
   cd piring-sehat-pbo-be/piring-sehat-api
   ```
3. Pastikan Anda sudah mengkonfigurasi file `src/main/resources/application.properties` dengan kredensial database PostgreSQL Supabase Anda.
4. Jalankan aplikasi Spring Boot:
   ```bash
   # Di Windows (PowerShell/CMD):
   ./mvnw.cmd spring-boot:run
   
   # Di Mac/Linux:
   ./mvnw spring-boot:run
   ```
5. Tunggu hingga muncul tulisan `Started PiringSehatApiApplication in ... seconds`. Backend akan berjalan di `http://localhost:8080`.

### Langkah 2: Jalankan Frontend (React + Vite)
1. Buka terminal baru yang lain.
2. Masuk ke direktori frontend:
   ```bash
   cd piring-sehat-pbo-fe
   ```
3. Instal semua dependensi (hanya perlu dilakukan sekali atau jika ada perubahan `package.json`):
   ```bash
   npm install
   ```
4. Jalankan server pengembangan Vite:
   ```bash
   npm run dev
   ```
5. Terminal akan menampilkan URL lokal (biasanya `http://localhost:5173`). Buka URL tersebut di browser web Anda.

Sekarang aplikasi Piring Sehat sudah berjalan penuh di komputer lokal Anda! 🎉

## 📝 Catatan Penting
- Jika Anda mengalami error `net::ERR_CONNECTION_REFUSED` di konsol browser, itu berarti Frontend tidak bisa menghubungi Backend. Pastikan Langkah 1 (menjalankan Spring Boot) sudah berhasil dan server backend masih aktif.
- Jika ada masalah koneksi database di backend, periksa kembali format URL di `application.properties` (harus `jdbc:postgresql://db.[project-ref].supabase.co:5432/postgres`).
