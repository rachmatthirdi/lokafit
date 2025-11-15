"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";

// --- Tipe (Definisikan tipe produk) ---
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description?: string; // Tambahkan deskripsi
}

// --- 1. Data Produk (Harus sama dengan di ShopPage) ---
// Idealnya, ini diimpor dari file/database terpusat
const products: Product[] = [
  {
    id: 1,
    name: "Blue Dress",
    price: "Rp 299.000",
    image: "/blue-dress.png",
    description:
      "Gaun biru yang elegan, cocok untuk acara santai maupun formal.",
  },
  {
    id: 2,
    name: "White Blouse",
    price: "Rp 199.000",
    image: "/white-blouse.png",
    description: "Blus putih katun yang nyaman untuk dipakai sehari-hari.",
  },
  {
    id: 3,
    name: "Black Jacket",
    price: "Rp 399.000",
    image: "/black-jacket.png",
    description: "Jaket hitam serbaguna dengan bahan premium.",
  },
  {
    id: 4,
    name: "Beige Pants",
    price: "Rp 249.000",
    image: "/beige-pants.jpg",
    description: "Celana beige dengan potongan modern dan nyaman.",
  },
  {
    id: 5,
    name: "Red Skirt",
    price: "Rp 279.000",
    image: "/flowing-red-skirt.png",
    description: "Rok merah cantik dengan bahan yang flowy.",
  },
  {
    id: 6,
    name: "Green Sweater",
    price: "Rp 229.000",
    image: "/green-sweater.png",
    description: "Sweater hijau hangat untuk hari yang dingin.",
  },
];

// Fungsi helper untuk mengambil data
const getProductById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};

// --- Komponen Halaman Detail ---

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id); // 2. Ambil 'id' dari URL
  const product = getProductById(productId); // 3. Cari produk yang sesuai

  const [isFavorited, setIsFavorited] = useState(false); // State favorit

  // 4. Tampilkan 'not found' jika produk tidak ada
  if (!product) {
    return (
      <div className="w-full max-w-screen-sm mx-auto p-4">
        <Link
          href="/shop"
          className="flex items-center gap-2 text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Toko
        </Link>
        <p>Produk tidak ditemukan.</p>
      </div>
    );
  }

  // 5. Tampilkan detail produk yang benar (dinamis)
  return (
    <div className="w-full max-w-screen-sm mx-auto">
      {/* Gambar Produk */}
      <div className="relative aspect-square bg-surface">
        <img
          src={product.image || "/placeholder.svg"} // DINAMIS
          alt={product.name} // DINAMIS
          className="w-full h-full object-cover"
        />
        <Link
          href="/shop"
          className="absolute top-4 left-4 p-2 rounded-full bg-white/80 hover:bg-white"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
      </div>

      {/* Info Produk */}
      <div className="px-4 py-6 space-y-4">
        {/* Header dengan actions */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {product.name} {/* DINAMIS */}
            </h1>
            <p className="text-2xl text-primary font-semibold mt-1">
              {product.price} {/* DINAMIS */}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-2 rounded-full hover:bg-surface transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorited ? "fill-heart text-heart" : "text-heart"
                }`}
              />
            </button>
            {/* Tombol Bookmark/Save bisa ditambahkan di sini jika perlu */}
          </div>
        </div>

        {/* Deskripsi */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Deskripsi</h3>
          <p className="text-sm text-muted">
            {product.description || "Tidak ada deskripsi untuk produk ini."}{" "}
            {/* DINAMIS */}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 pt-4">
          <Link
            href={`/try-on?product=${product.id}`} // DINAMIS
            className="flex-1 px-4 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors text-center"
          >
            Virtual Try On
          </Link>
          <button className="flex-1 px-4 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary-light transition-colors flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>

        {/* Recommendation Section (Masih statis, bisa di-loop jika ada data) */}
        <div className="pt-4 border-t border-border">
          <h3 className="font-semibold text-foreground mb-3">Rekomendasi</h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Placeholder untuk rekomendasi */}
            <div className="bg-surface rounded-lg aspect-square border" />
            <div className="bg-surface rounded-lg aspect-square border" />
            <div className="bg-surface rounded-lg aspect-square border" />
            <div className="bg-surface rounded-lg aspect-square border" />
          </div>
        </div>
      </div>
    </div>
  );
}
