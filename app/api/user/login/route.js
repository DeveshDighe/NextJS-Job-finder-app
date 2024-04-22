import { getUser } from "@/BackendLogic/Services/user.services";
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const userData =await req.json()
    console.log('login');
    const user = await getUser(userData);
    const token = await jwt.sign({id : user._id}, process.env.SECRET_KEY, {expiresIn : '1d'})
    return NextResponse.json({user , msg : 'Login Successfull', success : true , token : token}, {status : 200});
  } catch (error) {
    console.log(error , 'login error');
    return NextResponse.json({ error: error.message }, {status : 400});
  }
}