"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronDown } from "lucide-react";

export default function CurrencyDetailPage() {
  const currency = currencyDetails.eur;

  if (!currency) {
    notFound();
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const router = useRouter();

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams();
      if (searchTerm) params.set("search", searchTerm);
      if (selectedRegion !== "all") params.set("region", selectedRegion);
      router.push(`/Edukasi?${params.toString()}`);
    }
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (value !== "all") params.set("region", value);
    router.push(`/Edukasi?${params.toString()}`);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#1f3a32] text-white pt-[80px]">
        <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 md:py-32 bg-linear-to-b from-[#0f1f19] via-[#14271f] to-[#0f1f19]">
          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(at 50% 50%, #1e2e26 0%, transparent 70%)`,
            }}
          ></div>
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#f0c94e]">
              Kenali dan Pelajari Berbagai Mata Uang Dunia!
            </h1>
            <p className="text-lg md:text-xl text-[#d9d6bf]">
              Tingkatkan wawasan Anda tentang mata uang global—mulai dari simbol, kode ISO, hingga fakta menarik di baliknya.
            </p>
          </div>
        </section>

        <div className="bg-[#1a2d27] border border-[#D4AF37]/40 rounded-xl p-4 mt-12 container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={15} />
              <Input
                placeholder="Cari mata uang atau kode ISO..."
                className="bg-[#0C0C0C] border border-[#D4AF37]/40 text-white placeholder:text-gray-500/70 pl-11 h-9 rounded-md focus:ring-2 focus:ring-[#f0c94e]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
            </div>

            <Select value={selectedRegion} onValueChange={handleRegionChange}>
              <SelectTrigger className="relative h-12 w-full md:w-[240px] bg-[#0C0C0C] border border-[#D4AF37]/40 text-white rounded-md px-4 focus:ring-2 focus:ring-[#f0c94e] data-[state=open]:ring-2 data-[state=open]:ring-[#f0c94e]">
                <SelectValue placeholder="Semua Wilayah" />
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
              </SelectTrigger>
              <SelectContent className="bg-[#0C0C0C] text-white border border-[#1f3a32] z-50">
                <SelectItem value="all">Semua Wilayah</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
                <SelectItem value="eropa">Eropa</SelectItem>
                <SelectItem value="amerika">Amerika</SelectItem>
                <SelectItem value="oseania">Oseania</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <section className="pb-16 px-4 sm:px-8 flex justify-center">
          <div className="container mx-auto max-w-6xl bg-[#10261e] p-6 sm:p-10 rounded-xl shadow-2xl mt-[60px] relative z-20">
            <div className="mb-6">
              <Link href="/Edukasi" className="text-gray-300 hover:text-[#f0c94e] transition flex items-center gap-2">
                <ArrowLeft size={30} />
              </Link>
            </div>

            <div className="text-center mb-10">
              <Image
                src={currency.flag}
                alt="Euro"
                width={120}
                height={80}
                className="rounded-lg mx-auto mb-4 shadow-xl"
                priority
              />
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#f0c94e] mt-4">{currency.name}</h1>
            </div>

            <div className="space-y-12">
              <MoneyGroup title="Uang Kertas" items={currency.paperNotes} currency={currency} />
              <MoneyGroup title="Uang Koin" items={currency.coins} currency={currency} note={false} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-12 py-5 bg-[#0E2C27]/80 backdrop-blur-md shadow-sm text-white">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-[#192f26] flex items-center justify-center">
          <Image src="/logo-finsight.svg" alt="FinSight" width={26} height={26} />
        </div>
        <span className="font-semibold text-lg text-white hidden sm:inline">FinSight</span>
      </Link>

      <nav className="flex gap-4 sm:gap-8 text-xs sm:text-sm font-medium">
        <Link href="/" className="hover:text-[#f0c94e]">Home Page</Link>
        <Link href="/Tentang" className="hover:text-[#f0c94e] hidden md:inline">Tentang</Link>
        <Link href="/Edukasi" className="underline decoration-[#c9a93b] text-[#f0c94e]">Edukasi</Link>
        <Link href="/konversi-mata-uang" className="hover:text-[#f0c94e]">Konversi Mata Uang</Link>
        <Link href="/dokumen-api" className="hover:text-[#f0c94e] hidden md:inline">Dokumentasi API</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0E0E0E] py-10 px-4 sm:px-12 text-sm text-gray-300">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image src="/logo-finsight.svg" alt="FinSight Logo" width={32} height={32} className="rounded-md" />
            <h2 className="font-semibold text-white">FinSight</h2>
          </div>
          <p className="text-xs sm:text-sm">AI-powered exchange rate predictions for smarter trading decisions.</p>
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

const MoneyItemCard = ({ item, currency, note }: any) => {
  const isNote = note;

  if (isNote) {
    return (
      <div className="relative bg-[#10261e]/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-[1.04] hover:border-[#D4AF37]/50 hover:shadow-2xl">
        <div className="p-2 pt-0 pb-6">
          <Image
            src={item.image}
            alt={`Uang Kertas ${item.value} ${currency.code}`}
            width={300}
            height={150}
            className="w-full object-contain"
            loading="lazy"
          />
          <div className="bg-[#F5F2EC]/60 px-4 py-1 border-t border-[#D4AF37]/30 rounded-b-lg absolute bottom-0 left-2 right-2 z-10">
            <p className="text-center text-lg font-extrabold text-black tracking-wider">
              {currency.symbol}{item.value}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#0f1f19]/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-[1.04] hover:border-[#D4AF37]/50 hover:shadow-2xl">
      <div className="p-15 pb-0">
        <Image
          src={item.image}
          alt={`Koin ${item.value} ${currency.code}`}
          width={160}
          height={160}
          className="w-full object-contain rounded-full"
          loading="lazy"
        />
        <div className="bg-[#F5F2EC]/60 px-4 py-4 border-t border-[#D4AF37]/30 rounded-b-lg absolute bottom-0 left-15 right-15 z-10">
          <p className="text-center text-lg font-extrabold text-black tracking-wider">
            {item.value}
          </p>
        </div>
      </div>
    </div>
  );
};

const MoneyGroup = ({ title, items, currency, note = true }: any) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
    <h3 className="text-xl font-semibold mb-4 text-white pb-2 col-span-full">{title}</h3>
    <div className="col-span-full h-px bg-[#0c221a]/30 mb-4"></div>
    {items.map((item: any, i: number) => (
      <MoneyItemCard key={i} item={item} currency={currency} note={note} />
    ))}
  </div>
);

const currencyDetails = {
  eur: {
    name: "Euro",
    code: "EUR",
    symbol: "€",
    flag: "/flags/eur.svg",
    country: "Uni Eropa",
    paperNotes: [
      { value: "500", image: "/currencies/eur/EUR_500.jpg" },
      { value: "200", image: "/currencies/eur/The_Europa_series_200.jpg" },
      { value: "100", image: "/currencies/eur/The_Europa_series_100.jpg" },
      { value: "50", image: "/currencies/eur/The_Europa_series_50.png" },
      { value: "20", image: "/currencies/eur/_Europa_series_20.jpg" },
      { value: "10", image: "/currencies/eur/EUR_10.png" },
      { value: "5", image: "/currencies/eur/EUR_5.png" },
    ],
    coins: [
      { value: "1¢", image: "/currencies/eur/1cent.png" },
      { value: "2¢", image: "/currencies/eur/2cent.png" },
      { value: "5¢", image: "/currencies/eur/5cent.png" },
      { value: "10¢", image: "/currencies/eur/10cent.png" },
      { value: "20¢", image: "/currencies/eur/20cent.png" },
      { value: "50¢", image: "/currencies/eur/50cent.png" },
      { value: "€1", image: "/currencies/eur/1eur.png" },
      { value: "€2", image: "/currencies/eur/2eur.png" },
    ],
  },
};