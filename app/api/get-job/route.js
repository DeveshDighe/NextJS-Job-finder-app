import { connectDB } from "@/BackendLogic/DbConfig";
import { getAllJobs } from "@/BackendLogic/Services/job.services";
import { NextResponse } from "next/server";




export async function GET(res){
  await connectDB()
  console.log('ssss');
    try {
      const allJobs = await getAllJobs()
      // console.log(allJobs, 'allllll');
      return NextResponse.json({msg: 'all lectures fetched', allJobs , success : true}, {status : 200})
    } catch (error) {
      return NextResponse.json({msg: 'Error in lectures fetching', error ,  success : true}, {status : 400})
    }
}