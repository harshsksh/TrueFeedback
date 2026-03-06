import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content : string;
    createdAt : Date;   
}


const messageSchema = new Schema<Message>({
    content : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now,
        required : true
    }
})

export interface User extends Document {
    username : string;
    email : string;
    password : string;
    verifyCode : string;
    verifyCodeExpiry : Date;
    isVerified : boolean;
    isAcceptingMessage : boolean;
    message : Message[];
}

const userSchema = new Schema<User>({
    username : {
        type : String,
        required : [true, "Username is required"],
        unique : true,
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : true,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Use a valid email address"]
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        
    },
    verifyCode : {
        type : String,
        required : [true, "Verification code is required"]
    },
    verifyCodeExpiry : {
        type : Date,
        required : [true, "Verification code expiry is required"]
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAcceptingMessage : {
        type : Boolean,
        default : true
    },
    message : [messageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", userSchema));

export default UserModel;
