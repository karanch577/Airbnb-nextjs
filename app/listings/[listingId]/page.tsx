import getCurrentUser from '@/utils/getCurrentUser'
import getListingById from '@/utils/getListingById'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import ListingClient from './ListingClient'
import getReservations from '@/utils/getReservations'



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