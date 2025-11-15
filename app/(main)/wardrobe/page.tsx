"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Camera, ImageIcon, Heart, ArrowLeft } from "lucide-react";

// --- 1. TIPE DIPERBARUI ---
// ... (ItemCategory tetap sama)

interface WardrobeItem {
  id: number;
  name: string;
  category: ItemCategory;
  color: string;
  size: string; // <-- DIUBAH: Sekarang string untuk deskripsi cm
  imageUrl: string;
}

// --- 2. DATA DUMMY DIPERBARUI (dengan ukuran cm) ---

const permanentItems: WardrobeItem[] = [
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
];

const draftItems: WardrobeItem[] = [
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

// ... (categoriesDisplay tetap sama)
const categoriesDisplay = [
  {
    title: "Atasan",
    subCategories: [
      { title: "Inner (Kaos, Kemeja, dll)", key: "top-inner" },
      { title: "Outer (Jacket, Sweater, dll)", key: "top-outer" },
    ],
  },
  {
    title: "Bawahan",
    subCategories: [
      { title: "Long (Panjang)", key: "bottom-long" },
      { title: "Short (Pendek)", key: "bottom-short" },
    ],
  },
  { title: "Alas Kaki", key: "footwear" },
  {
    title: "Aksesoris",
    subCategories: [
      { title: "Kepala", key: "head-accessory" },
      { title: "Tangan", key: "hand-accessory" },
    ],
  },
  { title: "Dresses", key: "dress" },
  { title: "Draf Lainnya", key: "draft-item" },
];

// --- 4. HELPER & KOMPONEN ANAK ---

const getItemsForCategory = (itemList: WardrobeItem[], categoryKey: string) => {
  return itemList.filter((item) => item.category.startsWith(categoryKey));
};

/**
 * Komponen untuk menampilkan satu item lemari
 */
interface WardrobeItemCardProps {
  item: WardrobeItem;
}
const WardrobeItemCard = ({ item }: WardrobeItemCardProps) => (
  // Link sekarang menunjuk ke halaman detail dinamis
  <Link
    href={`/wardrobe/${item.id}`} // <-- Tautan ke halaman detail
    className="flex items-center gap-4 p-4 bg-surface rounded-lg border border-border hover:border-primary hover:bg-primary-light/30 transition-colors group"
  >
    <div className="w-16 h-16 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
      <img
        src={item.imageUrl || "/placeholder.svg"}
        alt={item.name}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="flex-1 min-w-0">
      <p className="font-semibold text-foreground truncate">{item.name}</p>
      <div className="flex gap-2 mt-1">
        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
          {item.color}
        </span>
        <span className="text-xs px-2 py-1 bg-muted-light/20 text-muted rounded">
          {item.size} {/* <-- Menampilkan ukuran cm */}
        </span>
      </div>
    </div>

    <button
      className="p-2 rounded-lg hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
      onClick={(e) => {
        e.preventDefault();
        alert(`Favorit: ${item.name}`);
      }}
    >
      <Heart className="w-5 h-5 text-muted" />
    </button>
  </Link>
);

/**
 * Komponen untuk me-render satu bagian kategori
 */
interface CategorySectionProps {
  title: string;
  items: WardrobeItem[];
}
const CategorySection = ({ title, items }: CategorySectionProps) => {
  if (items.length === 0) return null;
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg text-foreground">{title}</h3>
      <div className="grid grid-cols-1 gap-3">
        {items.map((item) => (
          <WardrobeItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// --- 5. KOMPONEN UTAMA ---

export default function WardrobePage() {
  const [activeTab, setActiveTab] = useState<"permanent" | "draft">(
    "permanent"
  );
  const [showAddMenu, setShowAddMenu] = useState(false);

  const items = activeTab === "permanent" ? permanentItems : draftItems;

  return (
    <div className="w-full max-w-screen-sm mx-auto space-y-0">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4">
        {/* ... (Konten header tidak berubah) ... */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Lemari Digital</h1>
        </div>
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("permanent")}
            className={`pb-3 px-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "permanent"
                ? "text-primary border-primary"
                : "text-muted border-transparent hover:text-foreground"
            }`}
          >
            Lemari Saya ({permanentItems.length})
          </button>
          <button
            onClick={() => setActiveTab("draft")}
            className={`pb-3 px-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "draft"
                ? "text-primary border-primary"
                : "text-muted border-transparent hover:text-foreground"
            }`}
          >
            Draf ({draftItems.length})
          </button>
        </div>
      </div>

      {/* Content (Logika Render Diubah) */}
      <div className="px-4 py-6 pb-24 space-y-6">
        {/* ... (Logika render kategori tidak berubah) ... */}
        {categoriesDisplay.map((category) => {
          if (category.subCategories) {
            const hasItemsInSubCategories = category.subCategories.some(
              (sub) => getItemsForCategory(items, sub.key).length > 0
            );
            if (!hasItemsInSubCategories) return null;
            return (
              <div key={category.title} className="space-y-4">
                <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">
                  {category.title}
                </h2>
                <div className="space-y-6 pl-2">
                  {category.subCategories.map((sub) => (
                    <CategorySection
                      key={sub.key}
                      title={sub.title}
                      items={getItemsForCategory(items, sub.key)}
                    />
                  ))}
                </div>
              </div>
            );
          }
          if (category.key) {
            const categoryItems = getItemsForCategory(items, category.key);
            if (categoryItems.length === 0) return null;
            return (
              <div key={category.key} className="space-y-4">
                <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {categoryItems.map((item) => (
                    <WardrobeItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}

        {items.length === 0 && (
          <div className="text-center py-12 space-y-3">
            <p className="text-muted">
              Belum ada item di {activeTab === "permanent" ? "lemari" : "draf"}
            </p>
            <button
              className="text-primary font-medium hover:text-primary-dark"
              onClick={() => setShowAddMenu(true)}
            >
              Tambah item sekarang
            </button>
          </div>
        )}
      </div>

      {/* FAB Menu (Tombol Diperbarui) */}
      <div className="fixed bottom-24 right-4 z-40">
        {showAddMenu && (
          <div className="absolute bottom-20 right-0 bg-background rounded-2xl shadow-xl border border-border overflow-hidden animate-in slide-in-from-bottom-5">
            {/* Tautan ke Halaman Pindai Akurat */}
            <Link
              href="/wardrobe/scan/accurate"
              className="w-full px-4 py-3 flex items-center gap-3 text-foreground hover:bg-surface transition-colors border-b border-border text-sm font-medium"
            >
              <Camera className="w-5 h-5 text-primary" />
              Pindai Akurat
            </Link>
            {/* Tautan ke Halaman Pindai OOTD */}
            <Link
              href="/wardrobe/scan/fast"
              className="w-full px-4 py-3 flex items-center gap-3 text-foreground hover:bg-surface transition-colors text-sm font-medium"
            >
              <ImageIcon className="w-5 h-5 text-primary" />
              Pindai cepat
            </Link>
          </div>
        )}

        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition-all flex items-center justify-center"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

// Definisikan tipe ItemCategory di sini jika belum
type ItemCategory =
  | "top-inner-kaos"
  | "top-inner-kemeja"
  | "top-outer-jacket"
  | "bottom-long"
  | "bottom-short"
  | "head-accessory"
  | "hand-accessory"
  | "footwear"
  | "dress"
  | "draft-item";
