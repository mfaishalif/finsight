"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";

const Header = () => {
  const pathname = usePathname();
  const navLinks = [
    { href: "/", text: "Home Page" },
    { href: "/Tentang", text: "Tentang" },
    { href: "/Edukasi", text: "Edukasi" },
    { href: "/konversi-mata-uang", text: "Konversi Mata Uang" },
    { href: "/dokumen-api", text: "Dokumentasi API" },
  ];
  return (
    <header className="flex items-center justify-between px-12 py-5 bg-[#0E2C27]/80 backdrop-blur-md shadow-sm">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-[#192f26] flex items-center justify-center">
          <Image src="/logo-finsight.svg" alt="FinSight" width={26} height={26} />
        </div>
        <span className="font-semibold text-lg text-white">FinSight</span>
      </Link>
      <nav className="hidden md:flex gap-8 text-sm font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.text}
            href={link.href}
            className={
              pathname === link.href
                ? "underline decoration-[#c9a93b] text-[#f0c94e]"
                : "text-white hover:text-[#f0c94e]"
            }
          >
            {link.text}
          </Link>
        ))}
      </nav>
      <Button variant="outline" className="md:hidden bg-[#000000] border-[#f0c94e] text-[#f0c94e] hover:bg-[#f0c94e]/10">Menu</Button>
    </header>
  );
};

export default Header;