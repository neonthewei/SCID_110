"use client";

import { useState } from "react";

export default function OGDebuggerClient() {
  const [url, setUrl] = useState("https://www.scid110.com");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Use a CORS proxy or your own API route to fetch the OG data
      const response = await fetch(`/api/og-debug?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch OG data");
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Open Graph Debugger</h1>
      <p className="mb-4">
        輸入您要測試的URL，查看Open Graph標籤是否正確設置。這將幫助您確保在社交媒體上分享時顯示正確的預覽。
      </p>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="輸入網址..."
            className="flex-grow p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            {loading ? "載入中..." : "檢查"}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">預覽結果</h2>
          
          <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex flex-col md:flex-row gap-6">
              {result.ogImage && result.ogImage.url && (
                <div className="md:w-1/3">
                  <img
                    src={result.ogImage.url}
                    alt={result.ogTitle || "Preview image"}
                    className="w-full h-auto rounded"
                  />
                </div>
              )}
              <div className="md:w-2/3">
                <h3 className="text-lg font-medium text-blue-600 mb-2">
                  {result.ogTitle || "No title found"}
                </h3>
                <p className="text-gray-600 mb-2 text-sm">
                  {result.ogDescription || "No description found"}
                </p>
                <p className="text-gray-500 text-xs">{result.ogUrl || url}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">所有Open Graph標籤</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Open Graph標籤說明</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>og:title</strong> - 頁面標題，應簡潔明瞭</li>
          <li><strong>og:description</strong> - 頁面內容的簡短描述</li>
          <li><strong>og:image</strong> - 分享時顯示的圖片，建議尺寸1200x630像素</li>
          <li><strong>og:url</strong> - 頁面的規範URL</li>
          <li><strong>og:type</strong> - 內容類型，如website、article、product等</li>
          <li><strong>og:site_name</strong> - 網站名稱</li>
        </ul>
      </div>
    </div>
  );
} 