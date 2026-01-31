"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  label = "Simpan",
  loadingLabel = "Menyimpan...",
  className,
}: {
  label?: string;
  loadingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus(); // Hook spesial Next.js untuk cek status server action

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex-1 py-2 px-4 rounded font-bold text-white transition-all flex justify-center items-center gap-2
        ${
          pending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-cyan-600 hover:bg-cyan-700 shadow-md hover:shadow-lg"
        } ${className}`}
    >
      {pending ? (
        <>
          {/* Spinner Kecil (SVG) */}
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}
