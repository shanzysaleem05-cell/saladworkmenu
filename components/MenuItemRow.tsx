interface MenuItemRowProps {
  name: string;
  description: string;
  price: number;
}

export function MenuItemRow({ name, description, price }: MenuItemRowProps) {
  return (
    <div className="flex justify-between items-start py-4 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors px-2 -mx-2 rounded-lg">
      <div className="flex flex-col gap-1 pr-4">
        <h4 className="font-semibold text-site-black">{name}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="font-bold text-brand-green whitespace-nowrap">
        ${price.toFixed(2)}
      </div>
    </div>
  )
}
