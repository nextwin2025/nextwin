import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as Dialog from "@radix-ui/react-dialog"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Competitions", href: "/competitions" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Wallet", href: "/wallet" },
  { name: "Profile", href: "/profile" },
  { name: "FAQ", href: "/faq" },
]

export function MobileMenu() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-yellow-500 hover:bg-gray-800 focus:outline-none">
          <Menu className="h-6 w-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-y-0 right-0 w-full max-w-xs bg-gray-900 shadow-lg">
          <div className="flex items-center justify-between p-4 border-b border-yellow-500/20">
            <Link
              href="/"
              className="text-2xl font-bold text-yellow-500"
              onClick={() => setIsOpen(false)}
            >
              NextWin
            </Link>
            <Dialog.Close asChild>
              <button className="rounded-md text-gray-400 hover:text-yellow-500 focus:outline-none">
                <X className="h-6 w-6" />
              </button>
            </Dialog.Close>
          </div>
          <div className="p-4">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-lg text-base font-medium",
                    pathname === item.href
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-500"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-yellow-500/20">
              <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg">
                Sign In
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
} 