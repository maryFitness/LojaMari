import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Product, ProductImage } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

type ProductWithImages = Product & {
  images: ProductImage[]
}

const getMostPopularProducts = cache(async () => {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: {
            orders: {
                _count: "desc"
            }
        },
        include: {
            images: true
        },
        take: 6
    }) as Promise<ProductWithImages[]>
}, ["getMostPopularProducts"], 
    { revalidate: 60 * 60 * 24 }
)

const getNewestProducts = cache(async () => {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: {
            xata_createdat: "desc"
        },
        include: {
            images: true
        },
        take: 6
    }) as Promise<ProductWithImages[]>
}, ["getNewestProducts"])

export default function HomePage() {
  return (
    <main className="space-y-12">
        <ProductGridSection title="Mais Vendidos" productFetcher={getMostPopularProducts}/>
        <ProductGridSection title="Novidade" productFetcher={getNewestProducts} />
    </main>
  )
}

type ProductGridSectionProps = {
    title: string
    productFetcher: () => Promise<ProductWithImages[]>
}

function ProductGridSection({productFetcher, title}: ProductGridSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <h2 className="text-3xl font-bold">{title}</h2>
                <Button variant="outline" asChild>
                    <Link href="/products">
                        <span>View All</span>
                        <ArrowRight className="size-3" /> 
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Suspense fallback={
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            }>
                <ProductSuspense productFetcher={productFetcher} />
              </Suspense>         
            </div>
        </div>
    )     
}

async function ProductSuspense({productFetcher}: {productFetcher: () => Promise<ProductWithImages[]>}) {
    const products = await productFetcher();
    return (
        <>
            {products.map(product => (
                <ProductCard key={product.xata_id} {...product} />
            ))}
        </>
    )
}
