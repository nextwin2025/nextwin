import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MobileMenu } from "./mobile-menu"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Competitions", href: "/competitions" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Wallet", href: "/wallet" },
  { name: "Profile", href: "/profile" },
  { name: "FAQ", href: "/faq" },
]

const footerLinks = [
  { name: "Terms", href: "/terms" },
  { name: "Privacy", href: "/privacy" },
  { name: "Support", href: "/support" },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-900 border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-yellow-500">
                NextWin
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium",
                    pathname === item.href
                      ? "text-yellow-500 border-b-2 border-yellow-500"
                      : "text-gray-400 hover:text-yellow-500 hover:border-b-2 hover:border-yellow-500/50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:block">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg">
                Sign In
              </button>
            </div>
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-yellow-500/20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">NextWin</h3>
            <p className="text-gray-400">
              The ultimate platform for sports predictions and competitions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-yellow-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-yellow-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-yellow-500/20">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} NextWin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 