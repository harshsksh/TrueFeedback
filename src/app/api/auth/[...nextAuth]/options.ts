import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { userAgent } from "next/server";
import { email } from "zod";
import { off } from "process";



export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            id : "credentials",
            name : "Credentials",
            credentials : {
                email : { label : "Email", type : "email", placeholder : "Enter your email"},
                password : { label : "Password", type : "password", placeholder : "Enter your password"}
            },
            async authorize(credentials : any): Promise<any> {
                await dbConnect();
                try{
                    const user = await UserModel.findOne({
                        $or : [
                            { email : credentials.identifier },
                            { username : credentials.identifier }
                        ]
                    })

                    if(!user){
                        throw new Error("No user found with the provided email or username")
                    }

                    if(!user.isVerified){
                        throw new Error("Please verify your email before logging in")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if(!isPasswordCorrect){
                        throw new Error("Invalid password")
                    }
                    return user;

                }

                catch(error){
                    throw new Error("Error connecting to database")
                }
            }
        })
    ],
    callbacks : {
        async jwt({ token, user }) {
            
            return token
        },
        async session({ session, token }) {
            return session
        }
    },
    pages : {
        signIn : "/sign-in"
    },
    session : {
        strategy : "jwt"
    },
    secret : process.env.NEXTAUTH_SECRET,

}