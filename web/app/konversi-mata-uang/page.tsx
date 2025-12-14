"use client"

import { useState, useEffect } from "react"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { RefreshCcw } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import Image from "next/image"

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
  const [amount, setAmount] = useState<number | "">("")
  const [result, setResult] = useState<number | null>(null) // Initialize as null
  const [loading, setLoading] = useState(false)
  const [timestamp, setTimestamp] = useState<string>("")
  const [error, setError] = useState<string>("")

  // Chart state
  const [chartData, setChartData] = useState<any[]>([])
  const [range, setRange] = useState("1mo")

  // Fetch chart data on currency change
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/history?from=${fromCurrency}&to=${toCurrency}&range=${range}`)
        const data = await res.json()
        if (data.data) {
          // Formatting for recharts: "name" (date) and "rate"
          const formatted = data.data.map((item: any) => ({
            name: new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
            rate: item.rate
          }))
          setChartData(formatted)
        }
      } catch (err) {
        console.error("Failed to load chart data", err)
      }
    }
    fetchHistory()
  }, [fromCurrency, toCurrency, range])

  const handleConvert = async () => {
    if (!amount) {
      setError("Masukkan jumlah uang")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch(`/api/conversion?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
      if (!response.ok) {
        throw new Error("Gagal mengambil data konversi")
      }
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setResult(data.convertedAmount)
      setTimestamp(data.timestamp)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  // Initial load? No, let user trigger it. Or trigger once?
  // Let's keep it manual trigger for now as per design.

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f1f19] via-[#14271f] to-[#0f1f19] text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-12 py-5 bg-[#0E2C27]/80 backdrop-blur-md shadow-sm">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#192f26] flex items-center justify-center">
            <Image src="/logo-finsight.svg" alt="FinSight" width={26} height={26} />
          </div>
          <span className="font-semibold text-lg text-white">FinSight</span>
        </Link>

        <nav className="flex gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-[#f0c94e]">Home Page</Link>
          <Link href="/tentang" className="hover:text-[#f0c94e]">Tentang</Link>
          <Link href="/Edukasi" className="hover:text-[#f0c94e]">Edukasi</Link>
          <Link href="/konversi-mata-uang" className="underline decoration-[#c9a93b] text-[#f0c94e]">Konversi Mata Uang</Link>
          <Link href="/dokumen-api" className="hover:text-[#f0c94e]">Dokumentasi API</Link>
        </nav>
      </header>

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
        <Card className="bg-[#102E2A] border-none shadow-[0_0_30px_rgba(0,0,0,0.3)] max-w-2xl mx-auto p-6 text-white">
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Konversi Sekarang!</h3>
              <Button variant="ghost" size="icon" className="text-[#f0c94e] hover:bg-[#f0c94e]/10">
                <RefreshCcw className={loading ? "animate-spin" : ""} />
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
                placeholder="Jumlah"
                value={amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
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
              <div className="bg-[#183A34] py-2 px-4 rounded-md text-center font-semibold min-h-[40px] flex items-center justify-center">
                {loading ? "..." : result !== null ? new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(result) : "-"}
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-center mt-2 text-sm">{error}</div>
            )}

            <div className="mt-4 text-center text-[#f0c94e] font-semibold min-h-[24px]">
              {result !== null && !loading ? (
                `${amount} ${fromCurrency} = ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: toCurrency }).format(result)}`
              ) : ""}
            </div>

            <p className="text-center text-gray-400 text-sm mt-1">
              {timestamp ? `Data diperbarui pada ${new Date(timestamp).toLocaleString('id-ID')}` : "Masukkan Jumlah Uang untuk Melihat Konversi"}
            </p>

            <div className="text-center mt-6">
              <Button
                onClick={handleConvert}
                disabled={loading}
                className="bg-[#f0c94e] text-black font-semibold hover:bg-[#f0c94e]/90 disabled:opacity-50"
              >
                {loading ? "Memproses..." : "Konversikan"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* HISTORI */}
        <section className="mt-16 text-center">
          <div className="flex items-center justify-between max-w-3xl mx-auto mb-6">
            <h3 className="text-2xl font-semibold text-[#F9FAE0]">Histori Mata Uang ({fromCurrency} - {toCurrency})</h3>
            <div className="flex bg-[#102E2A] p-1 rounded-lg gap-1">
              {["1w", "1mo", "3mo", "6mo", "1y"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${range === r ? "bg-[#f0c94e] text-black font-bold" : "text-gray-400 hover:text-white"}`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-[#102E2A] shadow-[0_0_30px_rgba(0,0,0,0.3)] p-4 rounded-xl max-w-3xl mx-auto">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <XAxis dataKey="name" stroke="#aaa" fontSize={12} tickMargin={10} minTickGap={30} />
                  <YAxis stroke="#aaa" fontSize={12} domain={['auto', 'auto']} tickFormatter={(val) => val.toLocaleString('id-ID')} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#183A34', border: 'none', color: '#fff' }}
                    itemStyle={{ color: '#f0c94e' }}
                    labelStyle={{ color: '#ccc' }}
                  />
                  <Line type="monotone" dataKey="rate" stroke="#f0c94e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-gray-500">
                Memuat data grafik...
              </div>
            )}
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
              <li><a href="/" className="hover:text-[#f0c94e]">Home Page</a></li>
              <li><a href="/tentang" className="hover:text-[#f0c94e]">Tentang</a></li>
              <li><a href="/konversi-mata-uang" className="hover:text-[#f0c94e]">Konversi Mata Uang</a></li>
              <li><a href="/Edukasi" className="hover:text-[#f0c94e]">Edukasi</a></li>
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
