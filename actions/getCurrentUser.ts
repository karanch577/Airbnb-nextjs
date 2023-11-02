import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";


export async function getCurrentUser() {
    try {
        const session = await getServerSession(authOptions)

        if(!session?.user?.email) return null

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if(!currentUser) return null;

        return currentUser;
        
    } catch (error: any) {
        return null
    }
}

export default getCurrentUser;