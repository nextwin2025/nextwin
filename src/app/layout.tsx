import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/nav"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NextWin - Sports Predictions & Competitions",
  description: "The ultimate platform for sports predictions and competitions. Predict, compete, and win!",
  keywords: ["sports predictions", "fantasy sports", "competitions", "prizes"],
  authors: [{ name: "NextWin Team" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  )
} 