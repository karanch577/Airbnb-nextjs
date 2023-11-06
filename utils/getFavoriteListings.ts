import getCurrentUser from "./getCurrentUser";
import prisma from "@/libs/prismadb";

export default async function getFavoriteListings() {
    try {
        const currentUser = await getCurrentUser()

        if(!currentUser) return [];
    
        const listings = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favouriteIds || [])]
                }
            }
        })
    
        return listings;
    } catch (error: any) {
        throw new Error(error)
    }
}