"use client";

import React, { useState } from "react";

interface PaymentFormProps {
  orderId: string;
  amount: number;
  description: string;
  items: string[];
}

export default function PaymentForm({
  orderId,
  amount,
  description,
  items,
}: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Sending payment request:", {
        orderId,
        amount,
        description,
        items,
      });

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          amount,
          description,
          items,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Payment request failed");
      }

      // 獲取 HTML 回應
      const html = await response.text();

      // 創建一個臨時的 container 來放置 HTML
      const container = document.createElement("div");
      container.innerHTML = html;

      // 找到表單並提交
      const form = container.querySelector("form");
      if (!form) {
        throw new Error("Invalid response from payment server");
      }

      // 將表單添加到頁面並提交
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("Payment error:", err);
      setError(
        err instanceof Error ? err.message : "Payment processing failed"
      );
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handlePayment} className="space-y-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "處理中..." : "立即付款"}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
    </div>
  );
}
