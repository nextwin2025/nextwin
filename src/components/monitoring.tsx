import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { ReactNode } from 'react'

export function MonitoringComponents(): ReactNode {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
} 