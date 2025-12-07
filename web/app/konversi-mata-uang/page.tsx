"use client"

import { useState } from "react"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { RefreshCcw } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import Image from "next/image"
import Header from '@/components/layout/header'; // Added import

const data = [
  { name: "6h ago", rate: 0.918 },
  { name: "5h ago", rate: 0.920 },
  { name: "4h ago", rate: 0.917 },
  { name: "3h ago", rate: 0.922 },
  { name: "2h ago", rate: 0.926 },
  { name: "1h ago", rate: 0.923 },
  { name: "Now", rate: 0.919 },
]

// Data mata uang dan bendera
const currencies = [
  { code: "USD", name: "United States Dollar", flag: "/flags/us.svg" },
  { code: "AUD", name: "Australian Dollar", flag: "/flags/au.svg" },
  { code: "JPY", name: "Japanese Yen", flag: "/flags/jp.svg" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "/flags/my.svg" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "/flags/id.svg" },
]

export default function PageKonversiMataUang() {
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("IDR")
  const [amount, setAmount] = useState(1)
  const [result, setResult] = useState(16551.8)

  const handleConvert = () => {
    // simulasi perhitungan sederhana
    setResult(parseFloat((Math.random() * (17000 - 16000) + 16000).toFixed(2)))
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B221E] text-white">
      <Header /> {/* Replaced hardcoded header with Header component */}

      {/* MAIN CONTENT */}
      <main className="flex-1 px-6 md:px-16 py-16">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#F9FAE0]">
            Konversi Mata Uang <span className="text-[#f0c94e]">Real-Time</span>
          </h2>
          <p className="text-gray-300 mt-3">
            Konversi mata uang secara instan menggunakan nilai tukar terkini yang didukung oleh FinSight AI.
          </p>
        </div>

        {/* KARTU KONVERSI */}
        <Card className="bg-[#102E2A] border-none max-w-2xl mx-auto p-6 text-white">
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Konversi Sekarang!</h3>
              <Button variant="ghost" size="icon" className="text-[#f0c94e] hover:bg-[#f0c94e]/10">
                <RefreshCcw />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Dropdown Dari */}
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="bg-[#183A34] border-none text-white">
                  <div className="flex items-center gap-2">
                    <Image
                      src={currencies.find(c => c.code === fromCurrency)?.flag || "/flags/us.svg"}
                      alt={fromCurrency}
                      width={20}
                      height={15}
                      className="rounded-sm"
                    />
                    <span>{fromCurrency}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={currency.flag}
                          alt={currency.code}
                          width={20}
                          height={15}
                          className="rounded-sm"
                        />
                        <span>{currency.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Input Jumlah */}
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="bg-[#183A34] border-none text-white"
              />

              {/* Dropdown Ke */}
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="bg-[#183A34] border-none text-white">
                  <div className="flex items-center gap-2">
                    <Image
                      src={currencies.find(c => c.code === toCurrency)?.flag || "/flags/id.svg"}
                      alt={toCurrency}
                      width={20}
                      height={15}
                      className="rounded-sm"
                    />
                    <span>{toCurrency}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={currency.flag}
                          alt={currency.code}
                          width={20}
                          height={15}
                          className="rounded-sm"
                        />
                        <span>{currency.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Hasil Konversi */}
              <div className="bg-[#183A34] py-2 px-4 rounded-md text-center font-semibold">
                {result}
              </div>
            </div>

            <div className="mt-4 text-center text-[#f0c94e] font-semibold">
              {amount} {fromCurrency} = {result} {toCurrency}
            </div>

            <p className="text-center text-gray-400 text-sm mt-1">
              Data diperbarui pada 8 Oktober, 11:10 GMT+7
            </p>

            <div className="text-center mt-6">
              <Button
                onClick={handleConvert}
                className="bg-[#f0c94e] text-black font-semibold hover:bg-[#d4b43a]"
              >
                Konversikan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* HISTORI */}
        <section className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6 text-[#F9FAE0]">Histori Mata Uang</h3>
          <div className="bg-[#102E2A] p-4 rounded-xl max-w-3xl mx-auto">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#f0c94e" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>

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
    </div>
  )
}