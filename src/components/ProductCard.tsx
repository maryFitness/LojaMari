'use client'

import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
    xata_id: string
    name: string
    priceInCents: number
    description: string
    images: { imagePath: string} [] 
}

export function ProductCard({ xata_id, name, priceInCents, images }: ProductCardProps) {


    return (         
    <Card className="flex overflow-hidden flex-col">
        <div className="relative w-full h-auto aspect-square">
            <Image src={images[0].imagePath} fill alt={name} sizes="10" priority />
        </div>
        <CardHeader>
            <CardTitle className="text-lg">{name.toLocaleUpperCase()}</CardTitle>
            <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            
        </CardContent>
        <CardFooter>
            <Button asChild size="lg" className="w-full">
                <Link href={`/products/${xata_id}/purchase`}>
                    Detalhes
                </Link>
            </Button>
        </CardFooter>
    </Card>
 )
}

export function ProductCardSkeleton() {
    return (
        <Card className="overflow-hidden flex flex-col animate-pulse">
            <div className="w-full aspect-video bg-gray-300" />
            <CardHeader>
                <CardTitle>
                    <div className="w-3/4 h-6 rounded-full bg-gray-300" />
                </CardTitle>
                <CardDescription>
                    <div className="w-1/2 h-4 rounded-full bg-gray-300" />
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="w-full h-4 rounded-full bg-gray-300"/>
                <div className="w-full h-4 rounded-full bg-gray-300"/>
                <div className="w-3/4 h-4 rounded-full bg-gray-300"/>
            </CardContent>
            <CardFooter>
                <Button className="w-full" disabled size="lg"></Button>
            </CardFooter>
        </Card>
    )
}