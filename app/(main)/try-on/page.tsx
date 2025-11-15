'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'
import Link from 'next/link'

export default function VirtualTryOnPage() {
  const [currentPose, setCurrentPose] = useState(0)
  const [selectedItem, setSelectedItem] = useState('top')

  const poses = ['Front', 'Side', '3/4 View']
  const wardrobe = [
    { id: 1, name: 'T-Shirt Putih', category: 'top' },
    { id: 2, name: 'Blouse Biru', category: 'top' },
    { id: 3, name: 'Jeans Navy', category: 'bottom' },
    { id: 4, name: 'Dress Merah', category: 'dress' },
    { id: 5, name: 'Jacket Hitam', category: 'outer' },
  ]

  return (
    <div className="w-full max-w-screen-sm mx-auto space-y-0">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4 flex items-center justify-between">
        <Link href="/" className="p-2 hover:bg-surface rounded-lg transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-lg font-bold text-foreground">Virtual Try-On</h1>
        <div className="w-10"></div>
      </div>

      {/* Manekin Display Area */}
      <div className="bg-linear-to-b from-surface to-background px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        {/* Manekin 2D Placeholder */}
        <div className="relative w-full max-w-xs">
          {/* Body */}
          <div className="bg-white rounded-3xl aspect-3/4 flex flex-col items-center justify-center overflow-hidden border-4 border-primary shadow-lg">
            {/* Head */}
            <div className="w-12 h-12 rounded-full bg-yellow-200 mb-2 border-2 border-yellow-300 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gray-800 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-gray-800"></div>
            </div>

            {/* Outfit Display */}
            <div className="flex-1 flex items-center justify-center w-full">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">👕</div>
                <p className="text-xs text-muted">Tap item untuk coba</p>
              </div>
            </div>

            {/* Legs */}
            <div className="flex gap-2 pb-4">
              <div className="w-4 h-12 bg-skin-light rounded-sm"></div>
              <div className="w-4 h-12 bg-skin-light rounded-sm"></div>
            </div>
          </div>

          {/* Pose Navigation */}
          <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
            <button
              onClick={() => setCurrentPose((p) => (p - 1 + poses.length) % poses.length)}
              className="pointer-events-auto p-2 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPose((p) => (p + 1) % poses.length)}
              className="pointer-events-auto p-2 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pose Info */}
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-foreground">{poses[currentPose]}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 py-4 border-t border-border space-y-4 pb-24">
        {/* Pose Selector */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground text-sm">Pose Manekin</h3>
          <div className="grid grid-cols-3 gap-2">
            {poses.map((pose, i) => (
              <button
                key={pose}
                onClick={() => setCurrentPose(i)}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  currentPose === i
                    ? 'bg-primary text-white border-primary'
                    : 'bg-background border-border text-foreground hover:border-primary'
                }`}
              >
                {pose}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
