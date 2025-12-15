"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  ChevronDown,
  Globe,
  TrendingUp,
  Landmark,
} from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";


const mainCurrencies = [
  { name: "Rupiah Indonesia", code: "IDR", symbol: "Rp", flag: "/flags/id.svg", desc: "Rupiah adalah mata uang resmi Indonesia yang dikelola oleh Bank Indonesia.", region: "asia" },
  { name: "Dolar Amerika", code: "USD", symbol: "$", flag: "/flags/us.svg", desc: "Mata uang cadangan dunia yang paling banyak digunakan dalam perdagangan internasional.", region: "amerika" },
  { name: "Euro", code: "EUR", symbol: "€", flag: "/flags/eur.svg", desc: "Mata uang resmi dari 19 negara anggota Uni Eropa dalam zona Euro.", region: "eropa" },
  { name: "Yen Jepang", code: "JPY", symbol: "¥", flag: "/flags/jp.svg", desc: "Mata uang ketiga yang paling banyak diperdagangkan di pasar valuta asing.", region: "asia" },
  { name: "Pound Sterling", code: "GBP", symbol: "£", flag: "/flags/gbp.svg", desc: "Mata uang tertua di dunia yang masih digunakan hingga saat ini.", region: "eropa" },
  { name: "Won Korea Selatan", code: "KRW", symbol: "₩", flag: "/flags/krw.svg", desc: "Mata uang won yang digunakan oleh negara Korea Selatan", region: "asia" },
  { name: "Dolar Kanada", code: "CAD", symbol: "C$", flag: "/flags/cad.svg", desc: "Mata uang kelima yang paling banyak diperdagangkan di dunia.", region: "amerika" },
  { name: "Dolar Australia", code: "AUD", symbol: "A$", flag: "/flags/au.svg", desc: "Mata uang pertama di dunia yang menggunakan teknologi polimer untuk uang kertas.", region: "oseania" },
];

const additionalCurrencies = [
  { name: "Rupee India", code: "INR", symbol: "₹", flag: "/flags/in.png", desc: "Mata uang India, salah satu yang paling banyak digunakan di Asia Selatan.", region: "asia" },

];


function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-12 py-5 bg-[#0E2C27]/80 backdrop-blur-md shadow-sm text-white">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-[#192f26] flex items-center justify-center">
          <Image src="/logo-finsight.svg" alt="FinSight" width={26} height={26} />
        </div>
        <span className="font-semibold text-lg text-white">FinSight</span>
      </Link>

      <nav className="flex gap-8 text-sm font-medium">
        <Link href="/" className="hover:text-[#f0c94e]">Home Page</Link>
        <Link href="/tentang" className="hover:text-[#f0c94e]">Tentang</Link>
        <Link href="/Edukasi" className="underline decoration-[#c9a93b] text-[#f0c94e]">Edukasi</Link>
        <Link href="/konversi-mata-uang" className="hover:text-[#f0c94e]">Konversi Mata Uang</Link>
        <Link href="/dokumen-api" className="hover:text-[#f0c94e]">Dokumentasi API</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0E0E0E] py-10 px-12 text-sm text-gray-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image src="/logo-finsight.svg" alt="FinSight Logo" width={32} height={32} className="rounded-md" />
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
        <div>
          <h3 className="font-semibold text-white mb-3">Tentang Kami</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-2"><Image src="/icons/email.svg" alt="Email" width={18} height={18} /><span>finsight@gmail.com</span></li>
            <li className="flex items-center gap-2"><Image src="/icons/instagram.svg" alt="Instagram" width={18} height={18} /><span>@finsight_</span></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-3">Dukungan</h3>
          <ul className="space-y-1">
            <li><Link href="/dokumen-api" className="hover:text-[#f0c94e]">Dokumentasi</Link></li>
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[#10261e] border-none text-[#dfe7d6] p-6 flex flex-col items-center justify-center text-center shadow-lg rounded-xl h-full">
      <div className="bg-[#f0c94e] p-4 rounded-full mb-4 text-black">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-[#f0c94e]">{title}</h3>
      <p className="text-[#dfe7d6]">{description}</p>
    </div>
  );
}

function CurrencyCard({ name, code, symbol, flag, desc }: { name: string; code: string; symbol: string; flag: string; desc: string }) {
  return (
    <Link href={`/Edukasi/${code.toLowerCase()}`}>
      <div className="bg-[#1a2d27] px-5 py-5 rounded-lg text-center h-full shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-2xl cursor-pointer border border-transparent hover:border-[#f0c94e]/30">
        <div className="flex justify-center">
          <Image src={flag} alt={name} width={40} height={30} className="rounded-sm mb-4 object-cover" />
        </div>
        <h3 className="font-bold text-lg text-white mb-1">{name}</h3>
        <div className="text-sm text-gray-400 space-y-0.5">
          <p>Kode: {code}</p>
          <p>Simbol: {symbol}</p>
        </div>
        <p className="text-sm text-gray-300 mt-3 pt-1 line-clamp-3">{desc}</p>
      </div>
    </Link>
  );
}

function EdukasiContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [showMore, setShowMore] = useState(false);
  const [filteredCurrencies, setFilteredCurrencies] = useState<any[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const querySearch = searchParams.get("search") || "";
    const queryRegion = searchParams.get("region") || "all";
    setSearchTerm(querySearch);
    setSelectedRegion(queryRegion);
  }, [searchParams]);


  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedRegion !== "all") params.set("region", selectedRegion);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchTerm, selectedRegion, router, pathname]);


  useEffect(() => {
    const base = [...mainCurrencies];
    const extra = showMore ? additionalCurrencies : [];
    const all = [...base, ...extra];

    const results = all.filter((currency) => {
      const matchesSearch =
        currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === "all" || currency.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });

    setFilteredCurrencies(results);
  }, [searchTerm, selectedRegion, showMore]);

  return (
    <main className="min-h-screen bg-[#1f3a32] text-[#ffffff]">
      <Navbar />

      <section className="relative flex flex-col items-center justify-center text-center py-16 px-4 md:py-20 bg-gradient-to-b from-[#0f1f19] via-[#14271f] to-[#0f1f19]">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `radial-gradient(at 50% 50%, #1e2e26 0%, transparent 70%)` }}></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#f0c94e]">
            Kenali dan Pelajari Berbagai Mata Uang Dunia!
          </h1>
          <p className="text-base md:text-lg text-[#d9d6bf]">
            Tingkatkan wawasan Anda tentang mata uang global—mulai dari simbol, kode ISO, hingga fakta menarik di baliknya.
          </p>
        </div>

        <div className="bg-[#1a2d27] border border-[#D4AF37]/40 rounded-xl p-6 mt-8 container mx-auto max-w-6xl z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={15} />
              <Input
                placeholder="Cari mata uang atau kode ISO..."
                className="bg-[#0C0C0C] border border-[#D4AF37]/40 text-white placeholder:text-gray-500/70 pl-12 h-9 rounded-md focus:ring-2 focus:ring-[#f0c94e]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="h-12 w-full md:w-[240px] bg-[#0C0C0C] border border-[#D4AF37]/40 text-white rounded-md px-4 focus:ring-2 focus:ring-[#f0c94e]">
                <SelectValue placeholder="Semua Wilayah" />
              </SelectTrigger>
              <SelectContent className="bg-[#0C0C0C] text-white border border-[#D4AF37]/40 z-[9999]">
                <SelectItem value="all">Semua Wilayah</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
                <SelectItem value="eropa">Eropa</SelectItem>
                <SelectItem value="amerika">Amerika</SelectItem>
                <SelectItem value="oseania">Oseania</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="bg-[#1f3a32] py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCurrencies.map((currency) => (
              <CurrencyCard
                key={currency.code}
                name={currency.name}
                code={currency.code}
                symbol={currency.symbol}
                flag={currency.flag}
                desc={currency.desc}
              />
            ))}

            {filteredCurrencies.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-400">
                <p className="text-xl font-medium">Tidak ada mata uang yang cocok dengan pencarian.</p>
                <p className="mt-2">Coba kata kunci atau wilayah lain.</p>
              </div>
            )}
          </div>

          {!showMore && additionalCurrencies.length > 0 && (
            <div className="text-center mt-12">
              <Button
                onClick={() => setShowMore(true)}
                variant="link"
                className="text-white hover:text-[#f0c94e] text-lg font-medium"
              >
                Lihat Selengkapnya
                <ChevronDown className="ml-2" size={22} />
              </Button>
            </div>
          )}

          {showMore && (
            <div className="text-center mt-8">
              <Button onClick={() => setShowMore(false)} variant="link" className="text-white/60 hover:text-white text-sm">
                Sembunyikan
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#0f1f19] py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#f0c94e]">
            Mengapa Penting Memahami Mata Uang Dunia?
          </h2>
          <p className="text-lg text-[#d9d6bf] max-w-3xl mx-auto mb-12">
            Mengetahui detail mata uang membantu dalam memahami dinamika ekonomi global, perdagangan internasional, dan keputusan finansial yang lebih cerdas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard icon={<Globe size={36} />} title="Wawasan Global" description="Memahami konektivitas dunia melalui mata uang berbagai negara." />
            <FeatureCard icon={<TrendingUp size={36} />} title="Trading Cerdas" description="Basis pengetahuan untuk keputusan investasi yang lebih tepat." />
            <FeatureCard icon={<Landmark size={36} />} title="Edukasi Finansial" description="Meningkatkan literasi keuangan dan pemahaman pasar." />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function EdukasiPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1f3a32]" />}>
      <EdukasiContent />
    </Suspense>
  );
}