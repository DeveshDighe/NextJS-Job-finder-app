import OTP from "@/BackendLogic/models/otp.model";
import User from "@/BackendLogic/models/user.model";
import { NextResponse } from "next/server";


export async function POST(req){
  console.log('1111');
  try {
    const {useremail , userotp} =await req.json();
    console.log('2222' , useremail, userotp);

    const isEmailExist = await User.findOne({email : useremail})

    if (!isEmailExist) {
      return NextResponse.json({error : 'Email is incorrect', success : false}, {status : 400})
    }

    console.log(useremail, 'userEmail', userotp, 'userOTp');
    const isOtpCorrect = await OTP.findOne({otpNumber : userotp , email : useremail})

    if (!isOtpCorrect) {
      return NextResponse.json({error : 'Otp is incorrect', success : false}, {status : 403})
    }
    console.log(isOtpCorrect , 'ha correct hai');

    const removeOtp = await OTP.findByIdAndDelete(isOtpCorrect._id)

    return NextResponse.json({msg: "Enter new password" , success :true}, {status : 200})

  } catch (error) {
    return NextResponse.json({error : 'Otp is incorrect', success : false}, {status : 404})
  }
}