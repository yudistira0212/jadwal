"use client";

import { useState } from "react";
import {
  TrashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

// Definisikan tipe fungsi delete action
type DeleteAction = (
  id: string,
) => Promise<{ success: boolean; message: string }>;

export default function DeleteButton({
  id,
  deleteAction,
}: {
  id: string;
  deleteAction: DeleteAction;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showResult, setShowResult] = useState<{
    show: boolean;
    success: boolean;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi saat tombol "YA, HAPUS" diklik
  const handleConfirm = async () => {
    setIsLoading(true);
    // Panggil Server Action
    const result = await deleteAction(id);
    setIsLoading(false);
    setShowConfirm(false); // Tutup modal konfirmasi

    // Tampilkan Modal Hasil (Entah sukses atau error)
    setShowResult({
      show: true,
      success: result.success,
      message: result.message,
    });
  };

  return (
    <>
      {/* 1. TOMBOL UTAMA (Tong Sampah) */}
      <button
        onClick={() => setShowConfirm(true)}
        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded transition-colors"
        title="Hapus Data"
      >
        <TrashIcon className="h-5 w-5" />
      </button>

      {/* 2. POPUP KONFIRMASI (Are you sure?) */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full transform scale-100 transition-transform">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 p-3 rounded-full mb-4">
                <TrashIcon className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Hapus Data?
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak
                dapat dibatalkan.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className={`flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition flex justify-center items-center ${isLoading && "cursor-not-allowed"}
                   `}
                >
                  {isLoading ? "Menghapus..." : "Ya, Hapus"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. POPUP HASIL (Error / Success) */}
      {showResult && showResult.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full">
            <div className="flex flex-col items-center text-center">
              {showResult.success ? (
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <CheckCircleIcon className="h-8 w-8 text-green-600" />
                </div>
              ) : (
                <div className="bg-orange-100 p-3 rounded-full mb-4">
                  <ExclamationTriangleIcon className="h-8 w-8 text-orange-600" />
                </div>
              )}

              <h3
                className={`text-lg font-bold mb-2 ${showResult.success ? "text-green-700" : "text-orange-700"}`}
              >
                {showResult.success ? "Berhasil" : "Tidak Bisa Dihapus"}
              </h3>

              <p className="text-gray-600 text-sm mb-6">{showResult.message}</p>

              <button
                onClick={() => setShowResult(null)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-900 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
