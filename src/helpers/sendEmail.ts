import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/emailVerification";
import { apiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
    email : string,
    username : string,
    verifyCode : string
) : Promise<apiResponse>{
    try{

        const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['hr392002@gmail.com'],
        subject: 'Verification Code',
        react: VerificationEmail({username, otp : verifyCode})
        });

        if (error) {
            console.error("Resend error:", error);
            return { success: false, message: "Failed to send verification email" };
        }

        return { success: true, message: "Verification email sent successfully" };
    }
    catch (error) {
        console.error(error, "Error sending verification email");
        return {success : false, message : "failed to send verification email"}
    }
}