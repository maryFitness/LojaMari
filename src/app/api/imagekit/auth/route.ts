import { auth } from "@clerk/nextjs/server";
import ImageKit from "imagekit"

export const GET = async () => {
    const { userId } : { userId: string | null } = auth();

    if(!userId) {
        return Response.json(false)
    }

    const ik = new ImageKit({
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
        privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY as string,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
    })

    return Response.json(ik.getAuthenticationParameters())

}