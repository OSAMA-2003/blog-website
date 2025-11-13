import { STARTUPS_BY_ID_QUERY } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const md = markdownit();
export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUPS_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <div className="min-h-screen ">
      {/* === Hero Section === */}
      <section
  className="relative flex flex-col items-center justify-center text-center min-h-[70vh] px-6 py-20 bg-cover bg-center"
  style={{
    backgroundImage: `url(${post.image || "/fallback.jpg"})`,
  }}
>
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

  <div className="relative z-10 max-w-3xl mx-auto text-white">
    <p className="text-sm uppercase tracking-widest font-semibold text-blue-200">
      {formatDate(post?._createdAt)}
    </p>
    <h1 className="text-4xl heading md:text-6xl font-bold mt-3 leading-tight">
      {post.title}
    </h1>
    <p className="mt-5 text-lg text-gray-200 font-light">
      {post?.description}
    </p>
  </div>
</section>





      {/* === Main Content === */}
<section className="max-w-6xl  glass mx-1 md:mx-auto my-5 px-5 py-10 flex flex-col md:flex-row gap-10 items-start justify-between">
  
  {/* Left: Image Container */}
  <div className="md:w-1/2 w-full rounded-3xl overflow-hidden shadow-lg">
    <img
      src={post.image || "/fallback.jpg"}
      alt={post.title || " "} 
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
    />
  </div>

  {/* Right: Content Container */}
  <div className="md:w-1/2 w-full flex flex-col gap-6">
    
    {/* Author Info + Category */}
    <div className="flex items-center justify-between flex-wrap gap-4">
      <Link
        href={`/user/${post.author?._id}`}
        className="flex items-center gap-4"
      >
        <Image
          src={
            post.author?.image ||
            "https://media.istockphoto.com/id/2219349794/vector/blank-image-placeholder-icon-vector-illustration.jpg"
          }
          alt="author"
          width={60}
          height={60}
          className="rounded-full border-2 border-sky-200 shadow-md"
        />
        <div>
          <p className="text-lg font-semibold text-gray-900">
            {post.author?.name}
          </p>
          <p className="text-gray-400 text-sm">@{post.author?.username}</p>
        </div>
      </Link>

      <span className="px-4 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-700 shadow-sm">
        {post.category}
      </span>
    </div>

    {/* Title + Date */}
    <div>
      <h1 className="text-3xl md:text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] font-bold text-gray-200 mb-2">
        {post.title}
      </h1>
      <p className="text-gray-400 text-sm">{formatDate(post?._createdAt)}</p>
    </div>

    {/* Description */}
    <p className="text-gray-300 leading-relaxed">{post.description}</p>

    {/* Pitch Details */}
    <div>
      <h3 className="text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] font-bold text-gray-50 mb-3">
        Blog Details
      </h3>
      {parsedContent ? (
        <article
          className="prose prose-slate text-gray-300  max-w-none font-sans leading-relaxed"
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
      ) : (
        <p className="text-gray-300 italic">No details provided.</p>
      )}
    </div>

    {/* Views Component */}
    <div className="mt-6 border-t border-slate-200 pt-6">
      <Suspense fallback={<Skeleton className="h-8 w-full rounded-md" />}>
        <View id={id} />
      </Suspense>
    </div>
  </div>
</section>

    </div>
  );
};

export default page;
