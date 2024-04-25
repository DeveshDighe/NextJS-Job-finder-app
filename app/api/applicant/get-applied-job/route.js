import Jobapplication from "@/BackendLogic/models/application.model";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { connectDB } from "@/BackendLogic/DbConfig";



export async function GET(req) {
  connectDB()
  try {
    const token =await req.headers ? req.headers.get('authorization').split(' ')[1] : null;

    const GrossToken = await jwt.verify(token , process.env.SECRET_KEY)
    await connectDB()
    const userId = GrossToken.id
    const allAplliedData =await Jobapplication.find({user : userId}).populate('user')

    return NextResponse.json({msg : 'fetched all Job Apllication', success : true, allAplliedData}, {status : 200})
  } catch (error) {
    return NextResponse.json({msg : 'Error in fetching all Job Apllication', success : false}, {status : 400})
  }
}