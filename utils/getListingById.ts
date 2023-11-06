import prisma from "@/libs/prismadb";

export default async function getListingById(listingId: string) {
    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        })

        if(!listing) {
            return null;
        }

        return listing;
    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}