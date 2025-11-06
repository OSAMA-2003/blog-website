import React from 'react'

const Ping = () => {
  return (
    <div className='relative'>
        
        <div className=' absolute top-1 -left-4'>

            <span className='flex size-[11px]' >
                <span className=' absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75' >
                    
                </span>
                <span className='relative inline-flex size-[10px] rounded-full bg-blue-900 '></span>
            </span>

        </div>

    </div>
  )
}

export default Ping