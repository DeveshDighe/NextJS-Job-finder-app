import { createApplication } from "@/BackendLogic/Services/job.services";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(req){
  console.log('gggg');
  try {
    const applicationData = await req.json()
    const token = req.headers.get('authorization').split(' ')[1];
    console.log(token, 'authorizationHeaderValue');
    const GrossToken = await jwt.verify(token , process.env.SECRET_KEY)
    console.log(GrossToken , 'GrossToken');
    const userId = GrossToken.id
    const createdApplication =await createApplication(userId ,applicationData )
    console.log(createdApplication, 'createdApplications');

    return NextResponse.json({msg : 'Applied Successfully', success : true, createdApplication} ,{status : 201})
  } catch (error) {
    return NextResponse.json({msg : 'Applly UnSuccess', success : false}, {status : 400})
  }
}