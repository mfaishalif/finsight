"use client";

import React, { useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, ArrowRight, ArrowUp, FileCog, Download, Globe } from "lucide-react";


const miniChartData = [
  { month: 'Jan', value: 16400 },
  { month: 'Feb', value: 16450 },
  { month: 'Mar', value: 16500 },
  { month: 'Apr', value: 16551.50 },
  { month: 'May', value: 16520 },
  { month: 'Jun', value: 16580 },
];

const currencies = [
  { code: "USD", name: "United States Dollar", flag: "/flags/us.svg" },
  { code: "AUD", name: "Australian Dollar", flag: "/flags/au.svg" },
  { code: "JPY", name: "Japanese Yen", flag: "/flags/jp.svg" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "/flags/my.svg" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "/flags/id.svg" },
];

const mainChartData = [
  { date: '2025-10-01', historical: 16300, prediction: null },
  { date: '2025-10-02', historical: 16320, prediction: null },
  { date: '2025-10-03', historical: 16350, prediction: null },
  { date: '2025-10-04', historical: 16340, prediction: null },
  { date: '2025-10-05', historical: 16400, prediction: null },
  { date: '2025-10-06', historical: 16420, prediction: null },
  { date: '2025-10-07', historical: 16450, prediction: null },
  { date: '2025-10-08', historical: 16551.50, prediction: 16551.50 },
  { date: '2025-10-09', historical: null, prediction: 16570 },
  { date: '2025-10-10', historical: null, prediction: 16590 },
  { date: '2025-10-11', historical: null, prediction: 16600 },
  { date: '2025-10-12', historical: null, prediction: 16580 },
];

const chartConfig = {
  historical: {
    label: 'Harga Historis',
    color: 'hsl(var(--chart-1))',
  },
  prediction: {
    label: 'Prediksi AI',
    color: 'hsl(var(--chart-2))',
  },
};

import Header from '@/components/layout/header';

const miniChartConfig = {
  value: {
    label: 'Harga',
    color: 'hsl(var(--chart-1))',
  },
};

const HeroSection = () => {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("IDR");
  const PREDICTED_PRICE_CHANGE_PERCENTAGE = "+1.15%";

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
                  <ToggleGroup type="single" defaultValue="7" className="mt-1 gap-0 bg-[#102E2A] rounded-md border border-white/20 overflow-hidden">
                    <ToggleGroupItem value="3" className="rounded-none border-none text-white hover:bg-white/10 hover:text-white data-[state=on]:bg-[#f0c94e] data-[state=on]:text-black h-9 px-4 border-r border-white/20">24 Jam</ToggleGroupItem>
                    <ToggleGroupItem value="7" className="rounded-none border-none text-white hover:bg-white/10 hover:text-white data-[state=on]:bg-[#f0c94e] data-[state=on]:text-black h-9 px-4 border-r border-white/20">7 Hari</ToggleGroupItem>
                    {/* <ToggleGroupItem value="20" className="rounded-none border-none text-white hover:bg-white/10 hover:text-white data-[state=on]:bg-[#f0c94e] data-[state=on]:text-black h-9 px-4">20 Hari</ToggleGroupItem> */}
                  </ToggleGroup>
                </div>
              </div>
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-sm text-[#f0c94e]">Harga ({currencyTo})</p>
                  <p className="text-2xl font-semibold">16,551.50</p>
                </div>
                <div>
                  <p className="text-sm text-[#f0c94e]">Prediksi ({currencyTo})</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold">16,570.00</p>
                    <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-400 flex items-center gap-1">
                      <ArrowUp className="h-3 w-3" />
                      {PREDICTED_PRICE_CHANGE_PERCENTAGE}
                    </Badge>
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
              Lihat Prediksi <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <Card className="bg-[#102E2A] border-none shadow-[0_0_30px_rgba(0,0,0,0.3)] rounded-xl p-6 text-white h-[250px]">
          <div className="w-full h-full">
            <ChartContainer config={miniChartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={miniChartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: 'white', fontSize: 12 }} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `Rp${(Number(value) / 1000).toFixed(2)}k`}
                    domain={['dataMin - 100', 'dataMax + 100']}
                    tick={{ fill: 'white', fontSize: 12 }}
                  />
                  <ShadcnChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                    formatter={(value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value as number)}
                  />
                  <Area type="monotone" dataKey="value" stroke="var(--color-value)" fill="url(#colorValue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </Card>
      </div>
    </section>
  );
};

const VisualizationTabs = () => {
  return (
    <section id="visualisasi" className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Visualisasi Data Tren dan Prediksi</h2>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Bandingkan data historis dan prediksi untuk memahami pergerakan pasar dengan lebih baik.
        </p>
      </div>
      <Card className="bg-[#102E2A] border-none shadow-[0_0_30px_rgba(0,0,0,0.3)] rounded-xl px-6 pt-8 pb-8 text-white">
        <CardHeader className="flex flex-col items-center p-0">
          <Tabs defaultValue="historical" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2 bg-[#102E2A] border border-white/20 rounded-lg p-1 h-auto">
              <TabsTrigger
                value="historical"
                className="text-white data-[state=active]:bg-[#f0c94e] data-[state=active]:text-black rounded-md py-2 transition-all"
              >
                Tren Historis
              </TabsTrigger>
              <TabsTrigger
                value="prediction"
                className="text-white data-[state=active]:bg-[#f0c94e] data-[state=active]:text-black rounded-md py-2 transition-all"
              >
                Prediksi AI
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0 mt-6">
          <Tabs defaultValue="historical" className="w-full">
            <TabsContent value="historical">
              <div className="h-[400px] w-full">
                <ChartContainer config={chartConfig} className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mainChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.5)" />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
                        tick={{ fill: 'white', fontSize: 12 }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => `Rp${(Number(value) / 1000).toFixed(2)}k`}
                        domain={['dataMin - 100', 'dataMax + 100']}
                        tick={{ fill: 'white', fontSize: 12 }}
                      />
                      <ShadcnChartTooltip content={<ChartTooltipContent indicator="line" />} />
                      <Legend />
                      <Line dataKey="historical" type="monotone" stroke="var(--color-historical)" strokeWidth={2} dot={false} />
                      <Line dataKey="prediction" type="monotone" stroke="var(--color-prediction)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>
            <TabsContent value="prediction">
              <div className="h-[400px] w-full">
                <ChartContainer config={chartConfig} className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mainChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.5)" />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => `Rp${(Number(value) / 1000).toFixed(2)}k`}
                        domain={['dataMin - 100', 'dataMax + 100']}
                        tick={{ fill: 'white', fontSize: 12 }}
                      />
                      <ShadcnChartTooltip content={<ChartTooltipContent indicator="line" />} />
                      <Legend />
                      <Line dataKey="historical" type="monotone" stroke="var(--color-historical)" strokeWidth={2} dot={false} />
                      <Line dataKey="prediction" type="monotone" stroke="var(--color-prediction)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};

const ExportCard = () => {
  const handleExport = () => {
    // 1. Header Row
    const headers = ["Date", "Historical Price (IDR)", "Prediction Price (IDR)"];

    // 2. Data Rows
    const rows = mainChartData.map(item => [
      item.date,
      item.historical !== null ? item.historical : "",
      item.prediction !== null ? item.prediction : ""
    ]);

    // 3. Combine
    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");

    // 4. Create Blob and Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "finsight_export.csv");
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
            <Button
              variant="default"
              className="bg-[#f0c94e] text-black hover:bg-[#f0c94e]/90"
              onClick={handleExport}
            >
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
          <div className="relative z-10 text-center">
            <h3 className="text-2xl font-bold">Pelajari Bagaimana AI Mengubah Analisis Finansial</h3>
            <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
              Temukan teknologi deep learning di balik prediksi kami dan bagaimana Anda dapat memanfaatkannya untuk keuntungan strategis.
            </p>
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
  return (
    <div className="min-h-screen bg-[#0f271f] text-[#ffffff]">
      <Header />
      <main>
        <HeroSection />
        <VisualizationTabs />
        <ExportCard />
        <LearnMoreCard />
      </main>
      <Footer />
    </div>
  );
}