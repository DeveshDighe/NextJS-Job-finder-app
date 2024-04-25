import { connectDB } from "@/BackendLogic/DbConfig";
import Jobapplication from "@/BackendLogic/models/application.model";
import { NextResponse } from "next/server";

export async function GET (req){
  connectDB()
  try {
    const allAplliedData =await Jobapplication.find().populate('user')

    return NextResponse.json({msg : 'fetched all Job Apllication', success : true, allAplliedData}, {status : 200})
  } catch (error) {
    return NextResponse.json({msg : 'Error in fetching all Job Apllication', success : false}, {status : 400})
  }
}