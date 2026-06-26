import { Check } from "lucide-react"
import { Button } from "./Button"
import { cn } from "@/lib/utils"

interface CateringCardProps {
  name: string;
  capacity: string;
  price?: number | null;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

export function CateringCard({ name, capacity, price, features, highlighted = false, buttonText }: CateringCardProps) {
  return (
    <div className={cn(
      "relative rounded-xl flex flex-col h-full overflow-hidden transition-all duration-300",
      highlighted 
        ? "bg-brand-green text-site-white border-2 border-brand-green shadow-lg scale-105 z-10" 
        : "bg-site-white border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
    )}>
      {highlighted && (
        <div className="bg-[#1A1A1A]/20 text-site-white text-xs font-bold uppercase tracking-wider text-center py-1.5">
          Most Popular
        </div>
      )}
      
      <div className="p-8 flex flex-col flex-1">
        <h3 className={cn("text-2xl font-bold mb-1", highlighted ? "text-site-white" : "text-site-black")}>{name}</h3>
        <p className={cn("text-sm mb-6", highlighted ? "text-site-white/80" : "text-gray-500")}>{capacity}</p>
        
        {price != null && (
          <div className={cn("mb-6 pb-6 border-b", highlighted ? "border-site-white/20" : "border-gray-200")}>
            <span className={cn("text-4xl font-extrabold", highlighted ? "text-brand-mint" : "text-brand-green")}>${price.toFixed(2)}</span>
          </div>
        )}
        
        <ul className="flex flex-col gap-4 flex-1 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className={cn("h-5 w-5 shrink-0 mt-0.5", highlighted ? "text-brand-mint" : "text-brand-green")} />
              <span className={cn("text-sm", highlighted ? "text-site-white" : "text-site-black")}>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          variant={highlighted ? "primary" : "outline"} 
          className={cn("w-full mt-auto", highlighted ? "bg-brand-orange hover:bg-[#c44e30] text-site-white border-none" : "border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-site-white")}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
