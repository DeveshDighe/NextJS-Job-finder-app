import User from "@/BackendLogic/models/user.model";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

export async function POST(req){

  try {
    const {useremail , userpassword} =await req.json();
    console.log('2222' , useremail, '3dsfsf', userpassword);

    const user = await User.findOne({email : useremail})
    console.log(user, 'user');

    if (!user) {
      return NextResponse.json({error : 'Email is incorrect', success : false}, {status : 400})
    }


    const hashedPass = await bcrypt.hash(userpassword , 10)

    user.password = hashedPass;
    const updatedUser = await user.save();

    return NextResponse.json({msg: "Password is updated" , success :true,}, {status : 200})

  } catch (error) {
    console.log(error);
    return NextResponse.json({error : 'Unable to update password', success : false}, {status : 404})
  }
}