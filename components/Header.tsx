"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const exhibitionAreas = [
  {
    id: "shih-chien",
    name: "實踐展區",
    gradient: "from-rose-400 via-fuchsia-500 to-indigo-500",
  },
  {
    id: "milan",
    name: "米蘭展區",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
  },
  {
    id: "young-designers",
    name: "新一代展區",
    gradient: "from-amber-400 via-orange-500 to-pink-600",
  },
]

const menuItems = [
  { href: "/all-works", label: "作品總覽" },
  { href: "/designer", label: "設計師" },
  { 
    href: "#", 
    label: "展覽資訊",
    children: exhibitionAreas.map(area => ({
      href: `/online-exhibition/${area.id}`,
      label: area.name,
      gradient: area.gradient
    }))
  },
  { href: "/book-tour", label: "預約導覽" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [showExhibitionSubmenu, setShowExhibitionSubmenu] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setShowExhibitionSubmenu(false)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setShowExhibitionSubmenu(false)
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
        <div className="h-full max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between h-full px-4">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-gray-800 w-[120px] pl-2" onClick={closeMenu}>
              <Image
                src="/logo/logo.png"
                alt="SENSE Logo"
                width={80}
                height={32}
                className="object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <nav className="flex items-center h-full">
                <ul className="flex space-x-3 h-full">
                  {menuItems.map((item) => (
                    <li key={item.href} className="h-full relative group">
                      {item.children ? (
                        <div
                          className="pl-4 pr-2 h-full flex items-center gap-1 cursor-pointer group"
                          onMouseEnter={() => setActiveDropdown(item.href)}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <span className={`transition-colors duration-300 ${
                            pathname.includes('/online-exhibition') ? "text-gray-900 font-semibold" : "text-gray-500 group-hover:text-gray-700"
                          }`}>{item.label}</span>
                          <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                          
                          {/* Dropdown Menu */}
                          <AnimatePresence>
                            {activeDropdown === item.href && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-0 w-36 py-3 bg-white shadow-xl rounded-2xl overflow-hidden"
                              >
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={`block mx-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-300 rounded-xl ${
                                      pathname === child.href ? "bg-gray-50 font-semibold" : ""
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      {child.label}
                                      {child.label === "實踐展區" && (
                                        <span className="ml-2 px-1.5 py-0.3 text-[10px] font-bold bg-blue-100 text-blue-600 rounded-lg">
                                          3D
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`px-4 h-full flex items-center transition-colors duration-300 ${
                            pathname === item.href ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Book Tour Button */}
              <Link
                href="/buy-catalog"
                className={`flex items-center h-10 px-6 transition duration-300 rounded-2xl ${
                  pathname === "/buy-catalog" 
                    ? "bg-gray-100 text-gray-900 font-semibold" 
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                購買專刊
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              <span className="text-gray-600 text-sm">
                {pathname === "/buy-catalog" 
                  ? "購買專刊" 
                  : pathname.startsWith('/online-exhibition/') 
                    ? exhibitionAreas.find(area => pathname.includes(area.id))?.name || "首頁"
                    : menuItems.find(item => item.href === pathname)?.label || "首頁"
                }
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
                {showExhibitionSubmenu ? (
                  <div>
                    <div className="flex items-center mb-2">
                      <button
                        onClick={() => setShowExhibitionSubmenu(false)}
                        className="flex items-center text-gray-600 px-4 py-2"
                      >
                        <ChevronDown className="w-5 h-5 rotate-90 mr-1" />
                        返回
                      </button>
                    </div>
                    <ul className="flex flex-col space-y-2 mt-2">
                      {exhibitionAreas.map((area, index) => (
                        <motion.li
                          key={area.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <Link
                            href={`/online-exhibition/${area.id}`}
                            className="block hover:bg-gray-50 px-6 py-4 text-center transition-colors duration-300 rounded-2xl"
                            onClick={closeMenu}
                          >
                            <div className="flex items-center justify-center">
                              {area.name}
                              {area.name === "實踐展區" && (
                                <span className="ml-2 px-1.5 py-0.3 text-[10px] font-bold bg-blue-100 text-blue-600 rounded-lg">
                                  3D
                                </span>
                              )}
                            </div>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <ul className="flex flex-col space-y-2">
                    {menuItems.map((item, index) => (
                      item.children ? (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <button
                            onClick={() => setShowExhibitionSubmenu(true)}
                            className="w-full hover:bg-gray-50 px-6 py-4 text-center transition-colors duration-300 rounded-2xl"
                          >
                            {item.label}
                          </button>
                        </motion.li>
                      ) : (
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
                      )
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
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

