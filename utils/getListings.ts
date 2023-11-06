import prisma from "@/libs/prismadb"

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings({
    userId,
    guestCount,
    roomCount,
    bathroomCount,
    startDate,
    endDate,
    locationValue,
    category
}: IListingsParams) {
    let query: any = {};

    if(userId) {
        query.userId = userId
    }

    if(guestCount) {
        query.guestCount = {
            gte: +guestCount
        }
    }

    if(roomCount) {
        query.roomCount = {
            gte: +roomCount
        }
    }
    if(bathroomCount) {
        query.bathroomCount = {
            gte: +bathroomCount
        }
    }

    if(category) {
        query.category = category
    }

    if(locationValue) {
        query.locationValue = locationValue
    }

    if(startDate && endDate) {
        query.NOT = {
            reservations: {
                some: {
                    OR: [
                        {
                            endDate: {gte: startDate},
                            startDate: {lte: startDate}
                        },
                        {
                            startDate: {lte: endDate},
                            endDate: {gte: endDate}
                        }
                    ]
                }
            }
        }
    }

    try {
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc"
            }
        })

        return listings;
    } catch (error: any) {
        throw new Error(error)
    }
}