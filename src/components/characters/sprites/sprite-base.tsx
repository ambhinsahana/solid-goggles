import React from 'react'

export interface BaseSpriteProps {
  size?: number
  className?: string
  animated?: boolean
}

export function PixelSvg({
  size = 128,
  className = '',
  viewBox = '0 0 32 32',
  children,
}: {
  size?: number
  className?: string
  viewBox?: string
  children: React.ReactNode
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={`inline-block select-none overflow-visible ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {children}
    </svg>
  )
}
