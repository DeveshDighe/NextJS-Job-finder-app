import { connectDB } from "@/BackendLogic/DbConfig";
import Jobapplication from "@/BackendLogic/models/application.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  connectDB()
  try {
    const {id} =await req.json()
    const singleAppication =await Jobapplication.findById(id).populate('user')

    return NextResponse.json({msg : 'fetched singleAppication', success : true, singleAppication}, {status : 200})
  } catch (error) {
    return NextResponse.json({msg : 'Error in fetching singleAppication', success : false} , {status : 400})
  }
}