'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons"
import { IKContext, IKUpload } from "imagekitio-react"
import { IKUploadProps } from "imagekitio-react/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import UploadThumbnail from "./UploadThumbnail";

interface UploaderProps extends IKUploadProps {
    isUploading: boolean;
    files: UploadResponse[]
  }
 
  export default function Uploader({ isUploading, files, ...props }: UploaderProps) {
    return (
    <>
    <div className="flex pt-8">
        <div className="bg-gray-200 p-4 rounded flex flex-col justify-center gap-4">
            <FontAwesomeIcon icon={faImage} className="h-24"/>
             <label className="upload-btn bg-slate-950 text-white w-[15rem] h-[2.5rem] rounded flex items-center justify-center cursor-pointer">
                <IKContext
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                     publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
                     authenticator={async () => {
                         const response = await fetch('/api/imagekit/auth')
                         return await response.json()
                    }}
                 >
                <IKUpload {...props} />
            </IKContext>
            {isUploading ? (
                <Loader2 className="animate-spin size-8" />
            ):(
                <div>
                    <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" /> 
                    <span>Add fotos</span>
                </div> 
            )} 
        </label>
        <div className="flex gap-2 mt-2 flex-wrap">
        {files.map(file => (
            <div key={file.fileId} className="size-14 rounded overflow-hidden">
                <UploadThumbnail file={file} />
            </div>
        ))}
       </div>
        </div>
    </div>
    </>
  )
}
