import getListings from "@/utils/getListings";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const listings = await getListings({})

    return [
        {
            url: "https://karan-nextjs.vercel.app",
            lastModified: new Date()
        },
        ...listings.map(listing => ({
            url: `https://karan-nextjs.vercel.app/listings/${listing.id}`,
            lastModified: new Date()
        }))
    ]
}