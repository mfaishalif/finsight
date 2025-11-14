import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from '@/components/layout/header';

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0f271f] text-[#ffffff]">
      <Header />

      {/* Hero */}
      <section className="bg-linear-to-b from-[#0f1f19] via-[#14271f] to-[#0f1f19] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-[#f0c94e]">Dokumentasi API FinSight</h1>
          <p className="mt-4 text-[#d9d6bf]">
            Gunakan API FinSight untuk mengakses data nilai tukar real-time, hasil prediksi berbasis AI, dan fitur konversi
            mata uang secara otomatis.
          </p>
            <div className="mt-8 flex gap-4 justify-center">
                <Button className="bg-[#f0c94e] text-black hover:bg-[#f0c94e]/10">
                    Lihat Panduan Cepat
                </Button>
                <Button variant="outline" className="bg-[#000000] border-[#f0c94e] text-[#f0c94e] hover:bg-[#f0c94e]/10">
                    Coba API Sekarang
                </Button>
            </div>

        </div>
      </section>

      {/* Page content */}
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-[#12251f] rounded-lg p-6 text-sm">
          <ul className="space-y-3 text-[#cfd7c7]">
            <li className="font-semibold text-[#f0c94e]">Pengenalan API</li>
            <li>Autentikasi</li>
            <li>Endpoint Nilai Tukar</li>
            <li>Endpoint Prediksi AI</li>
            <li>Error Handling & Status Code</li>
          </ul>
        </aside>

        {/* Main doc area */}
        <article className="md:col-span-3 bg-[#10261e] rounded-lg p-8 text-[#dfe7d6]">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#f0c94e] mb-3">Pengenalan API</h2>
            <p className="leading-relaxed">
              API FinSight menyediakan akses data kurs dan prediksi nilai tukar berbasis AI dalam format RESTful JSON.
              API ini dirancang untuk memberikan data real-time yang akurat dan dapat diandalkan untuk aplikasi finansial
              Anda.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-[#f0c94e] mb-2">Autentikasi</h3>
            <p>Gunakan API Key unik Anda di setiap permintaan.</p>
            <div className="mt-4 bg-[#0c2018] p-4 rounded-md text-sm">
              <code>Authorization: Bearer YOUR_API_KEY</code>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-[#f0c94e] mb-2">Endpoint Nilai Tukar</h3>
            <p className="mb-3">GET <code>/api/exchange-rate</code></p>

            <div className="bg-[#0c2018] p-4 rounded-md text-sm mb-4">
              <strong>Parameter:</strong>
              <table className="w-full mt-3 table-auto text-left text-sm">
                <thead>
                  <tr className="border-b border-[#163125]">
                    <th className="py-2">Nama</th>
                    <th className="py-2">Tipe</th>
                    <th className="py-2">Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#163125]">
                    <td className="py-2">base</td>
                    <td className="py-2">string</td>
                    <td className="py-2">Kode mata uang asal (contoh: USD)</td>
                  </tr>
                  <tr>
                    <td className="py-2">target</td>
                    <td className="py-2">string</td>
                    <td className="py-2">Kode mata uang tujuan (contoh: IDR)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#0c2018] p-4 rounded-md text-sm">
              <strong>Contoh Respons:</strong>
              <pre className="mt-2 p-3 bg-[#081613] rounded text-xs overflow-x-auto">{`{ "base": "USD", "target": "IDR", "rate": 15670.52, "timestamp": "2025-10-21T10:00:00Z" }`}</pre>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-[#f0c94e] mb-2">Endpoint Prediksi AI</h3>
            <p className="mb-3">GET <code>/api/prediction</code></p>
            <p>Menampilkan hasil prediksi nilai tukar berbasis AI dengan akurasi tinggi berdasarkan analisis data historis dan tren pasar terkini.</p>
          </section>

          <section>
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
                    <td className="py-2">200</td>
                    <td className="py-2">Berhasil</td>
                  </tr>
                  <tr className="border-b border-[#163125]">
                    <td className="py-2">400</td>
                    <td className="py-2">Permintaan tidak valid</td>
                  </tr>
                  <tr className="border-b border-[#163125]">
                    <td className="py-2">401</td>
                    <td className="py-2">API Key salah</td>
                  </tr>
                  <tr>
                    <td className="py-2">500</td>
                    <td className="py-2">Kesalahan server</td>
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