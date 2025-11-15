"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ImageIcon, UploadCloud, Download } from "lucide-react";

// Tipe untuk item yang terdeteksi
interface DetectedItem {
  id: string;
  name: string; // "Atasan", "Bawahan"
  bbox: { top: string; left: string; width: string; height: string }; // Untuk styling
  imageUrl: string; // Mock image URL
}

export default function OotdScanPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Data deteksi palsu
  const detectedItems: DetectedItem[] = [
    {
      id: "d1",
      name: "Atasan (Kemeja)",
      bbox: { top: "15%", left: "30%", width: "40%", height: "35%" },
      imageUrl: "/wardrobe/draft-1.jpg",
    },
    {
      id: "d2",
      name: "Bawahan (Celana)",
      bbox: { top: "50%", left: "35%", width: "30%", height: "40%" },
      imageUrl: "/wardrobe/draft-2.jpg",
    },
  ];

  // Simulasi upload
  const handleUpload = () => {
    // Di aplikasi nyata, ini akan membuka file picker
    // Di sini kita hanya set state untuk menampilkan hasil
    setUploadedImage("/ootd-example.jpg"); // Ganti dengan path ke gambar OOTD Anda
  };

  return (
    <div className="w-full max-w-screen-sm mx-auto min-h-screen space-y-0 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/wardrobe" className="p-2 -ml-2 text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">
            Pindai cepat
          </h1>
          <div className="w-8"></div> {/* Placeholder */}
        </div>
      </div>

      {/* Konten */}
      <div className="p-4 space-y-6">
        {!uploadedImage ? (
          /* Tampilan Awal (Upload) */
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-lg text-center space-y-4 h-64">
            <UploadCloud className="w-12 h-12 text-muted" />
            <h3 className="font-semibold text-foreground">Upload Foto OOTD</h3>
            <p className="text-sm text-muted">
              Pilih foto dari galeri Anda untuk mendeteksi item fashion.
            </p>
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Pilih Foto
            </button>
          </div>
        ) : (
          /* Tampilan Hasil (Setelah Upload) */
          <div className="space-y-6">
            {/* Gambar dengan Bounding Box */}
            <div className="relative w-full aspect-4/5 bg-surface rounded-lg overflow-hidden border border-border">
              <img
                src={uploadedImage}
                alt="OOTD"
                className="w-full h-full object-cover"
              />
              {/* Overlay Bounding Box */}
              {detectedItems.map((item) => (
                <div
                  key={item.id}
                  className="absolute border-2 border-primary-light shadow-md animate-pulse"
                  style={{
                    top: item.bbox.top,
                    left: item.bbox.left,
                    width: item.bbox.width,
                    height: item.bbox.height,
                  }}
                >
                  <span className="absolute -top-6 left-0 px-2 py-0.5 bg-primary-light text-primary text-xs font-medium rounded-t-md">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Daftar Item Terdeteksi */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Item Terdeteksi</h3>
              {detectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 bg-surface rounded-lg border border-border"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover bg-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted">Ukuran belum diukur</p>
                  </div>
                  <button className="shrink-0 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium hover:bg-primary/20 flex items-center gap-1.5">
                    <Download className="w-3 h-3" />
                    Simpan Draf
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
