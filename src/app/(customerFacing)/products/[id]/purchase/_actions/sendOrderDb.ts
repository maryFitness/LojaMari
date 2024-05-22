'use server'

import { currentUser } from "@clerk/nextjs/server"
import db from "@/db/db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

interface CartItem {
    id: string;
    url: string;
    name: string;
    price: number;
    color: string;
    size: string;
    quantity: number;
  }

const sendOrderToDB = async (cartItems: CartItem[], total: number) => {
    const user = await currentUser()
  
    if(!user?.emailAddresses[0].emailAddress) return
    const email = user.emailAddresses[0].emailAddress
        
    var isEmailRegistered = await db.user.findFirst({ where: { email }})

    if(!isEmailRegistered) {
          const userCreated = await db.user.create({
            data: {
                email
            }
        }) 
        isEmailRegistered = userCreated
        console.log("Primeiro registro do email realizado com sucesso!")
    }
    

    const cartItemsJson = cartItems.map(item => ({
        id: item.id,
        url: item.url,
        name: item.name,
        price: item.price,
        color: item.color,
        size: item.size,
        quantity: item.quantity
    }));


    const orderCreated = await db.order.create({
        data: {
            pricePaidInCents: total,
            userId: isEmailRegistered.xata_id,
            productId: cartItems[0].id,
            cartitems: cartItemsJson
        }
    })

    console.log("Order created successfully!")
    revalidatePath("/")
    revalidatePath("/products")
    redirect("/orders")

}

export default sendOrderToDB