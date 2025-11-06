"use client"

import { formatDate } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Author, Startup } from "@/sanity/types"
import { EyeIcon } from "lucide-react"

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author }

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const { _createdAt,views, author, _id, title, image, description, category } = post

  return (
    <div className="relative group w-full  h-72 bg-slate-40 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center shadow-md transition-all duration-500 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-bl before:from-sky-100 before:via-violet-200 before:to-violet-700 before:rounded-2xl before:transition-all before:duration-500 hover:before:scale-95 hover:before:h-72 hover:before:w-full">
      {/* Image / Preview */}
      
      <div className=' absolute flex gap-1.5 top-3 right-2'>
          <EyeIcon className='size-6 text-blue-900 ' />
          <span className=' text-16-medium '> {views} </span>
        </div>

      <Link href={`/startup/${_id}`}>
        <img
          src={image}
          alt="Startup image"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-all duration-500"
        />
      </Link>

      

      {/* Floating author avatar */}
      <div className="w-28 h-28 mt-8 rounded-full border-4 border-slate-50 z-10 bg-white overflow-hidden transform transition-all duration-500 group-hover:scale-80 group-hover:-translate-x-36 group-hover:-translate-y-10 shadow-lg">
        <Link href={`/user/${author?._id}`}>
          <Image
            src={
              author?.image ||
              "https://media.istockphoto.com/id/2219349794/vector/blank-image-placeholder-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=xor9DmYUk9hn2YCuIKRCHz_HD-R_RWSHdX5q_7YIi30="
            }
            alt="Author"
            width={110}
            height={110}
            className="rounded-full object-cover"
          />
        </Link>
      </div>

      {/* Text content */}
      <div className="z-10 transform transition-all duration-500 group-hover:-translate-y-10">
        <Link href={`/user/${author?._id}`}>
          <p className="text-sm text-gray-700 font-medium">{author?.name}</p>
        </Link>

        <Link href={`/startup/${_id}`}>
          <h3 className="text-2xl font-bold text-gray-900 mt-1 line-clamp-1 ">
            {title}
          </h3>
        </Link>

        <p className="text-gray-50 text-shadow-2x text-sm mt-1 line-clamp-2 px-4">
          {description}
        </p>

        <p className="text-xs text-gray-100 mt-2">{formatDate(_createdAt)}</p>
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

export default StartupCard
