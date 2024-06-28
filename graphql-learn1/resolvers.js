import { quotes_data, users_data } from "./fakedb.js";
import { randomBytes } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config.js";

const User = mongoose.model("User")

const resolvers = {
    Query:{
        first:()=>"Hello World",
        users:()=>users_data,
        user:(_, args)=>users_data.find(user=>user._id == args._id),
        quotes:()=>quotes_data,
        quote:(_, { id })=>quotes_data.find(quote=>quote.by == id)
    },
    User:{
        quotes:(ur_data)=>quotes_data.filter(quote=>quote.by == ur_data._id)
    },
    Mutation:{
        signupUser: async (_,{userNew})=>{
            const user = await User.findOne({email:userNew.email})
            if(user) {
                throw new Error("Email already Exist")
            } else {
                const hashedPassword = await bcrypt.hash(userNew.password, 12)

                const newuser = new User({
                    ...userNew,
                    password: hashedPassword
                })

                return await newuser.save()
            }

        //     const _id = randomBytes(5).toString("hex")
        //     users_data.push({
        //         _id,
        //         ...userNew
        //     })
        //    return users_data.find(user=>user._id == _id)
       },
       signInUser: async (_,{userSignin})=>{
            const user = await User.findOne({email:userSignin.email})
            if(!user) {
                throw new Error("Email not Exist")
            } else {
                const checkPassword = await bcrypt.compare(userSignin.password, user.password)
                if(!checkPassword) {
                    throw new Error("Email or Password doesn't match");
                } else {
                    const token = jwt.sign({userId: user._id}, JWT_SECRET)
                    return {token}
                }
            }
        }
    }
}

export default resolvers;