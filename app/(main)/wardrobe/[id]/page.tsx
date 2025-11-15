"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

// --- Tipe dan Data (Harus diimpor dari file bersama/database) ---
// Untuk demo, kita definisikan lagi di sini
interface WardrobeItem {
  id: number;
  name: string;
  category: string; // Sederhanakan untuk tampilan
  color: string;
  size: string;
  imageUrl: string;
}

// Mock database
const allItems: WardrobeItem[] = [
  {
    id: 1,
    name: "T-Shirt Putih",
    category: "top-inner-kaos",
    color: "Putih",
    size: "P: 70cm, L: 50cm",
    imageUrl: "/wardrobe/white-tshirt.webp",
  },
  {
    id: 2,
    name: "Blouse Silk",
    category: "top-inner-kemeja",
    color: "Biru",
    size: "P: 65cm, L: 48cm",
    imageUrl: "/wardrobe/blouse-silk.webp",
  },
  {
    id: 3,
    name: "Jeans Navy",
    category: "bottom-long",
    color: "Navy",
    size: "P: 102cm, W: 80cm",
    imageUrl: "/wardrobe/jeans-navy.webp",
  },
  {
    id: 4,
    name: "Jacket Kulit",
    category: "top-outer-jacket",
    color: "Hitam",
    size: "P: 68cm, L: 55cm",
    imageUrl: "/wardrobe/jacket-leather.webp",
  },
  {
    id: 7,
    name: "Celana Pendek",
    category: "bottom-short",
    color: "Khaki",
    size: "P: 45cm, W: 82cm",
    imageUrl: "/wardrobe/short-khaki.webp",
  },
  {
    id: 8,
    name: "Sneakers Putih",
    category: "footwear",
    color: "Putih",
    size: "EU 42 / 26.5cm",
    imageUrl: "/wardrobe/sneakers-white.webp",
  },
  {
    id: 101,
    name: "Kemeja Kotak",
    category: "top-inner-kemeja",
    color: "Merah/Putih",
    size: "Belum diukur",
    imageUrl: "/wardrobe/draft/draft-1.webp",
  },
  {
    id: 102,
    name: "Celana Khaki",
    category: "bottom-long",
    color: "Khaki",
    size: "Belum diukur",
    imageUrl: "/wardrobe/draft/draft-2.webp",
  },
];

// Mock fungsi untuk mengambil data
const getItemById = (id: number): WardrobeItem | undefined => {
  return allItems.find((item) => item.id === id);
};

// --- Komponen Halaman Detail ---

export default function WardrobeItemDetailPage() {
  const params = useParams();
  const itemId = Number(params.id); // Dapatkan 'id' dari URL
  const item = getItemById(itemId);

  if (!item) {
    return (
      <div className="w-full max-w-screen-sm mx-auto p-4">
        <Link
          href="/wardrobe"
          className="flex items-center gap-2 text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Lemari
        </Link>
        <p>Item tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-sm mx-auto space-y-0 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/wardrobe" className="p-2 -ml-2 text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">Detail Item</h1>
          <div className="w-8"></div> {/* Placeholder for spacing */}
        </div>
      </div>

      {/* Konten Detail */}
      <div className="space-y-4">
        {/* Gambar Item */}
        <div className="w-full aspect-square bg-surface border-b border-border">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Item */}
        <div className="px-4 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">{item.name}</h2>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted">Kategori</span>
              <span className="font-medium text-foreground">
                {item.category}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Warna</span>
              <span className="font-medium text-foreground">{item.color}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Ukuran</span>
              <span className="font-medium text-foreground">{item.size}</span>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button className="flex-1 py-3 bg-surface border border-border text-danger rounded-lg font-medium hover:bg-danger/10 transition-colors flex items-center justify-center gap-2">
              <Trash2 className="w-4 h-4" />
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
