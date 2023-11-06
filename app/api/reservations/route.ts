import getCurrentUser from "@/utils/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return NextResponse.error()
    }

    const body = await req.json()

    const {totalPrice, startDate, endDate, listingId} = body;

    if(!listingId || !totalPrice || !startDate || !endDate) {
        return NextResponse.error()
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })

    return NextResponse.json({
        success: true,
        message: "Listing created successfully",
        listingAndReservation
    }, {
        status: 200
    })
}