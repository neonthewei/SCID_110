import { Metadata } from "next";
import { generateMetadata } from "@/utils/metadata";
import OGDebuggerClient from "./og-debugger-client";

export const metadata: Metadata = generateMetadata({
  title: "Open Graph Debugger | 實踐工設2025畢業展",
  description: "測試您的Open Graph標籤是否正確設置，確保在社交媒體上分享時顯示正確的預覽。",
  pagePath: "/og-debugger",
});

export default function OGDebuggerPage() {
  return <OGDebuggerClient />;
} 