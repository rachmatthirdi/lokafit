'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, LogOut, Palette, Heart } from 'lucide-react'

export default function ProfilePage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const profileData = {
    name: 'Wyena',
    email: 'wyena@email.com',
    age: 25,
    gender: 'Wanita',
    phone: '08xxxxxxxxxx',
    height: 170,
    weight: 55,
    skinTone: 'Warm',
    hairColor: 'Hitam',
  }

  return (
    <div className="w-full max-w-screen-sm mx-auto space-y-0">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4">
        <h1 className="text-2xl font-bold text-foreground">Profil Saya</h1>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-24 space-y-4">
        {/* Profile Card */}
        <div className="bg-linear-to-br from-primary-light to-surface rounded-xl p-6 border border-primary space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
              {profileData.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-foreground">{profileData.name}</p>
              <p className="text-sm text-muted">{profileData.email}</p>
              <p className="text-xs text-primary font-medium mt-1">Skin Tone: {profileData.skinTone}</p>
            </div>
          </div>
        </div>

        {/* Data Diri Section */}
        <div className="space-y-2">
          <button
            onClick={() => setExpandedSection(expandedSection === 'diri' ? null : 'diri')}
            className="w-full flex items-center justify-between p-4 bg-surface rounded-lg border border-border hover:border-primary transition-colors"
          >
            <span className="font-semibold text-foreground">Edit Data Diri</span>
            <ChevronRight className={`w-5 h-5 text-muted transition-transform ${expandedSection === 'diri' ? 'rotate-90' : ''}`} />
          </button>

          {expandedSection === 'diri' && (
            <div className="bg-surface rounded-lg border border-border p-4 space-y-3 animate-in slide-in-from-top-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted">Nama</label>
                  <p className="text-sm font-medium text-foreground">{profileData.name}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted">Umur</label>
                  <p className="text-sm font-medium text-foreground">{profileData.age} tahun</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted">Email</label>
                  <p className="text-sm font-medium text-foreground">{profileData.email}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted">No. Telpon</label>
                  <p className="text-sm font-medium text-foreground">{profileData.phone}</p>
                </div>
              </div>
              <button className="w-full py-2 text-primary font-medium hover:bg-primary-light transition-colors rounded-lg">
                Edit Data
              </button>
            </div>
          )}
        </div>

        {/* Data Tubuh Section */}
        <div className="space-y-2">
          <button
            onClick={() => setExpandedSection(expandedSection === 'tubuh' ? null : 'tubuh')}
            className="w-full flex items-center justify-between p-4 bg-surface rounded-lg border border-border hover:border-primary transition-colors"
          >
            <span className="font-semibold text-foreground">Edit Data Tubuh</span>
            <ChevronRight className={`w-5 h-5 text-muted transition-transform ${expandedSection === 'tubuh' ? 'rotate-90' : ''}`} />
          </button>

          {expandedSection === 'tubuh' && (
            <div className="bg-surface rounded-lg border border-border p-4 space-y-3 animate-in slide-in-from-top-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted">Tinggi</label>
                  <p className="text-sm font-medium text-foreground">{profileData.height} cm</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted">Berat Badan</label>
                  <p className="text-sm font-medium text-foreground">{profileData.weight} kg</p>
                </div>
              </div>
              <div className="text-sm text-muted">
                Data tubuh digunakan untuk menghitung proporsi dan rekomendasi ukuran yang akurat.
              </div>
              <button className="w-full py-2 text-primary font-medium hover:bg-primary-light transition-colors rounded-lg">
                Edit Data
              </button>
            </div>
          )}
        </div>

        {/* Skin Tone Section */}
        <div className="space-y-2">
          <button
            onClick={() => setExpandedSection(expandedSection === 'skin' ? null : 'skin')}
            className="w-full flex items-center justify-between p-4 bg-surface rounded-lg border border-border hover:border-primary transition-colors"
          >
            <span className="font-semibold text-foreground">Pengaturan Skin Tone</span>
            <ChevronRight className={`w-5 h-5 text-muted transition-transform ${expandedSection === 'skin' ? 'rotate-90' : ''}`} />
          </button>

          {expandedSection === 'skin' && (
            <div className="bg-surface rounded-lg border border-border p-4 space-y-3 animate-in slide-in-from-top-2">
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Skin Tone Saat Ini</p>
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                  <div className="w-8 h-8 rounded-full bg-yellow-600"></div>
                  <p className="text-sm font-medium text-foreground">{profileData.skinTone} - Undertone Hangat</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Palet Warna Rekomendasi</p>
                <div className="grid grid-cols-5 gap-2">
                  {['#FF6B6B', '#FF8C42', '#FFD93D', '#6BCB77', '#4D96FF'].map((color) => (
                    <div
                      key={color}
                      className="aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <button className="w-full py-2 border border-primary text-primary font-medium hover:bg-primary-light transition-colors rounded-lg">
                Pindai Ulang Skin Tone
              </button>
            </div>
          )}
        </div>

        {/* VTO Customization Section */}
        <div className="space-y-2">
          <button
            onClick={() => setExpandedSection(expandedSection === 'vto' ? null : 'vto')}
            className="w-full flex items-center justify-between p-4 bg-surface rounded-lg border border-border hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Kustomisasi VTO</span>
            </div>
            <ChevronRight className={`w-5 h-5 text-muted transition-transform ${expandedSection === 'vto' ? 'rotate-90' : ''}`} />
          </button>

          {expandedSection === 'vto' && (
            <div className="bg-surface rounded-lg border border-border p-4 space-y-3 animate-in slide-in-from-top-2">
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Warna Rambut</p>
                <select className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Hitam</option>
                  <option>Coklat</option>
                  <option>Pirang</option>
                  <option>Merah</option>
                </select>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Pose Manekin</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Standing', 'Sitting', 'Side View', 'Front View'].map((pose) => (
                    <button
                      key={pose}
                      className="py-2 px-3 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors"
                    >
                      {pose}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="space-y-2">
          <button
            onClick={() => setExpandedSection(expandedSection === 'account' ? null : 'account')}
            className="w-full flex items-center justify-between p-4 bg-surface rounded-lg border border-border hover:border-primary transition-colors"
          >
            <span className="font-semibold text-foreground">Pengaturan Akun</span>
            <ChevronRight className={`w-5 h-5 text-muted transition-transform ${expandedSection === 'account' ? 'rotate-90' : ''}`} />
          </button>

          {expandedSection === 'account' && (
            <div className="bg-surface rounded-lg border border-border p-4 space-y-2 animate-in slide-in-from-top-2">
              <button className="w-full text-left px-3 py-2 text-foreground hover:bg-background rounded-lg transition-colors text-sm font-medium">
                Notifikasi
              </button>
              <button className="w-full text-left px-3 py-2 text-foreground hover:bg-background rounded-lg transition-colors text-sm font-medium">
                Privasi
              </button>
              <button className="w-full text-left px-3 py-2 text-foreground hover:bg-background rounded-lg transition-colors text-sm font-medium">
                Bantuan & Dukungan
              </button>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-error text-white font-semibold hover:opacity-90 transition-opacity mt-6">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  )
}
