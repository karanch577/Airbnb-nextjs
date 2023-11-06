"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { Listing, Reservation, User } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ReservationWithListing extends Reservation {
    listing: Listing
}

interface ReservationsClientProps {
    reservations: ReservationWithListing[];
    currentUser?: User | null;
}


function ReservationsClient({
    reservations,
    currentUser
}: ReservationsClientProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("")

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("Reservation cancelled")
            router.refresh()
        })
        .catch(() => {
            toast.error("Something went wrong.")
        })
        .finally(() => setDeletingId(""))
    }, [router])

  return (
    <Container>
        <Heading 
        title="Reservations"
        subtitle="Bookings on your properties"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grids-cols-5 2xl:grids-cols-6 gap-8">
            {reservations.map(reservation => (
                <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLabel="Cancel guest reservation"
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default ReservationsClient