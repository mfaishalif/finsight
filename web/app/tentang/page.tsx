// app/page.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Impor ikon dari lucide-react (untuk konten)
import {
  Brain,
  AreaChart,
  Target,
  Users,
  Eye,
  Activity,
} from "lucide-react";

// Komponen Navigasi (diambil dari style kedua)
import Header from "@/components/layout/header";

// Komponen Footer (diambil dari style kedua)
function Footer() {
  return (
    <footer className="bg-[#0E0E0E] py-10 px-12 text-sm text-gray-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            {/* Pastikan /logo-finsight.svg ada di folder /public */}
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
            <li><Link href="/" className="hover:text-[#f0c94e]">Home Page</Link></li>
            <li><Link href="/konversi-mata-uang" className="hover:text-[#f0c94e]">Konversi Mata Uang</Link></li>
            <li><Link href="/Edukasi" className="hover:text-[#f0c94e]">Edukasi</Link></li>
          </ul>
        </div>

        {/* Tentang Kami */}
        <div>
          <h3 className="font-semibold text-white mb-3">Tentang Kami</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              {/* Pastikan /icons/email.svg ada di folder /public/icons */}
              <Image src="/icons/email.svg" alt="Email" width={18} height={18} />
              <span>finsight@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              {/* Pastikan /icons/instagram.svg ada di folder /public/icons */}
              <Image src="/icons/instagram.svg" alt="Instagram" width={18} height={18} />
              <span>@finsight_</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Dukungan</h3>
          <ul className="space-y-1">
            <li><Link href="/dokumentasi-api" className="hover:text-[#f0c94e]">Dokumentasi</Link></li>
            <li><Link href="#" className="hover:text-[#f0c94e]">FAQ</Link></li>
            <li><Link href="#" className="hover:text-[#f0c94e]">Support</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 py-4 text-gray-400 border-t border-[#0f251e]">
        © 2025 FinSight. All rights reserved.
      </div>
    </footer>
  );
}

// Komponen Pembantu untuk Feature Card (dengan style baru)
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-[#10261e] border-none text-[#dfe7d6] p-6 flex flex-col items-center justify-center text-center shadow-lg">
      <div className="bg-[#f0c94e] p-4 rounded-full mb-4 text-black">
        {/* Ikon akan mewarisi warna text-black */}
        {icon}
      </div>
      <CardTitle className="text-xl font-semibold mb-2 text-[#f0c94e]">{title}</CardTitle>
      <CardContent className="p-0 text-[#dfe7d6]">
        {description}
      </CardContent>
    </Card>
  );
}


export default function TentangPage() {
  return (
    <main className="min-h-screen bg-[#0f271f] text-[#ffffff]">
      <Header />

      {/* Hero Section: Mengenal FinSight Lebih Dekat (style dari file 2) */}
      <section className="relative flex flex-col items-center justify-center text-center py-28 px-4 md:py-40 bg-linear-to-b from-[#0f1f19] via-[#14271f] to-[#0f1f19]">
        {/* Efek gradient overlay (opsional, mirip dengan style 1 tapi disesuaikan) */}
        <div className="absolute inset-0 z-0 opacity-20" style={{
          backgroundImage: `radial-gradient(at 50% 50%, #0c0c0c 0%, transparent 70%)`,
        }}></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#f0c94e]">
            Mengenal FinSight Lebih Dekat
          </h1>
          <p className="text-lg md:text-xl text-[#d9d6bf]">
            FinSight adalah platform analitik dan konversi mata uang berbasis kecerdasan buatan
            yang dirancang untuk membantu pengguna memahami, memprediksi, dan mengelola nilai tukar secara cerdas.
          </p>
        </div>
      </section>


      {/* Visi & Misi Section */}
      <section className="bg-[#0f271f] py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#f0c94e]">
            Visi & Misi Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* CARD VISI - DITAMBAHKAN border-4 dan border-[#f0c94e] */}
            <Card className="bg-[#10261e] border-1 border-[#f0c94e] text-[#dfe7d6] p-6 flex flex-col items-start shadow-lg">
              <CardHeader className="p-0 mb-4">
                <div className="bg-[#f0c94e] p-3 rounded-full mb-3 text-black">
                  <Eye size={24} /> {/* Icon for Visi */}
                </div>
                <CardTitle className="text-2xl font-semibold text-[#f0c94e]">Visi</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-[#dfe7d6]">
                Menjadi platform unggulan dalam prediksi nilai tukar berbasis AI yang terpercaya dan mudah digunakan oleh siapa pun di seluruh dunia.
              </CardContent>
            </Card>
            {/* CARD MISI - DITAMBAHKAN border-4 dan border-[#f0c94e] */}
            <Card className="bg-[#10261e] border-1 border-[#f0c94e] text-[#dfe7d6] p-6 flex flex-col items-start shadow-lg">
              <CardHeader className="p-0 mb-4">
                <div className="bg-[#f0c94e] p-3 rounded-full mb-3 text-black">
                  <Target size={24} /> {/* Icon for Misi */}
                </div>
                <CardTitle className="text-2xl font-semibold text-[#f0c94e]">Misi</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-[#dfe7d6]">
                Memberikan akses data nilai tukar yang akurat, edukasi finansial yang relevan, serta alat konversi cerdas untuk membantu pengguna membuat keputusan ekonomi yang lebih baik.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Teknologi yang Kami Gunakan Section */}
      <section className="bg-[#0f1f19] py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#f0c94e]">
            Teknologi yang Kami Gunakan
          </h2>
          <p className="text-lg text-[#d9d6bf] max-w-2xl mx-auto mb-12">
            FinSight menggunakan model Deep Learning dan data real-time untuk menganalisis pergerakan nilai tukar secara akurat.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Brain size={36} />}
              title="AI Prediction Model"
              description="Prediksi berbasis Deep Learning."
            />
            <FeatureCard
              icon={<Activity size={36} />}
              title="Data Real-Time"
              description="Data kurs terkini dari sumber terpercaya."
            />
            <FeatureCard
              icon={<AreaChart size={36} />}
              title="Smart Visualization"
              description="Grafik interaktif yang mudah dipahami."
            />
            <FeatureCard
              icon={<Users size={36} />}
              title="User-Friendly Design"
              description="Tampilan elegan dan responsif."
            />
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="bg-[#0c1814] py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="flex-1">
              <div className="bg-[#f0c94e]/10 p-4 rounded-full w-fit mb-6 text-[#f0c94e]">
                <Activity size={40} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#f0c94e]">
                FinSight Developer API
              </h2>
              <p className="text-lg text-[#d9d6bf] mb-6 leading-relaxed">
                Ingin mengintegrasikan data nilai tukar dan prediksi AI kami ke dalam aplikasi Anda?
                API FinSight dirancang untuk para pengembang yang membutuhkan data finansial yang akurat, cepat, dan mudah diakses.
              </p>
              <ul className="space-y-3 mb-8 text-[#dfe7d6]">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f0c94e]"></div>
                  <span>Akses Data Konversi Real-Time</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f0c94e]"></div>
                  <span>Data Historis Lengkap</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f0c94e]"></div>
                  <span>Prediksi Berbasis AI</span>
                </li>
              </ul>
              <Link href="/dokumen-api">
                <Button variant="default" className="bg-[#f0c94e] text-black hover:bg-[#f0c94e]/90 mb-10 md:mb-0">
                  Lihat Dokumentasi API
                </Button>
              </Link>
            </div>

            <div className="flex-1 w-full relative">
              <div className="bg-[#0f1f19] border border-[#163125] rounded-xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4 border-b border-[#25463b] pb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-gray-400 font-mono ml-2">api-example.js</div>
                </div>
                <pre className="font-mono text-xs text-green-400 overflow-x-auto p-2 bg-[#081613] rounded">
                  {`const response = await fetch('https://finsight.com/api/prediction', {
  headers: {
    'x-api-key': 'YOUR_API_KEY'
  }
});

const data = await response.json();
console.log(data.prediction);`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section: Mulai Jelajahi (style dari file 2) */}
      <section className="bg-[#0f271f] py-16 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#f0c94e]">
            Mulai Jelajahi Dunia Nilai Tukar Bersama FinSight
          </h2>
          <p className="text-lg text-[#d9d6bf] mb-8">
            Temukan wawasan dan edukasi nilai tukar terbaik untuk keputusan finansial yang lebih cerdas.
          </p>
          <Link href="/konversi-mata-uang" className="bg-[#f0c94e] text-black hover:bg-[#f0c94e]/90 text-lg px-8 py-3 rounded-md transition-colors font-semibold">
            Mulai Sekarang
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}