import Jobapplication from "@/BackendLogic/models/application.model";
import { NextResponse } from "next/server";

export async function GET (req){
  try {
    const allAplliedData =await Jobapplication.find().populate('user')
    console.log(allAplliedData , 'a;;;;;;;;');

    return NextResponse.json({msg : 'fetched all Job Apllication', success : true, allAplliedData}, {status : 200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({msg : 'Error in fetching all Job Apllication', success : false}, {status : 400})
  }
}