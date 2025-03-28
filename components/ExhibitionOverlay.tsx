"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

const ExhibitionOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // 檢查當前頁面是否是作品總覽、設計師、購買專刊、米蘭展區或新一代展區頁面
  const isRestrictedPage =
    pathname === "/all-works" ||
    pathname.startsWith("/all-works/") ||
    pathname === "/designer" ||
    pathname.startsWith("/designer/") ||
    pathname === "/buy-catalog" ||
    pathname.startsWith("/buy-catalog/") ||
    pathname === "/online-exhibition/milan" ||
    pathname.startsWith("/online-exhibition/milan/") ||
    pathname === "/online-exhibition/young-designers" ||
    pathname.startsWith("/online-exhibition/young-designers/");

  // 確保當路由變化時，重新評估是否顯示覆蓋層
  useEffect(() => {
    // 如果是受限頁面，顯示覆蓋層
    if (isRestrictedPage) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [pathname, isRestrictedPage]);

  useEffect(() => {
    // 只在受限頁面啟用鍵盤監聽
    if (!isRestrictedPage) {
      return;
    }

    // 保留'o'鍵功能，但預設覆蓋層已經顯示
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key && event.key.toLowerCase() === "o") {
        setIsVisible((prev) => !prev);
      } else if (isVisible) {
        // Navigate to homepage when any other key is pressed while overlay is visible
        router.push("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, router, isRestrictedPage, pathname]);

  // Handle click on overlay to navigate to homepage
  const handleOverlayClick = () => {
    if (isVisible) {
      router.push("/");
    }
  };

  // 只在受限頁面渲染覆蓋層組件
  if (!isRestrictedPage) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-16 left-0 right-0 bottom-0 bg-black backdrop-blur-sm z-40 flex flex-col items-center justify-center cursor-pointer"
          aria-label="暫不開放"
          role="alert"
          onClick={handleOverlayClick}
          onKeyDown={(e) => e.key !== "o" && handleOverlayClick()}
          tabIndex={0}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-white text-5xl font-bold text-center px-4 mb-6"
          >
            暫不開放
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-white/70 text-lg mt-0 flex items-center"
          >
            按任意鍵或點擊畫面回到首頁
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExhibitionOverlay;
