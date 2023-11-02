"use client";

import useCountries from "@/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client"
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
}

function ListingCard({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId="",
  currentUser
}: ListingCardProps) {

  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if(disabled) {
      return;
    }

    return onAction?.(actionId)
  }, [disabled, onAction, actionId])

  const price = useMemo(() => {
    if(reservation) {
      return reservation.totalPrice
    }

    return data.price;
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if(!reservation) {
      return null
    }

    const startDate = new Date(reservation.createdAt)
    const endDate = new Date(reservation.endDate)

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`
  }, [reservation])

  return (
    <div
    className="">

    </div>
  )
}

export default ListingCard