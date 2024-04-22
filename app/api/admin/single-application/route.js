import { connectDB } from "@/BackendLogic/DbConfig";
import Jobapplication from "@/BackendLogic/models/application.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log('THISISISISIISISISISISISIISISISISISIISISISISISI');
  connectDB()
  try {
    const {id} =await req.json()
    console.log(id , 'This is backend id');
    const singleAppication =await Jobapplication.findById(id).populate('user')
    console.log(singleAppication , 'a;;;;;;;;');

    return NextResponse.json({msg : 'fetched singleAppication', success : true, singleAppication}, {status : 200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({msg : 'Error in fetching singleAppication', success : false} , {status : 400})
  }
}