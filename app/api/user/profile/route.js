import { connectDB } from '@/BackendLogic/DbConfig';
import { getUserWithToken } from '@/BackendLogic/Services/jwt.service';
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';

export async function  GET(req) {
  connectDB()
  try {
    const token =await req.headers ? req.headers.get('authorization').split(' ')[1] : null;


    const GrossToken = await jwt.verify(token , process.env.SECRET_KEY)

    const userId = GrossToken.id
    const user =await getUserWithToken(userId)


    return NextResponse.json({success : true, user} ,{status : 200})
  } catch (error) {
    return NextResponse.json({ error: error.message } , {status : 400});
  }
}