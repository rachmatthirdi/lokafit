"use client";

import Link from "next/link";
import { ArrowLeft, Camera, RefreshCw } from "lucide-react";

export default function AccurateScanPage() {
  return (
    <div className="w-full max-w-screen-sm mx-auto h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/wardrobe" className="p-2 -ml-2 text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">
            Pindai Akurat (Koin)
          </h1>
          <div className="w-8"></div> {/* Placeholder */}
        </div>
      </div>

      {/* Tampilan Kamera (Placeholder) */}
      <div className="flex-1 bg-black flex items-center justify-center text-white/50">
        {/* Placeholder untuk feed kamera */}
        <Camera className="w-16 h-16" />
      </div>

      {/* Area Instruksi & Tombol */}
      <div className="bg-background p-6 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-foreground">Instruksi</h3>
          <p className="text-sm text-muted">
            Posisikan baju di permukaan datar. Letakkan 1 koin (Rp1000) di
            sebelah baju sebagai referensi ukuran.
          </p>
        </div>

        {/* Visual Aid */}
        <div className="flex justify-center gap-4 items-center p-4 bg-surface rounded-lg">
          <div className="w-16 h-16 rounded-lg bg-gray-300 flex items-center justify-center">
            {/*  */}
            👕
          </div>
          <span className="text-muted">+</span>
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-800 font-bold">
            {/*  */}
            1k
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex items-center justify-center gap-8">
          <button className="p-4 rounded-full bg-surface hover:bg-surface/70 text-muted">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="w-16 h-16 rounded-full bg-primary ring-4 ring-primary/30 flex items-center justify-center text-white">
            <Camera className="w-7 h-7" />
          </button>
          <div className="w-12 h-12"></div> {/* Spacing */}
        </div>
      </div>
    </div>
  );
}
