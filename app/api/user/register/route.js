import { connectDB } from "@/BackendLogic/DbConfig";

const { createUser } = require("@/BackendLogic/Services/user.services");
const { NextResponse } = require("next/server");


export async function POST(req){
  connectDB()
  try {
    const userData =await req.json()
    const user = await createUser(userData);
    return NextResponse.json({user , msg : 'User Registerd', success : true }, {status : 201});
  } catch (error) {
    return NextResponse.json({ error: error.message } , {status : 400});
  }
}  