import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendEmail";
import { success } from "zod";

export async function POST(request : Request) {
    await dbConnect()

    try{
        const { username, email, password } = await request.json()

        // Check if user already exists
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified : true
         })

         if(existingUserVerifiedByUsername){
            return Response.json({
                success : false,
                message : "Username already exists"
            }, { status : 400})
        }

        const existingUserByEmail = await UserModel.findOne({email})

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

         if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success : false,
                    message : "Email already exists"
                }, { status : 400})
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hours from now
                await existingUserByEmail.save()
            }
        }

        else{
            const hashedPassword = await bcrypt.hash(password, 10)  
            const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hours from now

            const newUser = new UserModel({
                username : username,
                email : email,
                password : hashedPassword,
                verifyCode,
                verifyCodeExpiry : expiresAt,
                isVerified : false,
                isAcceptingMessage : true,
                message : []
            })

            await newUser.save()

        }

        // send verification email

        const emailResponse = await sendVerificationEmail(email, username, verifyCode)

        if(!emailResponse.success){
            return Response.json({
                success : false,
                message : emailResponse.message || "Failed to send verification email"
            }, { status : 500})
        }

        return Response.json({
            success : true,
            message : "User registered successfully. Please check your email for verification code."
        }, { status : 201})
    }
    catch (error){
        console.error(error, "Error while registering user")
        return Response.json({
            success : false,
            message : "Error registering user",
        },
        {
        status : 500
        }
    )
    }
}