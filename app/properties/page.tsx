import getCurrentUser from "@/utils/getCurrentUser"
import EmptyState from "@/components/EmptyState"
import PropertiesClient from "./PropertiesClient"
import getListings from "@/utils/getListings"

async function Properties() {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return (
            <EmptyState
            title="Unauthorized"
            subtitle="Please login"
            />
        )
    }

    const listings = await getListings({ userId: currentUser.id })

    if(listings.length === 0) {
        return (
            <EmptyState
            title="No Properties found"
            subtitle="Looks like you haven't no properties."
            />
        )
    }

  return (
    <PropertiesClient
    listings={listings}
    currentUser={currentUser}
    />
  )
}

export default Properties;