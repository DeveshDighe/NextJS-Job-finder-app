import { connectDB } from "@/BackendLogic/DbConfig"
import { createJob } from "@/BackendLogic/Services/admin.services"
import { NextResponse } from "next/server"


export async function POST(req){
  connectDB()
  try {
    const jobData = await req.json()
    const NewJob = await createJob(jobData)

    return NextResponse.json({msg: 'job created', success : true, createdJob : NewJob},{status :200})
  } catch (error) {
    console.log(error , 'This is error');
    return NextResponse.json({msg : 'Error in Job creation' , success : false},{status :400})
  }
}