import db from "@/db/db"
import { notFound } from "next/navigation"
import CheckoutForm from "./_components/CheckoutForm"
import { Product, ProductImage } from "@prisma/client";


type ProductWithImages = Product & {
   images: ProductImage[];
 };

export default async function PurchasePage({ params: { id } }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: { xata_id: id },
    include: { images: true }
  });

  if (product == null) return notFound();


  return (
    <CheckoutForm product={product as ProductWithImages} />
  );
}
