import { createApplication } from "@/BackendLogic/Services/job.services";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(req){
  try {
    const applicationData = await req.json()
    const token =await req.headers ? req.headers.get('authorization').split(' ')[1] : null;
    // const token = req.headers.get('authorization').split(' ')[1];
    const GrossToken = await jwt.verify(token , process.env.SECRET_KEY)
    const userId = GrossToken.id
    const createdApplication =await createApplication(userId ,applicationData )

    return NextResponse.json({msg : 'Applied Successfully', success : true, createdApplication} ,{status : 201})
  } catch (error) {
    console.log(error , 'This is a error');
    return NextResponse.json({msg : 'Applly UnSuccess', success : false}, {status : 400})
  }
}