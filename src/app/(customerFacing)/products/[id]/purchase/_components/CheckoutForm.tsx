"use client"

import EmblaCarousel from "@/components/imgSlider/Carousel"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/formatters"
import { Product, ProductImage } from "@prisma/client"
import { CirclePlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/lib/CartContext"
import { useState } from "react"



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
        if (['BRANCO', 'PRETO', 'MARRON', 'AZUL' , 'CINZA' , 'AMARELO', 'ROSA', 'LARANJA', 'VERDE'].includes(tag.toLocaleUpperCase())) {
            colors.push(tag);
        } else if (['P', 'M', 'G', 'GG', 'XG'].includes(tag.toLocaleUpperCase())) {
            sizes.push(tag);
        }
    });

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
   <div className="flex flex-col lg:flex-row gap-10 items-center">
        <div className="aspect-square flex-shrink-0">
            <EmblaCarousel slides={images} options={OPTIONS} />
        </div>
        <div className="flex flex-col items-center justify-center lg:items-start">
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
            <div className="pt-4">
                    <DialogDemo product={product} />
            </div>
        </div>
    </div>
</div>
        
  )
}

export function DialogDemo({ product }: CheckoutFormProps) {
  const { cartItems, setCartItems } = useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const tags = product.tags;
  const upperCaseTags = tags.map(tag => tag.toLocaleUpperCase());

  const separateTags = () => {
    const colors = ['BRANCO', 'PRETO', 'MARRON', 'AZUL', 'CINZA', 'AMARELO', 'ROSA', 'LARANJA', 'VERDE'];
    const sizes = ['P', 'M', 'G', 'GG', 'XG'];

    const availableColors = upperCaseTags.filter(tag => colors.includes(tag));
    const availableSizes = upperCaseTags.filter(tag => sizes.includes(tag));

    return { availableColors, availableSizes };
  };

  const { availableColors, availableSizes } = separateTags();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const newCartItem = {
      id: formData.get('id') as string,
      url: formData.get('url') as string,
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      color: formData.get('cor') as string,
      size: formData.get('tamanho') as string,
      quantity: Number(formData.get('quantidade'))
    };

    const existingItemIndex = cartItems.findIndex(
      item => item.id === newCartItem.id && item.size === newCartItem.size && item.color === newCartItem.color
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += newCartItem.quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, newCartItem]);
    }

    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          <span className="mr-1">Add item</span>
          <CirclePlus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicione ao carrinho</DialogTitle>
          <DialogDescription>
            Adicione o item desejado ao carrinho e clique em adicionar
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cor" className="text-right">  
                Cor
              </Label>
              <Select name="cor" required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Cor" />
                </SelectTrigger>
                <SelectContent>
                  {availableColors.map((color, index) => (
                    <SelectItem key={index} value={color.toLowerCase()}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tamanho" className="text-right">
                Tamanho
              </Label>
              <Select name="tamanho" required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Tamanho" />
                </SelectTrigger>
                <SelectContent>
                  {availableSizes.map((size, index) => (
                    <SelectItem key={index} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantidade" className="text-right">
                Quantidade
              </Label>
              <Input
                type="number"
                name="quantidade"
                id="quantidade"
                defaultValue="1"
                className="col-span-3"
              />
            </div>
            <div>
              <Input name="id" className="hidden" defaultValue={product.xata_id} />
              <Input name="url" className="hidden" defaultValue={product.images[0].imagePath} />
              <Input name="name" className="hidden" defaultValue={product.name} />
              <Input name="price" className="hidden" defaultValue={product.priceInCents} />
            </div>
            <DialogFooter>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </div>     
      </DialogContent>
    </Dialog>
  );
}