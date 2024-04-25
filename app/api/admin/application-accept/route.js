import { connectDB } from "@/BackendLogic/DbConfig";
import Jobapplication from "@/BackendLogic/models/application.model";
import { NextResponse } from "next/server";

export async function PATCH(req){
  connectDB()
  try {
    const {id } =await req.json();

    

    const appication = await Jobapplication.findById(id).populate('user')

    appication.status = "Accepted"

    appication.save()

    return NextResponse.json({msg : 'Application accepted', success : true, appication}, {status : 202})


  } catch (error) {
        return NextResponse.json({msg : 'Application accept failed', success : false} , {status : 400})
  }
}