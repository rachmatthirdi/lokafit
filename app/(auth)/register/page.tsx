'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type RegisterStep = 1 | 2 | 3 | 4

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<RegisterStep>(1)
  const [expandOptional, setExpandOptional] = useState(false)
  const [expandSkinTone, setExpandSkinTone] = useState(false)

  const [formData, setFormData] = useState({
    // Step 1
    nama: '',
    umur: '',
    jenisKelamin: '',
    email: '',
    noTelpon: '',
    sandi: '',
    // Step 2
    tinggi: '',
    beratBadan: '',
    // Step 3 (Optional)
    lebarBahu: '',
    lingkarPinggang: '',
    lingkarPinggul: '',
    warnaRambut: '',
    // Step 4 (Optional)
    skinTone: '',
  })

  const handleStep1Submit = () => {
    if (formData.nama && formData.umur && formData.jenisKelamin && formData.email && formData.noTelpon && formData.sandi) {
      setStep(2)
    }
  }

  const handleStep2Submit = () => {
    if (formData.tinggi && formData.beratBadan) {
      setStep(3)
    }
  }

  const handleStep3Submit = () => {
    setStep(4)
  }

  const handleFinalSubmit = () => {
    // TODO: Connect to backend registration
    router.push('/login')
  }

  return (
    <div className="w-full max-w-sm space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-foreground">Daftar Akun</h1>
        <p className="text-sm text-muted">Langkah {step} dari 4</p>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`flex-1 h-1 rounded-full transition-colors ${
              s <= step ? 'bg-primary' : 'bg-border'
            }`}
          />
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nama Lengkap</label>
            <input
              type="text"
              placeholder="Nama Anda"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Umur</label>
              <input
                type="number"
                placeholder="25"
                value={formData.umur}
                onChange={(e) => setFormData({ ...formData, umur: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Jenis Kelamin</label>
              <select
                value={formData.jenisKelamin}
                onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Pilih</option>
                <option value="male">Pria</option>
                <option value="female">Wanita</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">No. Telpon</label>
            <input
              type="tel"
              placeholder="08xxxxxxxxxx"
              value={formData.noTelpon}
              onChange={(e) => setFormData({ ...formData, noTelpon: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sandi</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.sandi}
              onChange={(e) => setFormData({ ...formData, sandi: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={handleStep1Submit}
            className="w-full py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
          >
            Lanjut <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Body Measurements */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tinggi (cm)</label>
            <input
              type="number"
              placeholder="170"
              value={formData.tinggi}
              onChange={(e) => setFormData({ ...formData, tinggi: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Berat Badan (kg)</label>
            <input
              type="number"
              placeholder="70"
              value={formData.beratBadan}
              onChange={(e) => setFormData({ ...formData, beratBadan: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="text-sm text-muted">
            Data ini diperlukan untuk rekomendasi OOTD yang akurat.
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-2.5 border border-border rounded-lg font-medium text-foreground hover:bg-surface transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Kembali
            </button>
            <button
              onClick={handleStep2Submit}
              className="flex-1 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              Lanjut <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Optional Details */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="p-3 bg-primary-light rounded-lg text-sm text-primary-dark">
            Langkah ini opsional. Anda dapat menambahkan data nanti di halaman Profil.
          </div>

          {!expandOptional ? (
            <button
              onClick={() => setExpandOptional(true)}
              className="w-full py-2.5 border border-border rounded-lg font-medium text-foreground hover:bg-surface transition-colors"
            >
              Input Detail (Opsional)
            </button>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Lebar Bahu (cm)</label>
                <input
                  type="number"
                  placeholder="40"
                  value={formData.lebarBahu}
                  onChange={(e) => setFormData({ ...formData, lebarBahu: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Lingkar Pinggang (cm)</label>
                <input
                  type="number"
                  placeholder="80"
                  value={formData.lingkarPinggang}
                  onChange={(e) => setFormData({ ...formData, lingkarPinggang: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Lingkar Pinggul (cm)</label>
                <input
                  type="number"
                  placeholder="90"
                  value={formData.lingkarPinggul}
                  onChange={(e) => setFormData({ ...formData, lingkarPinggul: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Warna Rambut</label>
                <select
                  value={formData.warnaRambut}
                  onChange={(e) => setFormData({ ...formData, warnaRambut: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Pilih</option>
                  <option value="black">Hitam</option>
                  <option value="brown">Coklat</option>
                  <option value="blonde">Pirang</option>
                  <option value="red">Merah</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
            </>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-2.5 border border-border rounded-lg font-medium text-foreground hover:bg-surface transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Kembali
            </button>
            <button
              onClick={handleStep3Submit}
              className="flex-1 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              Lanjut <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Skin Tone (Optional) */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="p-3 bg-primary-light rounded-lg text-sm text-primary-dark">
            Mendeteksi skin tone membantu rekomendasi warna yang lebih akurat.
          </div>

          {!expandSkinTone ? (
            <button
              onClick={() => setExpandSkinTone(true)}
              className="w-full py-2.5 border border-border rounded-lg font-medium text-foreground hover:bg-surface transition-colors"
            >
              Cek Skin Tone (Opsional)
            </button>
          ) : (
            <>
              <div className="flex gap-3">
                <button className="flex-1 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">
                  Pindai Sekarang
                </button>
                <button className="flex-1 py-2.5 border border-border rounded-lg font-medium text-foreground hover:bg-surface transition-colors">
                  Pilih Manual
                </button>
              </div>
            </>
          )}

          <div className="text-sm text-muted">
            Data dapat diubah/ditambahkan nanti di halaman Profil.
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-2.5 border border-border rounded-lg font-medium text-foreground hover:bg-surface transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Kembali
            </button>
            <button
              onClick={handleFinalSubmit}
              className="flex-1 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Selesai
            </button>
          </div>
        </div>
      )}

      {/* Login Link */}
      <div className="text-center text-sm text-muted">
        Sudah punya akun?{' '}
        <Link href="/login" className="text-primary hover:text-primary-dark font-medium">
          Login
        </Link>
      </div>
    </div>
  )
}
