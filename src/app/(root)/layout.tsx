import { Suspense } from 'react'
import Navbar from '../../components/Navbar'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <main className="font-work-sans min-h-screen">
      <Suspense fallback={<div>Loading navigation...</div>}>
        <Navbar />
      </Suspense>
      {children}
    </main>
  )
}
