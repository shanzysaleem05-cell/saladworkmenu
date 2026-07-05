import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
      <span className="text-brand-orange font-black text-[80px] md:text-[120px] leading-none tracking-tight">404</span>
      <h1 className="text-[26px] md:text-[34px] font-black text-site-black mt-2 mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-500 text-[15px] md:text-[16px] max-w-md mb-8 leading-relaxed">
        The page you're looking for doesn't exist or may have moved. Try one of these instead:
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="bg-brand-orange text-white font-bold text-[14px] px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
          Go to Homepage
        </Link>
        <Link href="/menu" className="border border-gray-300 text-site-black font-bold text-[14px] px-6 py-3 rounded-full hover:border-brand-orange hover:text-brand-orange transition-colors">
          View Full Menu
        </Link>
        <Link href="/directory" className="border border-gray-300 text-site-black font-bold text-[14px] px-6 py-3 rounded-full hover:border-brand-orange hover:text-brand-orange transition-colors">
          Menu Directory
        </Link>
      </div>
    </div>
  )
}
