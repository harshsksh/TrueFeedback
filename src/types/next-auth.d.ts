import 'next-auth'

declare module 'next-auth' {
    interface User{
        _id? : string;
        isVerified? : boolean;
        isAcceptingMessage? : boolean;
        username? : string;
    }
    interface Session {
        user : {
            _id? : string;
            isVerified? : boolean;
            isAcceptingMessage? : boolean;
            username? : string;
        } & DefaultSession["user"]
    }
}

// User and Session are defined inside the next-auth package, but JWT is defined inside a completely separate package next-auth/jwt:
// previous method : it creates a NEW empty interface it does NOT extend the real JWT


declare module 'next-auth/jwt' {
    interface JWT {
        _id? : string;
        isVerified? : boolean;  
        isAcceptingMessage? : boolean;
        username? : string;
    }
}