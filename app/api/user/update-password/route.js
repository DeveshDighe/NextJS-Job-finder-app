import { connectDB } from "@/BackendLogic/DbConfig";
import User from "@/BackendLogic/models/user.model";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

export async function POST(req){
  connectDB()

  try {
    const {useremail , userpassword} =await req.json();

    const user = await User.findOne({email : useremail})

    if (!user) {
      return NextResponse.json({error : 'Email is incorrect', success : false}, {status : 400})
    }


    const hashedPass = await bcrypt.hash(userpassword , 10)

    user.password = hashedPass;
    const updatedUser = await user.save();

    return NextResponse.json({msg: "Password is updated" , success :true,}, {status : 200})

  } catch (error) {
    return NextResponse.json({error : 'Unable to update password', success : false}, {status : 404})
  }
}