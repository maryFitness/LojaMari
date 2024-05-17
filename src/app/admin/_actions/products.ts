"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const customMessages = {
  required: 'Este campo é obrigatório',
  stringMin: 'O nome deve conter pelo menos 1 caractere',
  numberMin: 'O número deve ser maior ou igual a 1',
  imageMin: 'Adicione pelo menos 1 imagem',
  textArea: 'A descrição deve ter no minimo 20 caracteres'
};

const addSchema = z.object({
  name: z.string().min(1, { message: customMessages.stringMin }),
  description: z.string().min(1, { message: customMessages.textArea }),
  priceInCents: z.coerce.number().int().min(1, { message: customMessages.numberMin }),
  tags: z.string().min(1, {message: customMessages.required}),
  category: z.string().min(1, {message: customMessages.required}),
  image: z.string().min(1,{message: customMessages.imageMin}),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false || result.data.image === '') {
    return result.error?.formErrors.fieldErrors
  }

  const data = result.data


  const imagesArray = data.image.split(',')
  const tagsArray = data.tags.split(',')
  

 const createdProduct =  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      tags: tagsArray
    },
  })

  const productId = createdProduct.xata_id

  const productImagesPromises = imagesArray.map(async (imagePath: string) => {
    await db.productImage.create({
      data: {
        productId,
        imagePath
      }
    })
  })

  await Promise.all(productImagesPromises)


  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}



export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const product = await db.product.findUnique({ where: { xata_id: id } })

  if (product == null) return notFound()

 

  // await db.product.update({
  //   where: { xata_id: id },
  //   data: {
  //     name: data.name,
  //     description: data.description,
  //     priceInCents: data.priceInCents,
  //     filePath,
  //     imagePath,
  //   },
  // })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { xata_id: id }, data: { isAvailableForPurchase } })

  revalidatePath("/")
  revalidatePath("/products")
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { xata_id: id } })

  if (product == null) return notFound()

  revalidatePath("/")
  revalidatePath("/products")
}