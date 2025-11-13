import SearchForm from "@/components/SearchForm";
import { STARTUPS_QUERY } from "@/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "../../../auth";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { Pen, Notebook, BookOpen } from "lucide-react";



export default async function Home({searchParams}:{
  searchParams:Promise< {query?:string} >

}) {

  const query = (await searchParams).query


  const params = {search: query || null}

  const {data:posts} = await sanityFetch({query:STARTUPS_QUERY,params})


  console.log( JSON.stringify(posts, null , 2) )


  const session = await auth()
  console.log(session?.id)



  return (
    <>

    {/* Hero Section */}
       <section className="blue_container relative overflow-hidden">
      {/* Floating Lucide Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Pen */}
        <Pen
          className="absolute  top-[25%] right-[5%] md:right-[15%]  px-2 py-2 bg-white rounded-xl text-gray-900 w-10 h-10 animate-float-slow"
        />
        {/* Notebook */}
        <Notebook
          className="absolute top-10 left-[20%]   px-2 py-2 bg-white rounded-xl text-gray-900 w-10 h-10 animate-float"
        />
        {/* Book */}
        <BookOpen
          className="absolute bottom-[50%]  md:bottom-[15%]  left-[5%] md:left-[18%] px-2 py-2 bg-white rounded-xl text-gray-900 w-12 h-12 animate-float-fast"
        />
       
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center">
        <h1 className="heading">
          Start your blog, <br /> connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl mx-auto">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        <div className="mt-6">
          <SearchForm query={query} />
        </div>
      </div>
    </section>


      {/* Blogs Section */}

      <section className="section_container">
        <p className="text-30-semibold drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] !text-white">
          {query?  `Search results for "${query}" `: "All Blogs"}
        </p>

       <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No blogs found</p>
          )}
        </ul>

      </section>

    <SanityLive/>

    </>
  );
}
