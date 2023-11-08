import getCurrentUser from '@/utils/getCurrentUser'
import getListingById from '@/utils/getListingById'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import ListingClient from './ListingClient'
import getReservations from '@/utils/getReservations'
import { Metadata } from 'next'

// dynamic metadata
export async function generateMetadata({ params }: { params: {listingId: string}}):Promise<Metadata> {
    const {listingId} = params
    const listing = await getListingById(listingId)
    return {
        title: listing?.title + " - Airbnb",
        description: listing?.description,
        openGraph: {
          images: [{
              url: listing?.imageSrc as string
          }]
        },
        alternates: {
            canonical: `/listings/${listing?.id}`
        }
      }
  }
  

async function ListingPage({params}: {params: {listingId: string}}) {
    const { listingId } = params
    const listing = await getListingById(listingId)
    const reservations = await getReservations(params)
    const currentUser = await getCurrentUser()

    if(!listing) {
        return (
            <EmptyState />
        )
    }

  return (
    <div>
        <ListingClient 
            listing={listing}
            reservations={reservations}
            currentUser={currentUser}
        />
    </div>
  )
}

export default ListingPage