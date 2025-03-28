"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getAllWorks, type Work } from "@/data/designers";

interface WorkFooterProps {
  workId: string;
  categoryImage: string;
  categoryName: string;
}

const WorkFooter = ({
  workId,
  categoryImage,
  categoryName,
}: WorkFooterProps) => {
  const pathname = usePathname();

  // Get navigation links for work detail page
  const getNavigationLinks = () => {
    const allWorks = getAllWorks();
    const currentIndex = allWorks.findIndex((work: Work) => work.id === workId);
    if (currentIndex === -1) return null;

    const totalWorks = allWorks.length;
    const prevIndex = (currentIndex - 1 + totalWorks) % totalWorks;
    const nextIndex = (currentIndex + 1) % totalWorks;

    return {
      prev: {
        path: `/work/${allWorks[prevIndex].id}`,
        label: "上一個作品",
      },
      next: {
        path: `/work/${allWorks[nextIndex].id}`,
        label: "下一個作品",
      },
    };
  };

  const navigation = getNavigationLinks();

  return (
    <footer className="w-full py-12 z-[30] relative">
      <div className="container relative z-[20]">
        {/* Navigation */}
        {navigation && (
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <Link
                href={navigation.prev.path}
                className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="text-sm">{navigation.prev.label}</span>
              </Link>

              <Link
                href={navigation.next.path}
                className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <span className="text-sm">{navigation.next.label}</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div className="w-full h-px bg-neutral-200 mb-6 relative z-[1]"></div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          {/* Desktop Content */}
          <div className="hidden md:flex justify-between items-center">
            {/* Address and Email */}
            <div className="text-neutral-700 font-light flex items-center gap-6 whitespace-nowrap">
              <span className="text-sm font-medium text-neutral-900">
                Shih Chien University
              </span>
              <span className="text-sm text-neutral-400">|</span>
              <span className="text-sm">
                No. 70, Dazhi St., Zhongshan Dist., Taipei City, 104
              </span>
              <span className="text-sm text-neutral-400">|</span>
              <a
                href="mailto:scid@g2.usc.edu.tw"
                className="text-sm text-neutral-900 hover:text-blue-600 transition-colors duration-300"
              >
                scid@g2.usc.edu.tw
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 text-neutral-700">
              <Link
                href="https://www.facebook.com/scid.official"
                className="hover:text-neutral-900 transition-all duration-300"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/scid.design/"
                className="hover:text-neutral-900 transition-all duration-300"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772a4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="md:hidden space-y-6">
            {/* Address */}
            <div className="text-center">
              <span className="text-sm font-medium text-neutral-900 block mb-2">
                Shih Chien University
              </span>
              <span className="text-xs text-neutral-700 block">
                No. 70, Dazhi St., Zhongshan Dist., Taipei City, 104
              </span>
              <a
                href="mailto:scid@g2.usc.edu.tw"
                className="text-xs text-neutral-900 hover:text-blue-600 transition-colors duration-300 mt-1 block"
              >
                scid@g2.usc.edu.tw
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 text-neutral-700">
              <Link
                href="https://www.facebook.com/scid.official"
                className="hover:text-neutral-900 transition-all duration-300"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/scid.design/"
                className="hover:text-neutral-900 transition-all duration-300"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772a4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-left Category Image - Inside the footer */}
      <div
        className="absolute left-0 bottom-0 overflow-visible pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <div className="w-[420px] h-[420px] md:w-[560px] md:h-[520px] -ml-60 md:-ml-48 -mb-12 md:-mb-72 animate-slow-spin pointer-events-auto">
          <Image
            src={categoryImage}
            alt={categoryName}
            width={560}
            height={560}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default WorkFooter;
