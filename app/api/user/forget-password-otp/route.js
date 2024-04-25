import { connectDB } from "@/BackendLogic/DbConfig";
import OTP from "@/BackendLogic/models/otp.model";
import User from "@/BackendLogic/models/user.model";
import { NextResponse } from "next/server";


export async function POST(req){
  connectDB()
  try {
    const {useremail , userotp} =await req.json();


    const isEmailExist = await User.findOne({email : useremail})

    if (!isEmailExist) {
      return NextResponse.json({error : 'Email is incorrect', success : false}, {status : 400})
    }

  
    const isOtpCorrect = await OTP.findOne({otpNumber : userotp , email : useremail})

    if (!isOtpCorrect) {
      return NextResponse.json({error : 'Otp is incorrect', success : false}, {status : 403})
    }
   

    // const removeOtp = await OTP.findByIdAndDelete(isOtpCorrect._id)

    return NextResponse.json({msg: "Enter new password" , success :true}, {status : 200})

  } catch (error) {
    console.log(error, 'add otp error');
    return NextResponse.json({error : 'Otp is incorrect',err : error, success : false}, {status : 404})
  }
}