import { UploadResponse } from "imagekit/dist/libs/interfaces";
import Image from "next/image";


export default function UploadThumbnail({ file } : { file:UploadResponse }) {
   if(file.fileType === 'image') {
    return (
        <Image src={file.thumbnailUrl} alt="product_image" height={70} width={70} />
    )
   }
}