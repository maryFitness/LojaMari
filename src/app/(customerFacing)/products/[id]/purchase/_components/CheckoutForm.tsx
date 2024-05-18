"use client"

import EmblaCarousel from "@/components/imgSlider/Carousel"
import { formatCurrency } from "@/lib/formatters"
import { Product, ProductImage } from "@prisma/client"

type ProductWithImages = Product & {
    images: ProductImage[];
  }
  
  type CheckoutFormProps = {
    product: ProductWithImages;
  }

  const OPTIONS = {loop:true}


export default function CheckoutForm({ product }: CheckoutFormProps) {

    const images = product.images

    const tags = product.tags;

    const colors: string[] = [];
    const sizes: string[] = [];

    tags.forEach(tag => {
        if (['branco', 'preto', 'marron'].includes(tag.toLowerCase())) {
            colors.push(tag);
        } else if (['P', 'M', 'G', 'GG', 'XG'].includes(tag)) {
            sizes.push(tag);
        }
    });

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
   <div className="flex flex-col lg:flex-row gap-10 items-center">
        <div className="aspect-square flex-shrink-0 w-full lg:w-1/3 relative">
            <EmblaCarousel slides={images} options={OPTIONS} />
        </div>
        <div>
            <h1 className="text-2xl font-bold uppercase">{product.name}</h1>
            <div className="mt-4">
                <div className="font-semibold">Cores Disponíveis:</div>
                <div className="flex gap-2 mt-2">
                    {colors.map((color, index) => (
                        <span 
                            key={index} 
                            className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-800"
                        >
                            {color.toLocaleUpperCase()}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <div className="font-semibold">Tamanhos Disponíveis:</div>
                <div className="flex gap-2 mt-2">
                    {sizes.map((size, index) => (
                        <span 
                            key={index} 
                            className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800"
                        >
                            {size.toLocaleUpperCase()}
                        </span>
                    ))}
                </div>
            </div>
            <div className="text-lg mt-4">
                {formatCurrency(product.priceInCents / 100)}
            </div>
            <div className="line-clamp-3 text-muted-foreground mt-4">
                {product.description}
            </div>
        </div>
    </div>
</div>
        
  )
}

