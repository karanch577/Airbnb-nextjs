import getCurrentUser from "@/utils/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    listingId?: string
}

export async function DELETE(req: NextRequest, { params }: { params: IParams}) {
    const { listingId } = params
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return NextResponse.error()
    }

    if(!listingId || typeof listingId !== "string") {
        throw new Error("Invalid ID")
    }

    // we are using deleteMany because deleteMany allows us to pass multiple where queries
    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    })

    return NextResponse.json({
        success: true,
        message: "Property deleted successfully",
        listing
    }, {
        status: 200
    })
}