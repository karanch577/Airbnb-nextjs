import getCurrentUser from '@/utils/getCurrentUser'
import getFavoriteListings from '@/utils/getFavoriteListings'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import FavoritesClient from './FavoritesClient'

async function FavoritesListings() {
    const listings = await getFavoriteListings()
    const currentUser = await getCurrentUser()

    if(listings.length === 0) {
        return (
            <EmptyState
            title='No favorites found'
            subtitle='Looks like you have no favorite listings'
            />
        )
    }

  return (
    <FavoritesClient 
    listings={listings}
    currentUser={currentUser}
    />
  )
}

export default FavoritesListings