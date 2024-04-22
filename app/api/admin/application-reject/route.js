import Jobapplication from "@/BackendLogic/models/application.model";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'

export async function PATCH(req) {
  try {
    const {id , rejectReason} =await req.json();

    // const FrontToken = req.token;
    // const GrossToken = await jwt.verify(FrontToken , process.env.SECRET_KEY)
    // console.log(GrossToken , 'GrossToken');
    // const userId = GrossToken.id
    // const user =await getUserWithToken(userId)

    console.log(id , rejectReason);

    const appication = await Jobapplication.findById(id).populate('user')

    appication.status = "Rejected"
    appication.rejectReason = rejectReason;

    const trasporter = nodemailer.createTransport({
      service : 'gmail',
      auth : {
        user : process.env.ADMINEMAIL,
        pass : process.env.ADMINPASS,
      }
    })
    console.log('11');

    const mailOptions = {
      from: process.env.ADMINEMAIL,
      to: appication.user.email,
      subject: "Your Application Is Rejected",
      html: `
        <p style="font-size: medium;">Dear ${appication.user.name},</p>
        <p style="font-size: medium;">We are sorry to inform you that your application has been rejected due to the following reason:</p>
        <p style="font-size: medium; color: red;">${rejectReason}</p>
        <p style="font-size: medium;">If you have any further inquiries or would like to discuss this matter further, please feel free to contact us.</p>
      `
    };
    

    console.log('2');
    
    trasporter.sendMail(mailOptions).then(()=>{
      console.log('Mail successfully send');
    })
    .catch((err)=>{
      console.log('Error', err);
    })

    appication.save()

    return NextResponse.json({msg : 'Application rejected', success : true, appication}, {status : 202})


  } catch (error) {
        return NextResponse.json({msg : 'Application rejection fails', success : false}, {status : 400})
  }
}