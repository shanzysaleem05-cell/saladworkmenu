"use client"

import { useEffect } from "react"

export default function GlobalError({
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
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", textAlign: "center", padding: "80px 16px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 900, marginBottom: "12px" }}>Something Went Wrong</h1>
        <p style={{ color: "#6b7280", marginBottom: "24px" }}>
          SaladWorks Menu hit an unexpected error. Please try again.
        </p>
        <button
          onClick={() => reset()}
          style={{
            background: "#D85A3B",
            color: "white",
            fontWeight: 700,
            padding: "12px 24px",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  )
}
