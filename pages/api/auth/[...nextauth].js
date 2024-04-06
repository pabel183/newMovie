import NextAuth from "next-auth";
import { compare } from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/GoogleProvider";


export default NextAuth({
    adapter: PrismaAdapter(prismadb),
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
        // }),
        Credentials({
            id:"credentials",
            name:"credentials",
            credentials:{
                email:{
                    label: "Email",
                    type: "text",
                },
                password:{
                    label: "Password",
                    type: "password",
                }
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Email and password required");
                }
                
                 const user=await prismadb.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                 });

                 if(!user || !user.hashedPassword){
                  throw new Error("Email does not exist");  
                 }

                const inCorrectPassword=await compare(credentials.password, user.hashedPassword);

                if(!inCorrectPassword){
                    throw new Error("Incorrect password")
                }

                return user;
            }
        })
    ],
    pages:{
        signIn:"/auth",
    },
    debug: process.env.NODE_ENV==="development",
    session:{
        strategy:"jwt",    
    },
    jwt:{
    secret:process.env.NEXTAUTH_JWT_SECRET,    
    },
    secret:process.env.NEXTAUTH_SECRET,

});