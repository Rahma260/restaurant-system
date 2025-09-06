import React from "react";
import { useLoading } from "./Context/LoadingContext";

export default function Loading() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 border-4 border-red-950 border-t-yellow-400 border-b-red-700 rounded-full animate-spin mb-4"></div>
        <p className="text-white text-lg font-semibold">جاري التحميل...</p>
      </div>
    </div>
  );
}
