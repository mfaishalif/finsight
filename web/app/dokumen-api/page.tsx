"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Page() {
  const curlExample1 = `curl -H "x-api-key: finsight-secret-123" \\
  "http://localhost:3000/api/conversion?from=USD&to=IDR&amount=10"`;

  const curlExample2 = `curl -H "x-api-key: finsight-secret-123" \\
  "http://localhost:3000/api/history?from=USD&to=IDR&range=1mo"`;

  const curlExample3 = `curl -H "x-api-key: finsight-secret-123" \\
  "http://localhost:3000/api/prediction?symbol=USDIDR=X&mode=daily"`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f1f19] via-[#14271f] to-[#0f1f19] text-[#ffffff]">
      {/* Header */}
      {/* HEADER */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-12 py-5 bg-[#0E2C27]/80 backdrop-blur-md shadow-sm">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#192f26] flex items-center justify-center">
            <Image src="/logo-finsight.svg" alt="FinSight" width={26} height={26} />
          </div>
          <span className="font-semibold text-lg text-white">FinSight</span>
        </Link>

        <nav className="flex gap-8 text-sm font-medium">
          <a href="/" className="hover:text-[#f0c94e]">Home Page</a>
          <a href="/tentang" className="hover:text-[#f0c94e]">Tentang</a>
          <a href="/Edukasi" className="hover:text-[#f0c94e]">Edukasi</a>
          <a href="/konversi-mata-uang" className="hover:text-[#f0c94e]">Konversi Mata Uang</a>
          <a href="#" className="underline decoration-[#c9a93b] text-[#f0c94e]">Dokumentasi API</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-linear-to-b from-[#0f1f19] via-[#14271f] to-[#0f1f19] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold text-[#f0c94e]">Dokumentasi API FinSight</h1>
          <p className="mt-4 text-[#d9d6bf]">
            Gunakan API FinSight untuk mengakses data nilai tukar real-time, hasil prediksi berbasis AI, dan fitur konversi
            mata uang secara otomatis.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button
              className="bg-[#f0c94e] text-black hover:bg-[#f0c94e]/90"
              onClick={() => {
                const element = document.getElementById("introduction");
                if (element) {
                  const headerOffset = 145
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                  });
                }
              }}
            >
              Lihat Panduan Cepat
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-[#000000] border-[#f0c94e] text-[#f0c94e] hover:bg-[#f0c94e]/90 hover:text-black">
                  Coba API Sekarang
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#10261e] text-white border-[#163125] max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-[#f0c94e]">Uji Coba API (Quick Start)</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Berikut adalah contoh perintah <code>curl</code> yang dapat Anda jalankan di terminal Anda. Code ini menggunakan <strong>Testing Key</strong> default.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                  {/* Item 1 */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-200">1. Cek Konversi (USD ke IDR)</h4>
                    <pre className="bg-[#081613] p-3 rounded text-xs font-mono text-green-400 whitespace-pre-wrap break-all">
                      {curlExample1}
                    </pre>
                  </div>

                  {/* Item 2 */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-200">2. Ambil Histori (1 Bulan Terakhir)</h4>
                    <pre className="bg-[#081613] p-3 rounded text-xs font-mono text-green-400 whitespace-pre-wrap break-all">
                      {curlExample2}
                    </pre>
                  </div>

                  {/* Item 3 */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-200">3. Dapatkan Prediksi AI</h4>
                    <pre className="bg-[#081613] p-3 rounded text-xs font-mono text-green-400 whitespace-pre-wrap break-all">
                      {curlExample3}
                    </pre>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

        </div>
      </section>

      {/* Page content */}
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-[#12251f] rounded-lg p-6 text-sm h-fit sticky top-28">
          <ul className="space-y-3 text-[#cfd7c7]">
            <li>
              <a href="#introduction" className="block hover:text-[#f0c94e] transition-colors">Pengenalan API</a>
            </li>
            <li>
              <a href="#authentication" className="block hover:text-[#f0c94e] transition-colors">Autentikasi</a>
            </li>
            <li>
              <a href="#endpoint-conversion" className="block hover:text-[#f0c94e] transition-colors">Endpoint Konversi</a>
            </li>
            <li>
              <a href="#endpoint-history" className="block hover:text-[#f0c94e] transition-colors">Endpoint Histori</a>
            </li>
            <li>
              <a href="#endpoint-prediction" className="block hover:text-[#f0c94e] transition-colors">Endpoint Prediksi AI</a>
            </li>
            <li>
              <a href="#errors" className="block hover:text-[#f0c94e] transition-colors">Error Handling & Status Code</a>
            </li>
          </ul>
        </aside>

        {/* Main doc area */}
        <article className="md:col-span-3 bg-[#10261e] rounded-lg p-8 text-[#dfe7d6]">
          <section id="introduction" className="mb-8 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#f0c94e] mb-3">Pengenalan API</h2>
            <p className="leading-relaxed">
              API FinSight menyediakan akses data kurs dan prediksi nilai tukar berbasis AI dalam format RESTful JSON.
              API ini dirancang untuk memberikan data real-time, historis, dan prediksi yang akurat untuk aplikasi finansial
              Anda.
            </p>
          </section>

          <section id="authentication" className="mb-8 scroll-mt-24">
            <h3 className="text-xl font-semibold text-[#f0c94e] mb-2">Autentikasi</h3>
            <p className="mb-2">Akses eksternal memerlukan API Key.</p>
            <p>Sertakan API Key Anda pada header di setiap permintaan.</p>
            <div className="mt-4 bg-[#0c2018] p-4 rounded-md text-sm">
              <code>x-api-key: YOUR_API_KEY</code>
              <div className="mt-2 text-gray-400 text-xs">Atau</div>
              <code>Authorization: Bearer YOUR_API_KEY</code>
            </div>
          </section>

          <section id="endpoint-conversion" className="mb-8 scroll-mt-24">
            <h3 className="text-xl font-semibold text-[#f0c94e] mb-2">Endpoint Konversi</h3>
            <p className="mb-3">GET <code>/api/conversion</code></p>
            <p className="mb-4 text-sm text-gray-300">Mendapatkan nilai tukar terkini dan hasil konversi jumlah uang.</p>

            <div className="bg-[#0c2018] p-4 rounded-md text-sm mb-4">
              <strong>Parameter:</strong>
              <table className="w-full mt-3 table-auto text-left text-sm">
                <thead>
                  <tr className="border-b border-[#163125]">
                    <th className="py-2">Nama</th>
                    <th className="py-2">Wajib</th>
                    <th className="py-2">Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#163125]">
                    <td className="py-2 font-mono text-[#f0c94e]">from</td>
                    <td className="py-2">Ya</td>
                    <td className="py-2">Kode mata uang asal (contoh: USD)</td>
                  </tr>
                  <tr className="border-b border-[#163125]">
                    <td className="py-2 font-mono text-[#f0c94e]">to</td>
                    <td className="py-2">Ya</td>
                    <td className="py-2">Kode mata uang tujuan (contoh: IDR)</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-[#f0c94e]">amount</td>
                    <td className="py-2">Tidak</td>
                    <td className="py-2">Jumlah uang (default: 1)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#0c2018] p-4 rounded-md text-sm">
              <strong>Contoh Respons:</strong>
              <pre className="mt-2 p-3 bg-[#081613] rounded text-xs overflow-x-auto text-green-400">{`{
  "from": "USD",
  "to": "IDR",
  "amount": 1,
  "rate": 16500.0,
  "convertedAmount": 16500.0,
  "timestamp": "2025-12-14T10:00:00.000Z"
}`}</pre>
            </div>
          </section>

          <section id="endpoint-history" className="mb-8 scroll-mt-24">
            <h3 className="text-xl font-semibold text-[#f0c94e] mb-2">Endpoint Histori</h3>
            <p className="mb-3">GET <code>/api/history</code></p>
            <p className="mb-4 text-sm text-gray-300">Mendapatkan data historis nilai tukar untuk visualisasi grafik.</p>

            <div className="bg-[#0c2018] p-4 rounded-md text-sm mb-4">
              <strong>Parameter:</strong>
              <table className="w-full mt-3 table-auto text-left text-sm">
                <thead>
                  <tr className="border-b border-[#163125]">
                    <th className="py-2">Nama</th>
                    <th className="py-2">Wajib</th>
                    <th className="py-2">Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#163125]">
                    <td className="py-2 font-mono text-[#f0c94e]">from</td>
                    <td className="py-2">Ya</td>
                    <td className="py-2">Kode mata uang asal</td>
                  </tr>
                  <tr className="border-b border-[#163125]">
                    <td className="py-2 font-mono text-[#f0c94e]">to</td>
                    <td className="py-2">Ya</td>
                    <td className="py-2">Kode mata uang tujuan</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-[#f0c94e]">range</td>
                    <td className="py-2">Tidak</td>
                    <td className="py-2">Rentang waktu: <code>1w</code>, <code>1mo</code>, <code>3mo</code>, <code>6mo</code>, <code>1y</code> (default: <code>1mo</code>)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#0c2018] p-4 rounded-md text-sm">
              <strong>Contoh Respons:</strong>
              <pre className="mt-2 p-3 bg-[#081613] rounded text-xs overflow-x-auto text-green-400">{`{
  "symbol": "USDIDR=X",
  "data": [
    { "date": "2025-12-01", "rate": 16450 },
    { "date": "2025-12-02", "rate": 16480 }
  ]
}`}</pre>
            </div>
          </section>

          <section id="endpoint-prediction" className="mb-8 scroll-mt-24">
            <h3 className="text-xl font-semibold text-[#f0c94e] mb-2">Endpoint Prediksi AI</h3>
            <p className="mb-3">GET <code>/api/prediction</code></p>
            <p className="mb-4 text-sm text-gray-300">Menampilkan hasil prediksi nilai tukar berbasis AI (Mock/Real).</p>

            <div className="bg-[#0c2018] p-4 rounded-md text-sm mb-4">
              <strong>Parameter:</strong>
              <table className="w-full mt-3 table-auto text-left text-sm">
                <thead>
                  <tr className="border-b border-[#163125]">
                    <th className="py-2">Nama</th>
                    <th className="py-2">Wajib</th>
                    <th className="py-2">Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#163125]">
                    <td className="py-2 font-mono text-[#f0c94e]">symbol</td>
                    <td className="py-2">Tidak</td>
                    <td className="py-2">Pasangan mata uang (default: <code>USDIDR=X</code>)</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-[#f0c94e]">mode</td>
                    <td className="py-2">Tidak</td>
                    <td className="py-2">Mode prediksi: <code>daily</code> atau <code>hourly</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="errors" className="scroll-mt-24">
            <h3 className="text-xl font-semibold text-[#f0c94e] mb-4">Error Handling &amp; Status Code</h3>
            <div className="bg-[#0c2018] p-4 rounded-md">
              <table className="w-full table-auto text-left text-sm">
                <thead>
                  <tr className="border-b border-[#163125]">
                    <th className="py-2">Status</th>
                    <th className="py-2">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#163125]">
                    <td className="py-2 font-mono text-green-400">200</td>
                    <td className="py-2">Berhasil</td>
                  </tr>
                  <tr className="border-b border-[#163125]">
                    <td className="py-2 font-mono text-yellow-400">400</td>
                    <td className="py-2">Parameter tidak valid atau kurang</td>
                  </tr>
                  <tr className="border-b border-[#163125]">
                    <td className="py-2 font-mono text-red-400">401</td>
                    <td className="py-2">API Key tidak valid atau tidak ditemukan</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-red-500">500</td>
                    <td className="py-2">Kesalahan server internal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0E0E0E] py-10 px-12 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/logo-finsight.svg"
                alt="FinSight Logo"
                width={32}
                height={32}
                className="rounded-md"
              />
              <h2 className="font-semibold text-white">FinSight</h2>
            </div>
            <p>AI-powered exchange rate predictions for smarter trading decisions.</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Platform</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-[#f0c94e]">Home Page</a></li>
              <li><a href="#" className="hover:text-[#f0c94e]">Konversi Mata Uang</a></li>
              <li><a href="#" className="hover:text-[#f0c94e]">Edukasi</a></li>
            </ul>
          </div>

          {/* Tentang Kami */}
          <div>
            <h3 className="font-semibold text-white mb-3">Tentang Kami</h3>
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                <Image src="/icons/email.svg" alt="Email" width={18} height={18} />
                <span>finsight@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Image src="/icons/instagram.svg" alt="Instagram" width={18} height={18} />
                <span>@finsight_</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Dukungan</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-[#f0c94e]">Dokumentasi</a></li>
              <li><a href="#" className="hover:text-[#f0c94e]">FAQ</a></li>
              <li><a href="#" className="hover:text-[#f0c94e]">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10 py-4 text-white-400 border-t border-[#0f251e]">
          © 2025 FinSight. All rights reserved.
        </div>
      </footer>
    </main>


  );
}
