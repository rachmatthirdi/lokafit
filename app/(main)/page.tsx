"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Search,
  X,
  Cloud,
  Droplets,
  Wind,
  Calendar,
  Users,
  MessageSquare,
  Filter,
  Bookmark, // <-- Ditambahkan
  Camera, // <-- Ditambahkan (untuk Virtual Try-On)
} from "lucide-react";

// --- Definisi Tipe ---

const days = ["Monday", "Tuesday", "Wednesday", "Thursday"] as const;
type Day = (typeof days)[number];

interface WeatherData {
  day: string;
  condition: string;
  temp: string;
  humidity: string;
  wind: string;
}

interface DailyRecommendation {
  image: string;
  title: string;
  suitability: string;
  weather: WeatherData;
}

// 1. Tipe FeedItem diperbarui
interface FeedItem {
  id: number;
  image: string;
  likes: number;
  title: string; // "Judul"
  user: string; // "Username"
  suitableFor: string; // "warm tone"
  spillItems: string[]; // ["spill spill baju", "spill spill celana"]
}

// --- Data Dummy (Sekarang dengan Tipe) ---

const dailyRecommendationsData: Record<Day, DailyRecommendation> = {
  Monday: {
    image: "/rekomndasi-harian/senin.webp",
    title: "Rekomendasi Senin: Cuaca Cerah",
    suitability: "Casual Hangout",
    weather: {
      day: "Senin",
      condition: "Cerah",
      temp: "28°C",
      humidity: "65%",
      wind: "10 km/h",
    },
  },
  Tuesday: {
    image: "/rekomndasi-harian/selasa.webp",
    title: "Rekomendasi Selasa: Mendung",
    suitability: "Work From Cafe",
    weather: {
      day: "Selasa",
      condition: "Mendung",
      temp: "26°C",
      humidity: "70%",
      wind: "8 km/h",
    },
  },
  Wednesday: {
    image: "/rekomndasi-harian/rabu.webp",
    title: "Rekomendasi Rabu: Hujan Ringan",
    suitability: "Indoor Meeting",
    weather: {
      day: "Rabu",
      condition: "Hujan Ringan",
      temp: "24°C",
      humidity: "80%",
      wind: "12 km/h",
    },
  },
  Thursday: {
    image: "/rekomndasi-harian/kamis.webp",
    title: "Rekomendasi Kamis: Berangin",
    suitability: "Outdoor Activity",
    weather: {
      day: "Kamis",
      condition: "Berangin",
      temp: "27°C",
      humidity: "60%",
      wind: "20 km/h",
    },
  },
};

// 2. Data feedItems diperbarui agar sesuai dengan modal baru
const feedItems: FeedItem[] = [
  {
    id: 1,
    image: "/fashion-outfit-1.png",
    likes: 234,
    title: "Casual Daily",
    user: "StyleByMe",
    suitableFor: "warm tone",
    spillItems: ["spill spill baju", "spill spill celana"],
  },
  {
    id: 2,
    image: "/fashion-outfit-2.png",
    likes: 456,
    title: "Monochrome Look",
    user: "OOTD_Indo",
    suitableFor: "cool tone",
    spillItems: ["spill spill atasan", "spill spill rok"],
  },
  {
    id: 3,
    image: "/fashion-outfit-3.png",
    likes: 123,
    title: "Campus Outfit",
    user: "DailyWear",
    suitableFor: "all tones",
    spillItems: ["spill spill kemeja", "spill spill tas"],
  },
  {
    id: 4,
    image: "/fashion-outfit-4.png",
    likes: 789,
    title: "Coffee Shop Vibes",
    user: "HangoutStyle",
    suitableFor: "warm tone",
    spillItems: ["spill spill outer", "spill spill sepatu"],
  },
];

// --- Komponen ---

/**
 * 1. Komponen Header
 */
const AppHeader = () => (
  <div className="sticky top-0 z-40 bg-background border-b border-border">
    <div className="px-4 py-2 space-y-4">
      <div className="flex items-center justify-between">
        <div className="w-20 h-auto bg-transparent flex items-center justify-center">
          <img src="/logo/logo.png" alt="LokaFit Logo" />
        </div>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
          WY
        </div>
      </div>
    </div>
  </div>
);

/**
 * 2. Komponen Rekomendasi Harian
 */
interface DailyOutfitSectionProps {
  days: readonly Day[];
  onDaySelect: (day: Day) => void;
}

const DailyOutfitSection = ({ days, onDaySelect }: DailyOutfitSectionProps) => (
  <div className="space-y-3">
    <h2 className="text-xl font-bold text-foreground">
      Daily Outfit Recommendation
    </h2>
    <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
      {days.map((day) => {
        const recommendation = dailyRecommendationsData[day];
        return (
          <div
            key={day}
            onClick={() => onDaySelect(day)}
            className="group cursor-pointer space-y-2 shrink-0 w-32"
          >
            <h3 className="font-semibold text-foreground text-center text-sm">
              {day}
            </h3>
            <div className="relative bg-surface rounded-2xl overflow-hidden aspect-3/4 border border-border group-hover:border-primary transition-colors">
              <img
                src={recommendation.image || "/placeholder.svg"}
                alt={`Rekomendasi ${day}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

/**
 * 3. Komponen Galeri Outfit (Diubah)
 */
interface OutfitGalleryProps {
  items: FeedItem[];
  // 3. Tambahkan handler onClick
  onItemClick: (item: FeedItem) => void;
}

const OutfitGallery = ({ items, onItemClick }: OutfitGalleryProps) => (
  <div className="space-y-3">
    <div className="flex items-center">
      <h3 className="text-xl font-bold text-foreground ">Outfit Gallery</h3>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-5 text-muted" />
        <input
          type="text"
          placeholder="cari inspirasi..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 overflow-x-auto">
      {items.map((item) => (
        // 4. Ubah <Link> menjadi <div>/ <button> dengan onClick
        <div
          key={item.id}
          onClick={() => onItemClick(item)} // <-- Panggil handler
          className="group cursor-pointer space-y-2"
        >
          <div className="relative bg-surface rounded-lg overflow-hidden aspect-square">
            <img
              src={item.image || "/placeholder.svg"}
              alt={`Inspirasi ${item.id}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
          <p className="text-xs text-muted">{item.likes} likes</p>
        </div>
      ))}
    </div>
  </div>
);

/**
 * 4. Komponen Modal Detail Rekomendasi (Versi Lengkap & Dinamis)
 */
interface RecommendationDetailModalProps {
  show: boolean;
  onClose: () => void;
  recommendation: DailyRecommendation;
}

const RecommendationDetailModal = ({
  show,
  onClose,
  recommendation,
}: RecommendationDetailModalProps) => {
  if (!show) return null; // Cukup periksa 'show'

  // Ambil semua data dinamis dari props
  const { weather, title, suitability } = recommendation;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end animate-in fade-in">
      <div className="w-full bg-background rounded-t-3xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10">
        {/* Header Modal */}
        <div className="sticky top-0 z-50 bg-background border-b border-border px-4 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            Detail Rekomendasi
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Konten Modal */}
        <div className="p-4 space-y-6">
          {/* Bagian Judul & Kesesuaian (DINAMIS) */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-foreground">
              {title} {/* <-- DINAMIS */}
            </h3>
            <p className="text-sm text-muted-light">
              Suitable For: {suitability} {/* <-- DINAMIS */}
            </p>
          </div>

          {/* Bagian Sinkronisasi (Statis - Fitur) */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5" />
              Sinkronisasi dengan Pasangan
            </h3>
            <button className="w-full py-2.5 border border-border rounded-lg font-medium text-foreground hover:bg-surface transition-colors">
              Hubungkan dengan Pasangan
            </button>
          </div>

          {/* Bagian Minta OOTD (Statis - Fitur) */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Minta OOTD Spesifik
            </h3>
            <div className="flex gap-2">
              <input
                type="date"
                className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Acara/Konteks"
                className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="w-full py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">
              Minta Rekomendasi
            </button>
          </div>

          {/* Bagian Preferensi (Statis - Fitur) */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">
              Preferensi Konteks
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {["Formal", "Casual", "Sport"].map((context) => (
                <button
                  key={context}
                  className="py-2 rounded-lg border border-border bg-surface text-sm font-medium text-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors"
                >
                  {context}
                </button>
              ))}
            </div>
          </div>

          {/* Bagian Cuaca (DINAMIS) */}
          <div className="space-y-4 p-4 bg-surface rounded-xl border border-border">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              {/* DIUBAH: Menggunakan data dari props */}
              <strong>Ramalan Cuaca {weather.day}</strong>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center space-y-1">
                <Cloud className="w-6 h-6 mx-auto text-muted" />
                {/* DIUBAH: Menggunakan data dari props */}
                <p className="text-sm font-medium">{weather.condition}</p>
                <p className="text-xs text-muted">{weather.temp}</p>
              </div>
              <div className="text-center space-y-1">
                <Droplets className="w-6 h-6 mx-auto text-muted" />
                <p className="text-sm font-medium">Kelembaban</p>
                {/* DIUBAH: Menggunakan data dari props */}
                <p className="text-xs text-muted">{weather.humidity}</p>
              </div>
              <div className="text-center space-y-1">
                <Wind className="w-6 h-6 mx-auto text-muted" />
                <p className="text-sm font-medium">Angin</p>
                {/* DIUBAH: Menggunakan data dari props */}
                <p className="text-xs text-muted">{weather.wind}</p>
              </div>
            </div>

            {/* Bagian Rekomendasi Pasangan (Statis - Fitur) */}
            <div className="border-t border-border pt-4 mt-4">
              <p className="text-xs text-muted mb-3">
                Hubungkan dengan pasangan untuk melihat rekomendasi berdampingan
              </p>
              <button className="w-full py-2 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-surface transition-colors">
                Lihat Rekomendasi Pasangan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 5. Komponen Modal Detail Foto (BARU)
 */
interface PhotoDetailModalProps {
  show: boolean;
  onClose: () => void;
  photo: FeedItem | null; // Menerima foto yang dipilih
}

const PhotoDetailModal = ({ show, onClose, photo }: PhotoDetailModalProps) => {
  if (!show || !photo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end animate-in fade-in">
      <div className="w-full bg-background rounded-t-3xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10">
        {/* Header Modal */}
        <div className="sticky top-0 z-50 bg-background px-4 py-4 flex items-center justify-between border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Photo Detail</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Konten Modal Sesuai Desain Baru */}
        <div className="space-y-4">
          {/* Gambar Utama */}
          <div className="relative w-full aspect-4/5 bg-surface">
            <img
              src={photo.image}
              alt={photo.title}
              className="w-full h-full object-cover"
            />
            {/* Tombol Aksi di atas gambar */}
            <div className="absolute top-4 right-4 flex flex-col gap-3">
              {/* TOMBOL VIRTUAL TRY-ON (BARU) */}
              <Link
                href={`/try-on?item=${photo.id}`}
                className="p-3 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors"
              >
                <Camera className="w-5 h-5 text-primary" />
              </Link>
              {/* Tombol Like */}
              <button className="p-3 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors">
                <Heart className="w-5 h-5 text-heart" />
              </button>
              {/* Tombol Bookmark */}
              <button className="p-3 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors">
                <Bookmark className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          {/* Detail Konten */}
          <div className="p-4 space-y-4">
            {/* Judul & Info */}
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-foreground">
                {photo.title}
              </h3>
              <div className="shrink-0 text-right">
                <p className="text-xs text-muted">Suitable For</p>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  {photo.suitableFor}
                </span>
              </div>
            </div>

            {/* Info User */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-sm font-medium">
                {photo.user.substring(0, 2)}
              </div>
              <span className="font-medium text-foreground">{photo.user}</span>
            </div>

            {/* "What's in here?" */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">What's in here?</h4>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {photo.spillItems.map((item) => (
                  <button
                    key={item}
                    className="px-4 py-2 rounded-lg bg-surface border border-border text-sm font-medium text-foreground whitespace-nowrap hover:border-primary"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Rekomendasi (Placeholder) */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Recommendation</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square rounded-lg bg-surface border border-border"></div>
                <div className="aspect-square rounded-lg bg-surface border border-border"></div>
                <div className="aspect-square rounded-lg bg-surface border border-border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Komponen Utama Halaman ---

export default function HomePage() {
  const [selectedDay, setSelectedDay] = useState<Day>("Monday");
  const [showRecDetailModal, setShowRecDetailModal] = useState(false);

  // 6. State untuk modal foto baru
  const [selectedPhoto, setSelectedPhoto] = useState<FeedItem | null>(null);

  const handleDaySelect = (day: Day) => {
    setSelectedDay(day);
    setShowRecDetailModal(true);
  };

  // 7. Handler untuk membuka modal foto
  const handlePhotoClick = (item: FeedItem) => {
    setSelectedPhoto(item);
  };

  // 8. Handler untuk menutup kedua modal
  const handleCloseModals = () => {
    setShowRecDetailModal(false);
    setSelectedPhoto(null); // Menutup modal foto dengan mengatur data kembali ke null
  };

  return (
    <div className="w-full max-w-screen-sm mx-auto space-y-0">
      <AppHeader />

      <div className="px-4 py-6 space-y-8">
        <DailyOutfitSection days={days} onDaySelect={handleDaySelect} />
        {/* 9. Kirim handler baru ke OutfitGallery */}
        <OutfitGallery items={feedItems} onItemClick={handlePhotoClick} />
      </div>

      {/* Modal Detail Rekomendasi (Lama) */}
      <RecommendationDetailModal
        show={showRecDetailModal}
        onClose={handleCloseModals}
        recommendation={dailyRecommendationsData[selectedDay]}
      />

      {/* 10. Render Modal Detail Foto (BARU) */}
      <PhotoDetailModal
        show={!!selectedPhoto} // Modal ditampilkan jika selectedPhoto tidak null
        onClose={handleCloseModals}
        photo={selectedPhoto}
      />
    </div>
  );
}
