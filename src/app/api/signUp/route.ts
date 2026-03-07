import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendEmail";
import { success } from "zod";

export async function POST(request : Request) {
    await dbConnect()

    try{
        const {username, email, password} = await request.json()
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