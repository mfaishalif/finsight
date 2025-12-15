"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip as ShadcnChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, ArrowRight, ArrowUp, FileCog, Download, Globe, BrainCircuit } from "lucide-react";
import Header from '@/components/layout/header';

// --- Types & Constants ---
type TimePeriod = "24h" | "3d" | "7d";
type CurrencyCode = "USD" | "AUD" | "JPY" | "MYR" | "IDR";

const currencies = [
  { code: "USD", name: "United States Dollar", flag: "/flags/us.svg" },
  { code: "AUD", name: "Australian Dollar", flag: "/flags/au.svg" },
  { code: "JPY", name: "Japanese Yen", flag: "/flags/jp.svg" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "/flags/my.svg" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "/flags/id.svg" },
];

// Helper to format currency
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

// Helper to format date label
const formatDateLabel = (dateRaw: string, period: TimePeriod) => {
  const date = new Date(dateRaw);
  if (period === "24h") {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' });
};

// --- Components ---

// 1. Hero Section (Controls Lifted)
interface HeroSectionProps {
  currencyFrom: string;
  setCurrencyFrom: (val: string) => void;
  currencyTo: string;
  setCurrencyTo: (val: string) => void;
  timePeriod: TimePeriod;
  setTimePeriod: (val: TimePeriod) => void;
  latestPrediction: number | null;
  latestHistory: number | null;
  realTimePrice: number | null;
  chartData: any[];
}

const HeroSection = ({
  currencyFrom, setCurrencyFrom,
  currencyTo, setCurrencyTo,
  timePeriod, setTimePeriod,
  latestPrediction,
  latestHistory,
  realTimePrice,
  chartData
}: HeroSectionProps) => {

  // Hitung persentase kenaikan/penurunan
  // Gunakan realTimePrice sebagai baseline jika ada, jika tidak gunakan latestHistory
  const baselinePrice = realTimePrice || latestHistory;

  const calculateChange = () => {
    if (!baselinePrice || !latestPrediction) return "+0.00%";
    const change = ((latestPrediction - baselinePrice) / baselinePrice) * 100;
    return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
  };

  const changePercent = calculateChange();
  const isPositive = changePercent.startsWith('+');

  // Filter data untuk Mini Chart: Hanya tampilkan Prediksi (termasuk titik "Current" sebagai bridge)
  const predictionOnlyData = chartData.filter(d => d.prediction !== null);

  return (
    <section className="bg-linear-to-b from-[#0f1f19] via-[#14271f] to-[#0f1f19] py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Empower Your Decision with <span className="text-[#f0c94e]">AI Exchange Forecasting</span>
          </h1>
          <p className="text-lg text-[#d9d6bf]">
            Prediksi pergerakan nilai tukar mata uang dengan akurasi tinggi menggunakan teknologi AI terdepan kami.
          </p>
          <Card className="p-6 bg-[#102E2A] border-none shadow-[0_0_30px_rgba(0,0,0,0.3)] text-white">
            <CardContent className="p-0 flex flex-col gap-6">
              <div className="flex flex-wrap items-end gap-4">
                <div>
                  <span className="text-sm font-medium text-[#f0c94e]">Pilih Negara</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Select value={currencyFrom} onValueChange={setCurrencyFrom}>
                      <SelectTrigger className="w-[130px] bg-[#102E2A] text-white border border-white/20">
                        <div className="flex items-center gap-2">
                          <Image
                            src={currencies.find(c => c.code === currencyFrom)?.flag || "/flags/us.svg"}
                            alt={currencyFrom}
                            width={20}
                            height={15}
                            className="rounded-sm"
                          />
                          <span>{currencyFrom}</span>
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
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <Select value={currencyTo} onValueChange={setCurrencyTo}>
                      <SelectTrigger className="w-[130px] bg-[#102E2A] text-white border border-white/20">
                        <div className="flex items-center gap-2">
                          <Image
                            src={currencies.find(c => c.code === currencyTo)?.flag || "/flags/id.svg"}
                            alt={currencyTo}
                            width={20}
                            height={15}
                            className="rounded-sm"
                          />
                          <span>{currencyTo}</span>
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
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-[#f0c94e]">Periode Waktu</span>
                  <ToggleGroup
                    type="single"
                    value={timePeriod}
                    onValueChange={(val) => val && setTimePeriod(val as TimePeriod)}
                    className="mt-1 gap-0 bg-[#102E2A] rounded-md border border-white/20 overflow-hidden"
                  >
                    <ToggleGroupItem value="24h" className="rounded-none border-none text-white hover:bg-white/10 hover:text-white data-[state=on]:bg-[#f0c94e] data-[state=on]:text-black h-9 px-4 border-r border-white/20">24 Jam</ToggleGroupItem>
                    <ToggleGroupItem value="3d" className="rounded-none border-none text-white hover:bg-white/10 hover:text-white data-[state=on]:bg-[#f0c94e] data-[state=on]:text-black h-9 px-4 border-r border-white/20">3 Hari</ToggleGroupItem>
                    <ToggleGroupItem value="7d" className="rounded-none border-none text-white hover:bg-white/10 hover:text-white data-[state=on]:bg-[#f0c94e] data-[state=on]:text-black h-9 px-4">7 Hari</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-sm text-[#f0c94e]">Harga Terkini ({currencyTo})</p>
                  <p className="text-2xl font-semibold">
                    {/* Display Real-time price if available, else fallback msg or history */}
                    {realTimePrice
                      ? formatCurrency(realTimePrice)
                      : (latestHistory ? formatCurrency(latestHistory) : "Memuat...")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#f0c94e]">Prediksi Akhir ({currencyTo})</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold">
                      {latestPrediction ? formatCurrency(latestPrediction) : "Memuat..."}
                    </p>
                    {latestPrediction && (
                      <Badge variant="outline" className={`border-opacity-50 flex items-center gap-1 ${isPositive ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-red-500 bg-red-500/10 text-red-500'}`}>
                        {isPositive ? <ArrowUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 rotate-180" />}
                        {changePercent}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-2">
            <Button
              size="lg"
              variant="default"
              className="bg-[#f0c94e] text-black hover:bg-[#f0c94e]/90"
              onClick={() => {
                document.getElementById('visualisasi')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Lihat Grafik <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Placeholder Mini Chart - Static for now to match design */}
        {/* Mini Chart Area */}
        <Card className="bg-[#102E2A] border-none shadow-[0_0_30px_rgba(0,0,0,0.3)] rounded-xl p-6 text-white h-[350px] flex flex-col justify-between overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6 z-10">
            <Badge variant="outline" className="bg-[#f0c94e]/10 text-[#f0c94e] border-[#f0c94e]/20">
              {timePeriod === '24h' ? '24 Hours' : timePeriod === '3d' ? '3 Days' : '7 Days'} Prediction
            </Badge>
          </div>

          <div className="mb-4 relative z-10 w-full">
            <p className="text-sm text-gray-400">Trend Pergerakan</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">
                {realTimePrice
                  ? formatCurrency(realTimePrice)
                  : latestHistory
                    ? formatCurrency(latestHistory)
                    : "IDR ..."}
              </span>
            </div>
          </div>

          <div className="w-full h-full flex-1 min-h-0 relative z-0">
            <ChartContainer config={{
              prediction: { label: "Prediction", color: "#f0c94e" },
            }} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={predictionOnlyData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f0c94e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f0c94e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.1)" />
                  <XAxis
                    dataKey="date"
                    hide={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 10 }}
                    tickFormatter={(value) => {
                      const d = new Date(value);
                      // Jika mode 24h, tampilkan Jam (e.g. 10:00)
                      // Jika mode 3d/7d, tampilkan Hari (e.g. Bug / Senin)
                      // Kita bisa cek global state/props timePeriod tapi di sini kita bisa infer
                      // atau, idealnya kita pass timePeriod ke component ini jika akses langsung sulit.
                      // Untungnya HeroSection punya akses ke timePeriod.
                      // Tapi Chart ada di dalam HeroSection, jadi kita bisa akses `timePeriod` (props dari HeroSection)

                      // Note: Kita ada di dalam HeroSection scope? Ya.
                      if (timePeriod === '24h') {
                        return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                      }
                      return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
                    }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    hide={false}
                    orientation="right"
                    tick={{ fill: '#666', fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    domain={['auto', 'auto']}
                    tickFormatter={(val) => (val / 1000).toFixed(0) + 'k'}
                  />
                  <ShadcnChartTooltip
                    content={<ChartTooltipContent indicator="dot" hideLabel valueFormatter={formatCurrency} />}
                  />
                  <Area
                    type="monotone"
                    dataKey="prediction"
                    stroke="#f0c94e"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                    connectNulls={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </Card>
      </div>
    </section>
  );
};

// 2. Prediction Chart (Unified Visualization)
const chartConfig = {
  historical: {
    label: 'Harga Historis',
    color: '#3b82f6', // Blue for history
  },
  prediction: {
    label: 'Prediksi AI',
    color: '#f0c94e', // Gold for prediction
  },
};

interface PredictionChartProps {
  data: any[];
  timePeriod: TimePeriod;
  currencyTo: string;
}

const PredictionChart = ({ data, timePeriod, currencyTo }: PredictionChartProps) => {
  return (
    <section id="visualisasi" className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Visualisasi Data Tren dan Prediksi</h2>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Bandingkan data historis dan prediksi untuk memahami pergerakan pasar dengan lebih baik.
        </p>
      </div>
      <Card className="bg-[#102E2A] border-none shadow-[0_0_30px_rgba(0,0,0,0.3)] rounded-xl px-6 pt-8 pb-8 text-white">
        <CardContent className="p-0">
          <div className="h-[400px] w-full">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.5)" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => formatDateLabel(value, timePeriod)}
                    tick={{ fill: 'white', fontSize: 12 }}
                    minTickGap={30}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    domain={[
                      (dataMin: number) => Math.floor(dataMin * 0.999),
                      (dataMax: number) => Math.ceil(dataMax * 1.001)
                    ]}
                    tick={{ fill: 'white', fontSize: 12 }}
                    tickFormatter={(value) => new Intl.NumberFormat('id-ID', { notation: 'compact', minimumFractionDigits: 1, maximumFractionDigits: 2 }).format(value)}
                  />
                  <ShadcnChartTooltip
                    content={<ChartTooltipContent indicator="line" valueFormatter={formatCurrency} />}
                    labelFormatter={(value) => formatDateLabel(value, timePeriod)}
                  />
                  <Legend verticalAlign="top" height={36} />

                  {/* Garis Historis */}
                  <Line
                    dataKey="historical"
                    type="monotone"
                    stroke="var(--color-historical)"
                    strokeWidth={2}
                    dot={false}
                    name={`Historis (${currencyTo})`}
                    connectNulls={false}
                  />

                  {/* Garis Prediksi */}
                  <Line
                    dataKey="prediction"
                    type="monotone"
                    stroke="var(--color-prediction)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name={`Prediksi AI (${currencyTo})`}
                    connectNulls={true}
                  />

                  {/* Garis Vertikal Penanda "Sekarang" */}
                  {data.length > 0 && (
                    <ReferenceLine
                      x={data.findLast(d => d.historical !== null)?.date}
                      stroke="white"
                      strokeDasharray="3 3"
                      label={{ position: 'top', value: 'Sekarang', fill: 'white', fontSize: 12 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

const ExportCard = ({ data, timePeriod }: { data: any[], timePeriod: TimePeriod }) => {
  const handleExport = () => {
    const headers = ["Date", "Historical Price (IDR)", "Prediction Price (IDR)"];

    // Helper to format date consistent with Chart
    const formatExportDate = (dateRaw: string) => {
      const d = new Date(dateRaw);
      if (timePeriod === "24h") return d.toLocaleString('id-ID'); // Full Date + Time for hourly
      return d.toLocaleDateString('id-ID'); // Date only for daily
    };

    const rows = data.map(item => {
      const dateStr = formatExportDate(item.date);
      const histVal = item.historical !== null ? item.historical : "";
      const predVal = item.prediction !== null ? item.prediction : "";
      // Excel friendly number format? Keep raw for calculation or localized? 
      // Raw is safer for re-import, but user might want readability. 
      // Let's stick to raw numbers but ensure column alignment.
      return `"${dateStr}",${histVal},${predVal}`;
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `finsight_export_${timePeriod}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="bg-[#0c1814] py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <Card className="text-center bg-[#102E2A] border-none shadow-[0_0_30px_rgba(0,0,0,0.3)] rounded-xl px-6 pt-8 pb-8 text-white max-w-5xl mx-auto">
          <CardHeader>
            <div className="mx-auto bg-[#f0c94e]/10 rounded-full p-3 w-fit">
              <FileCog className="h-8 w-8 text-[#f0c94e]" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <CardTitle className="text-2xl font-bold">Fungsionalitas Ekspor Data</CardTitle>
            <p className="text-gray-300 max-w-md">
              Ekspor hasil analisis dan prediksi Anda dalam format CSV untuk laporan atau analisis lebih lanjut.
            </p>
            <Button variant="default" className="bg-[#f0c94e] text-black hover:bg-[#f0c94e]/90" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Ekspor Data (CSV)
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
const LearnMoreCard = () => {
  return (
    <section className="container mx-auto px-6 py-16 sm:py-24">
      <Card className="bg-[#102E2A] border-none shadow-[0_0_30px_rgba(0,0,0,0.3)] rounded-xl px-6 pt-8 pb-8 text-white max-w-5xl mx-auto">
        <CardContent className="p-0">
          <div className="flex flex-col items-center gap-4 relative z-10 text-center">
            <div className="bg-[#f0c94e]/10 rounded-full p-3 w-fit">
              <BrainCircuit className="h-8 w-8 text-[#f0c94e]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Pelajari Bagaimana AI Mengubah Analisis Finansial</h3>
              <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
                Temukan teknologi deep learning di balik prediksi kami dan bagaimana Anda dapat memanfaatkannya untuk keuntungan strategis.
              </p>
            </div>
            <Link href="/tentang">
              <Button variant="default" className="mt-4 px-0 bg-[#f0c94e] text-black hover:bg-[#f0c94e]/90">
                Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

const Footer = () => {
  const platformLinks = [
    { href: "#", text: "Home Page" },
    { href: "/konversi-mata-uang", text: "Konversi Mata Uang" },
    { href: "/Edukasi", text: "Edukasi" },
  ];
  const supportLinks = [
    { href: "/dokumen-api", text: "Dokumentasi" },
    { href: "#", text: "FAQ" },
    { href: "#", text: "Support" },
  ];

  return (
    <footer className="bg-[#0E0E0E] py-10 px-12 text-sm text-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Description */}
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

        {/* Platform Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Platform</h3>
          <ul className="space-y-1">
            {platformLinks.map((link) => (
              <li key={link.text}>
                <Link href={link.href} className="hover:text-[#f0c94e]">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tentang Kami / Social Links */}
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

        {/* Dukungan Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Dukungan</h3>
          <ul className="space-y-1">
            {supportLinks.map((link) => (
              <li key={link.text}>
                <Link href={link.href} className="hover:text-[#f0c94e]">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 py-4 text-gray-400 border-t border-[#0f251e]">
        © 2025 FinSight. All rights reserved.
      </div>
    </footer>
  );
};
export default function Homepage() {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("IDR");
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("7d");

  const [chartData, setChartData] = useState<any[]>([]);
  const [latestHistory, setLatestHistory] = useState<number | null>(null);
  const [latestPrediction, setLatestPrediction] = useState<number | null>(null);
  const [realTimePrice, setRealTimePrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const symbol = `${currencyFrom}${currencyTo}=X`;
      const mode = timePeriod === "24h" ? "hourly" : "daily";

      try {
        const BASE_URL = "https://mfaishalif-finsight-prediction-api.hf.space";

        const [historyRes, predictRes] = await Promise.all([
          fetch(`/api/history?from=${currencyFrom}&to=${currencyTo}&mode=${mode}`),
          fetch(`${BASE_URL}/predict/${mode}?symbol=${symbol}`)
        ]);

        const historyJson = await historyRes.json();
        const predictData = await predictRes.json();

        if (predictData.data && predictData.data.length > 0) {
          const todayStr = new Date().toISOString().split('T')[0];
          const firstPredDate = predictData.data[0].timestamp.split('T')[0];
          // Only remove duplicate if we are injecting real-time data later on same day?
          // The original logic was removing it. Keep it.
          if (firstPredDate === todayStr) {
            predictData.data.shift();
          }
        }

        const historyData = historyJson.data || [];

        const conversionRes = await fetch(`/api/conversion?from=${currencyFrom}&to=${currencyTo}&amount=1`);
        const conversionData = await conversionRes.json();

        if (conversionData.convertedAmount) {
          setRealTimePrice(conversionData.convertedAmount);
        } else {
          setRealTimePrice(null);
        }

        if (historyJson.error || predictData.detail) {
          console.error("ML API Error");
        }

        let finalHistory: any[] = [];
        let finalPrediction: any[] = [];
        let rawPredictions = predictData.data ? predictData.data : [];

        // --- FIX: SLICE PREDICTIONS FIRST ---
        // Ensure we only process the relevant predictions for the selected period
        if (timePeriod === "3d") rawPredictions = rawPredictions.slice(0, 3);
        if (timePeriod === "24h") rawPredictions = rawPredictions.slice(0, 24);
        if (timePeriod === "7d") rawPredictions = rawPredictions.slice(0, 7);

        // 1. Process History (Dynamic Slice based on Sliced Prediction Count)
        const predictionCount = rawPredictions.length;
        const sliceCount = predictionCount > 0 ? predictionCount : (timePeriod === "24h" ? 24 : 7);

        if (Array.isArray(historyData)) {
          const slicedHistory = historyData.slice(-sliceCount);
          finalHistory = slicedHistory.map((item: any) => ({
            date: item.date,
            historical: item.rate,
            prediction: null
          }));

          // INJECTION: Use Real-Time Price
          if (conversionData && conversionData.rate) {
            const realTimeDate = new Date().toISOString().split('T')[0];
            const lastHistDate = finalHistory.length > 0 ? finalHistory[finalHistory.length - 1].date : "";

            if (lastHistDate !== realTimeDate) {
              finalHistory.push({
                date: realTimeDate,
                historical: conversionData.rate,
                prediction: null
              });
            } else {
              finalHistory[finalHistory.length - 1].historical = conversionData.rate;
            }
          }
        }

        // 2. Process Predictions (Filter Duplicates against History)
        // (Slicing already done above)

        // Robust Filter: Remove predictions that exist in history
        const historyDates = new Set(finalHistory.map(d => d.date));
        rawPredictions = rawPredictions.filter((p: any) => {
          const pDate = p.timestamp.split('T')[0];
          return !historyDates.has(pDate);
        });

        // Alignment Logic
        const currentRate = conversionData?.convertedAmount || (finalHistory.length > 0 ? finalHistory[finalHistory.length - 1].historical : null);

        if (rawPredictions.length > 0 && currentRate) {
          const firstPred = rawPredictions[0].value;
          const offset = currentRate - firstPred;

          rawPredictions = rawPredictions.map((p: any) => ({
            ...p,
            value: p.value + offset
          }));
        }

        finalPrediction = rawPredictions.map((item: any) => ({
          date: item.timestamp,
          historical: null,
          prediction: item.value
        }));

        // BRIDGE
        if (finalHistory.length > 0) {
          const lastIdx = finalHistory.length - 1;
          finalHistory[lastIdx].prediction = finalHistory[lastIdx].historical;
          finalHistory[lastIdx]._suppressTooltip = ["prediction"];
        }

        setChartData([...finalHistory, ...finalPrediction]);

        if (finalHistory.length > 0) setLatestHistory(finalHistory[finalHistory.length - 1].historical);
        if (finalPrediction.length > 0) setLatestPrediction(finalPrediction[finalPrediction.length - 1].prediction);

      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currencyFrom, currencyTo, timePeriod]);


  return (
    <div className="min-h-screen bg-[#0f271f] text-[#ffffff]">
      <Header />
      <main>
        <HeroSection
          currencyFrom={currencyFrom} setCurrencyFrom={setCurrencyFrom}
          currencyTo={currencyTo} setCurrencyTo={setCurrencyTo}
          timePeriod={timePeriod} setTimePeriod={setTimePeriod}
          latestHistory={latestHistory} latestPrediction={latestPrediction}
          realTimePrice={realTimePrice}
          chartData={chartData}
        />
        <PredictionChart data={chartData} timePeriod={timePeriod} currencyTo={currencyTo} />
        <ExportCard data={chartData} timePeriod={timePeriod} />
        <LearnMoreCard />
      </main>
      <Footer />
    </div>
  );
}