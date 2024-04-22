import { getUserWithToken } from '@/BackendLogic/Services/jwt.service';
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';

export async function  GET(req) {
  try {
    const token = req.headers.get('authorization').split(' ')[1];
    console.log(token, 'authorizationHeaderValue');
    const GrossToken = await jwt.verify(token , process.env.SECRET_KEY)
    console.log(GrossToken , 'GrossToken');
    const userId = GrossToken.id
    const user =await getUserWithToken(userId)
    console.log(user , 'This is user');

    return NextResponse.json({success : true, user} ,{status : 200})
  } catch (error) {
    NextResponse.json({ error: error.message } , {status : 400});
  }
}