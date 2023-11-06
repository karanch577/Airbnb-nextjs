import getCurrentUser from "@/utils/getCurrentUser"
import getReservations from "@/utils/getReservations"
import EmptyState from "@/components/EmptyState"
import TripsClient from "./TripsClient"

async function Trips() {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return (
            <EmptyState
            title="Unauthorized"
            subtitle="Please login"
            />
        )
    }

    const reservations = await getReservations({ userId: currentUser.id })

    if(reservations.length === 0) {
        return (
            <EmptyState
            title="No trips found"
            subtitle="Looks like you haven't reserved any trips."
            />
        )
    }

  return (
    <TripsClient
    reservations={reservations}
    currentUser={currentUser}
    />
  )
}

export default Trips