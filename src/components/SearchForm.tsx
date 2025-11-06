import React from 'react'
import Form from 'next/form'
import SearchFormRest from './SearchFormReset'
import { SearchIcon } from 'lucide-react'


function SearchForm({query}:{query?:string}) {

  return (
    <>
    <Form action='/' scroll={false} className='search-form' >

        <input 
            name='query'
            defaultValue={query}
            className='search-input'
            placeholder='Search Startups'
        />

        <div className='flex gap-2' >
            {query && <SearchFormRest/> }
            <button type='submit' className='search-btn text-white hover:bg-blue-900'>
                <SearchIcon/>
            </button>
        </div>

        

    </Form>






</>


  )
}

export default SearchForm