"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
      <h1 className="text-[26px] md:text-[34px] font-black text-site-black mb-4">
        Something Went Wrong
      </h1>
      <p className="text-gray-500 text-[15px] md:text-[16px] max-w-md mb-8 leading-relaxed">
        This page hit an unexpected error. Try refreshing, or head back to the homepage.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => reset()}
          className="bg-brand-orange text-white font-bold text-[14px] px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
        <Link href="/" className="border border-gray-300 text-site-black font-bold text-[14px] px-6 py-3 rounded-full hover:border-brand-orange hover:text-brand-orange transition-colors">
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
