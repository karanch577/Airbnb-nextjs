import getCurrentUser from "@/utils/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body;

    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return NextResponse.json({
            success: false,
            message: "User does not exist",
        }, {
            status: 404
        })
    }

    // checking if any of the fields is empty
    Object.keys(body).forEach((item: any) => {
        if(!body[item]) {
            return NextResponse.json({
                success: false,
                message: "User does not exist",
            }, {
                status: 404
            })
        }
    })

    // creating the listing
    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    })

    if(!listing) {
        return NextResponse.json({
            success: false,
            message: "Error in list creation",
        }, {
            status: 401
        })
    }

    return NextResponse.json({
        success: true,
        message: "Listing created successfully",
        listing
    }, {
        status: 200
    })

}