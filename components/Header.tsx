"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const menuItems = [
  { href: "/all-works", label: "作品總覽" },
  { href: "/designer", label: "設計師" },
  { href: "/online-exhibition", label: "線上展覽" },
  { href: "/book-tour", label: "預約導覽" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-16">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-gray-800">
              SCID 110
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex justify-center items-center h-full flex-1">
              <ul className="flex space-x-6 h-full">
                {menuItems.map((item) => (
                  <li key={item.href} className="h-full">
                    <Link
                      href={item.href}
                      className={`px-4 h-full flex items-center transition-colors duration-300 ${
                        pathname === item.href ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Book Tour Button */}
            <Link
              href="/buy-catalog"
              className={`hidden lg:flex items-center h-10 px-6 transition duration-300 rounded-2xl ${
                pathname === "/buy-catalog" 
                  ? "bg-gray-100 text-gray-900 font-semibold" 
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              購買專刊
            </Link>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              <span className="text-gray-600 text-sm">
                {pathname === "/buy-catalog" ? "購買專刊" : menuItems.find(item => item.href === pathname)?.label || "首頁"}
              </span>
              <motion.button
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                onClick={toggleMenu}
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-x-4 top-20 bg-white rounded-3xl shadow-lg z-50"
            >
              <nav className="p-4">
                <ul className="flex flex-col space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="block hover:bg-gray-50 px-6 py-4 text-center transition-colors duration-300 rounded-2xl"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: menuItems.length * 0.05 }}
                  >
                    <Link
                      href="/buy-catalog"
                      className="block bg-black text-white px-6 py-3 text-center hover:bg-gray-800 transition-colors duration-300 rounded-2xl"
                      onClick={closeMenu}
                    >
                      購買專刊
                    </Link>
                  </motion.li>
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

