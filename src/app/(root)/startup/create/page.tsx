import StartupForm from '@/components/StartupForm'
import { auth } from '../../../../../auth'
import { redirect } from 'next/navigation'

const page = async () => {

    const session = await auth()

    if(!session) redirect('/')

  return (
    <>
    
    <section className='blue_container !min-h-[250px]'>
        <h1 className='heading'>Submit Your Blog</h1>
    </section>

    <StartupForm/>
    
    </>
  )
}

export default page