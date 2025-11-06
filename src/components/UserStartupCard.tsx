"use client"

import { formatDate } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Author, Startup } from "@/sanity/types"
import { EyeIcon, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { deletePitch } from "@/lib/actions"

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author }

const UserStartupCard = ({ post }: { post: StartupTypeCard }) => {
  const { views, _id, title, image, description, category } = post
  const { toast } = useToast()
  const router = useRouter()

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this startup?")) {
      const result = await deletePitch(_id)
      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been deleted.",
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete the startup.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="relative group w-full h-72 bg-slate-40 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center shadow-md transition-all duration-500 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-bl before:from-sky-100 before:via-violet-200 before:to-blue-700 before:rounded-2xl before:transition-all before:duration-500 hover:before:scale-95 hover:before:h-72 hover:before:w-full">
      {/* Image / Preview */}
      
      <div className=' absolute flex gap-1.5 top-3 right-2'>
          <EyeIcon className='size-6 text-blue-900 ' />
          <span className=' text-16-medium '> {views} </span>
        </div>

      <button
        onClick={handleDelete}
        className="absolute top-3 left-3 z-20 bg-red-500/80 hover:bg-red-600 p-2 rounded-full text-white"
        aria-label="Delete startup"
      >
        <Trash2 className="size-4" />
      </button>

      <Link href={`/startup/${_id}`}>
        <img
          src={image}
          alt="Startup image"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-all duration-500"
        />
      </Link>

      
     
    
    
      {/* Text content */}
      <div className="z-10 transform transition-all duration-500 group-hover:-translate-y-10">

        <Link href={`/startup/${_id}`}>
          <h3 className="text-2xl font-bold text-gray-900 mt-1 line-clamp-1 ">
            {title}
          </h3>
        </Link>

        <p className="text-gray-50 text-shadow-2x text-sm mt-1 line-clamp-2 px-4">
          {description}
        </p>

      </div>

      {/* Follow / Details button */}
      <Link
        href={`/startup/${_id}`}
        className="bg-blue-700 text-slate-50 px-4 py-1 rounded-md z-10 mt-3 hover:scale-110 transition-all duration-500 hover:bg-blue-500"
      >
        Details
      </Link>

      {/* Category tag (optional) */}
      <div className="absolute bottom-2 right-3 text-xs font-semibold text-gray-700 bg-white/80 px-2 py-0.5 rounded-full shadow">
        {category}
      </div>
    </div>
  )
}

export default UserStartupCard
