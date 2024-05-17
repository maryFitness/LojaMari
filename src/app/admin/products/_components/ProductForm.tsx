"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { useState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import { UploadResponse } from "imagekit/dist/libs/interfaces"
import Uploader from "@/components/form/Uploader"
import TagsInput from "@/components/ui/TagsInput"

export default function ProductForm({ product } : { product?: Product | null }) {
  const[error, action] = useFormState(product == null ? addProduct : updateProduct.bind(null, product.xata_id), {})
  const[priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents)
  const[files, setFiles] = useState<UploadResponse[]>([])
  const[isUploading, setIsUploading] = useState(false)
  const[tags, setTags] = useState<string[]>([])


  return (
    <form action={action} className="mx-auto max-w-4xl grid grid-cols-2">
      <div className="grow">
       <Uploader files={files} isUploading={isUploading}
          onUploadStart={() => setIsUploading(true)} 
          onSuccess={file => {
            setFiles(prev => [...prev, file])
            setIsUploading(false)
       }}/>

    <Input required name="image" type="hidden" value={files.map(file => file.url).join(',')} />
    {error?.image && <div className="text-destructive">{error.image}</div>}
    </div>

    
    <div>  
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input type="text" id="name" name="name"  defaultValue={product?.name || ""}/>
        {error?.name && <div className="text-destructive">{error.name}</div>}
      </div>
   
      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Select name="category">
          <SelectTrigger>
            <SelectValue id="category" placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent id="category">
             <SelectGroup>
                <SelectItem value="Praia">Praia</SelectItem>
                <SelectItem value="Academia">Academia</SelectItem>
                <SelectItem value="Social">Social</SelectItem>
                <SelectItem value="Casual">Casual</SelectItem>
             </SelectGroup>
          </SelectContent>
        </Select>
        {error?.category && <div className="text-destructive">{error.category}</div>}
      </div>

       <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
        <TagsInput tags={tags} setTags={setTags} />
        <Input type="hidden" id="tags" name="tags" value={tags} />
        {error?.tags && <div className="text-destructive">{error.tags}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="priceInCents">Preço em centavos</Label>
        <Input type="number" id="priceInCents" name="priceInCents" required
        value={priceInCents} onChange={e => setPriceInCents(Number(e.target.value) || undefined)}
         />
         {error?.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}
        <div className="text-muted-foreground">{formatCurrency((priceInCents || 0) / 100)}</div>
      </div>

      <div className="space-y-2 pb-3">
        <Label htmlFor="description">Descrição</Label>
        <Textarea id="description" name="description"  defaultValue={product?.description} />
        {error?.description && <div className="text-destructive">{error.description}</div>}
      </div>
        <SubmitButton />    
      </div>  
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" disabled={pending}>{pending ? "Enviando..." : "Enviar"}</Button>
}