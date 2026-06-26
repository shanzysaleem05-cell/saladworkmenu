interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, label, centered = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center flex flex-col items-center" : "flex flex-col items-start"}`}>
      {label && (
        <span className="text-brand-green uppercase tracking-wider font-semibold text-sm mb-2">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-site-black mb-4 tracking-tight border-b-4 border-brand-green pb-2 inline-block">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg text-gray-500 mt-2 ${centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
