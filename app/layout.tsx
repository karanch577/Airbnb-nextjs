import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import RegisterModal from '@/components/modals/RegisterModal'
import { Toaster } from 'react-hot-toast'
import LoginModal from '@/components/modals/LoginModal'
import getCurrentUser from '@/utils/getCurrentUser'
import RentModal from '@/components/modals/RentModal'
import SearchModal from '@/components/modals/SearchModal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL("https://karan-nextjs.vercel.app"),
  title: 'Airbnb clone',
  description: 'Holiday Homes & Apartment Rentals',
}

export default async  function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster />
        <Navbar 
        currentUser={currentUser}
        />
        <LoginModal />
        <RegisterModal />
        <SearchModal />
        <RentModal />
        <div className='pb-20 pt-28'>
          {children}
        </div>
        </body>
    </html>
  )
}
