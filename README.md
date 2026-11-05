# nopezi.my.id

Website profil Nopezi Saputra Pratama — Next.js (App Router), TypeScript, CSS murni.
Statis (`output: "export"`), tanpa runtime server, tanpa template.

## Jalankan

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build statis

```bash
npm run build      # hasil di out/
```

Deploy `out/` ke GitHub Pages, Netlify, atau layanan statis apa pun.

## Isi

Semua data profil berasal dari CV dan ditulis sekali di `lib/data.ts` —
pengalaman, keahlian (lengkap buktinya), sertifikasi, kontak.

Interaksi: terminal di hero (ketik `help`), timeline pengalaman yang bisa
dibuka, panel bukti keahlian, kartu sertifikasi yang miring, simulasi bot
Morbis, tombol salin email/telepon, tema gelap/terang (`?theme=light` untuk
membuka langsung dalam tema terang), jam WIB live.
