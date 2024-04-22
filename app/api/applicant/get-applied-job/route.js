import Jobapplication from "@/BackendLogic/models/application.model";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { connectDB } from "@/BackendLogic/DbConfig";



export async function GET(req) {
  try {
    const token =await req.headers ? req.headers.get('authorization').split(' ')[1] : null;

    console.log(token , 'TOKENTOKENTOKEN');
    const GrossToken = await jwt.verify(token , process.env.SECRET_KEY)
    console.log(GrossToken , 'GrossToken');
    await connectDB()
    const userId = GrossToken.id
    console.log(userId, 'This is useId');
    const allAplliedData =await Jobapplication.find({user : userId}).populate('user')
    console.log(allAplliedData , 'a;;;;;;;;');

    return NextResponse.json({msg : 'fetched all Job Apllication', success : true, allAplliedData}, {status : 200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({msg : 'Error in fetching all Job Apllication', success : false}, {status : 400})
  }
}