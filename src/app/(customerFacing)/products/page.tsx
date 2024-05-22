import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Suspense } from "react";

 const getProducts = cache(() => {
    return db.product.findMany({
       where: {isAvailableForPurchase: true}, 
       orderBy: {name: "asc"},
       include :{
        images: true
       }
      }
    )
},["/products", "getProducts"])

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
    <Suspense fallback={
    <>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </>
  }>
      <ProductSuspense />
    </Suspense>         
  </div>
  )
}

async function ProductSuspense() {
    const products = await getProducts()

    console.log(products[0].images[0].imagePath)


    return (
        products.map(product => (
            <ProductCard key={product.xata_id} {...product} />
        ))
    )
}