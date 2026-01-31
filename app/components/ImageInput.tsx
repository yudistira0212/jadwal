"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageInput({
  defaultImage,
}: {
  defaultImage?: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="font-bold text-gray-700">
        Upload Gambar (Poster/Flyer)
      </label>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition relative min-h-50">
        {preview ? (
          <div className="relative w-full h-64">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain rounded"
            />
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs shadow"
            >
              Hapus
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p>Belum ada gambar dipilih</p>
          </div>
        )}

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <p className="text-xs text-gray-500">
        *Klik kotak di atas untuk memilih gambar. Format: JPG/PNG.
      </p>
    </div>
  );
}
