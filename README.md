# Catatan Harian

Aplikasi web Catatan Harian dengan React JS (Vite) dan Tailwind CSS.

## Fitur Utama

- Tambah catatan (judul, isi, kategori)
- Tanggal otomatis
- Tampilkan daftar catatan dalam bentuk card
- Edit catatan
- Hapus catatan dengan konfirmasi
- Pencarian real-time berdasarkan judul atau isi
- Dark / Light mode toggle
- Responsive mobile & desktop
- Menyimpan catatan ke `localStorage` agar tidak hilang saat refresh
- Memuat data awal dari API publik (`jsonplaceholder.typicode.com`)
- Loading state dan error handling

## Struktur Folder

- `src/App.jsx`
- `src/main.jsx`
- `src/index.css`
- `src/components/Navbar.jsx`
- `src/components/NoteForm.jsx`
- `src/components/NoteList.jsx`
- `src/components/NoteItem.jsx`
- `src/components/SearchBar.jsx`
- `src/models/Note.js`
- `src/services/api.js`

## Instalasi

Buka terminal di folder proyek, lalu jalankan:

```bash
npm install
```

## Menjalankan Aplikasi

```bash
npm run dev
```

Kemudian buka URL yang muncul di terminal, biasanya `http://127.0.0.1:5173`.

## Catatan

Aplikasi ini menggunakan Tailwind CSS dan React functional components dengan `useState`, `useEffect`, serta fetch API `async/await`.
