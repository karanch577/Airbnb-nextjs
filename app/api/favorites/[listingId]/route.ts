import getCurrentUser from "@/utils/getCurrentUser"
import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server"

interface IParams {
    listingId?: string;
}

export async function POST (req: NextRequest, { params }: { params: IParams}) {

    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return NextResponse.error()
    }
    
    const { listingId } = params

    if(!listingId || typeof listingId !== "string") {
        throw new Error("Invalid Id")
    }

    let favoriteIds = [...(currentUser.favouriteIds || [])]

    favoriteIds.push(listingId)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds: favoriteIds
        }
    })

    if(!user) {
        return NextResponse.json({
            success: false,
            message: "Error in updating favorite id"
        }, {
            status: 401
        })
    }

    return NextResponse.json({
        success: true,
        message: "Favorite listing added successfully",
        user
    }, { status: 200 })
}

export async function DELETE (req: NextRequest, { params }: { params: IParams}) {

    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return NextResponse.error()
    }
    
    const { listingId } = params

    if(!listingId || typeof listingId !== "string") {
        throw new Error("Invalid Id")
    }

    let favoriteIds = [...(currentUser.favouriteIds || [])]

    favoriteIds = favoriteIds.filter(id => id !== listingId)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds: favoriteIds
        }
    })

    if(!user) {
        return NextResponse.json({
            success: false,
            message: "Error in deleting favorites"
        }, {
            status: 401
        })
    }

    return NextResponse.json({
        success: true,
        message: "Favorite listing removed successfully",
        user
    }, { status: 200 })
}