'use client'

import React from 'react'

interface Measurement {
  height: number
  weight: number
  shoulderWidth?: number
  waistCircumference?: number
  hipCircumference?: number
}

interface VirtualTryOnProps {
  measurements: Measurement
  hairColor?: string
  pose?: 'front' | 'side' | '3/4'
}

export function VirtualTryOn({ measurements, hairColor = 'black', pose = 'front' }: VirtualTryOnProps) {
  // Calculate body proportions based on measurements
  const bmi = measurements.weight / ((measurements.height / 100) ** 2)
  const bodyScale = Math.sqrt(bmi / 22) // Normalize to BMI 22

  return (
    <div className="flex items-center justify-center w-full">
      <svg
        viewBox="0 0 200 400"
        className="w-full max-w-xs"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Head */}
        <circle cx="100" cy="40" r="25" fill="#fdbcb4" />

        {/* Hair */}
        <path
          d="M 75 25 Q 100 10 125 25"
          fill={getHairColor(hairColor)}
          stroke="none"
        />

        {/* Eyes */}
        <circle cx="95" cy="35" r="3" fill="#000" />
        <circle cx="105" cy="35" r="3" fill="#000" />

        {/* Body */}
        <rect
          x={80 - bodyScale * 10}
          y="70"
          width={bodyScale * 20}
          height="60"
          fill="#e8c4b4"
          rx="8"
        />

        {/* Arms (simplified) */}
        <rect x="50" y="75" width="30" height="12" fill="#fdbcb4" rx="6" />
        <rect x="120" y="75" width="30" height="12" fill="#fdbcb4" rx="6" />

        {/* Legs */}
        <rect x="85" y="140" width="12" height="80" fill="#fdbcb4" />
        <rect x="103" y="140" width="12" height="80" fill="#fdbcb4" />

        {/* Feet */}
        <rect x="80" y="220" width="22" height="10" fill="#333" rx="3" />
        <rect x="98" y="220" width="22" height="10" fill="#333" rx="3" />
      </svg>
    </div>
  )
}

function getHairColor(color: string): string {
  const colors: Record<string, string> = {
    black: '#1a1a1a',
    brown: '#6b4423',
    blonde: '#f4d03f',
    red: '#c41e3a',
  }
  return colors[color] || colors.black
}
