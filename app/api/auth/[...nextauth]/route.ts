import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma  from "@/libs/prismadb"
import { Adapter } from "next-auth/adapters"
import { AuthOptions } from "next-auth"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_SECRET_ID as string
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string
      }),
      CredentialsProvider({
        name: "credentials",
        credentials: {
            email: { label: "email", type: "text" },
            password: { label: "password", type: "password"}
        },
        async authorize(credentials) {
            if(!credentials?.email || !credentials?.password) {
                throw new Error("Invalid credentials input")
            }

            const user = await prisma.user.findUnique({
                where: {
                    email: credentials?.email
                }
            })

            if(!user || !user?.hashedPassword) {
                throw new Error("Invalid credentials hashedPassword")
            }

            const isCorrectPassword = await bcrypt.compare(
                // @ts-ignore
                credentials.password,
                user.hashedPassword
            )

            if(!isCorrectPassword) {
                throw new Error("Invalid credentials isCorrectPassword")
            }

            return user;
        }
      })
    ],
    pages: {
        signIn: "/"
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
  }

const handler =  NextAuth(authOptions)

export { handler as GET, handler as POST };