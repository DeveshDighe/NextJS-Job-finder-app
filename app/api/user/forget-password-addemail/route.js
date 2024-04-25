const { default: OTP } = require("@/BackendLogic/models/otp.model");
import { connectDB } from '@/BackendLogic/DbConfig';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'


export async function POST(req){
  connectDB()
  try {
    const {useremail} =await req.json();

    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    const createdOtp = await OTP({
      email : useremail,
      otpNumber : randomNumber
    })

    createdOtp.save()

    const trasporter = nodemailer.createTransport({
      service : 'gmail',
      auth : {
        user : process.env.ADMINEMAIL,
        pass : process.env.ADMINPASS,
      }
    })

    const mailOptions = {
      from : process.env.ADMINEMAIL,
      to : useremail,
      subject : "Reset forgot password",
      html: `<p style="font-size: medium;">Enter This <span style="color: blue;">${randomNumber}</span> in otp field of reset password</p>`
    }

    
    await trasporter.sendMail(mailOptions).then(()=>{
      console.log('Mail successfully send');
    })
    .catch((err)=>{
      console.log('Error', err);
    })
    console.log('Generated email', mailOptions);

    return NextResponse.json({msg: 'OTP sent on email', success : true}, {status : 200})
  } catch (error) {
    console.log(error, 'This is forget pass error');
    return NextResponse.json({msg: "Email can not send", success : false}, {status : 400})
  }
}