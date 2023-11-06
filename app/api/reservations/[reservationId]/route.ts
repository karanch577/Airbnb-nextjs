import getCurrentUser from "@/utils/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    reservationId: string
}

export async function DELETE(req: NextRequest, { params }: { params: IParams }) {
    const { reservationId } = params;

    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return NextResponse.error()
    }

    if(!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid ID");
    }

    // we used deleteMany to use some query
    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            // reservation can be deleted by the author of the listing or the user who has reserved that listing
            OR: [
                {userId: currentUser.id},
                {listing: {
                    userId: currentUser.id
                }}
            ]
        }
    })

    return NextResponse.json({
        success: true,
        message: "Reservation cancelled successfully",
        reservation
    }, {
        status: 200
    })
}