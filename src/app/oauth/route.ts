import { AUTH_COOKIE } from '@/features/auth/constants'
import { createAdminClient } from '@/lib/appwrite'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
 const userId = request.nextUrl.searchParams.get('userId')
 const secret = request.nextUrl.searchParams.get('secret')

 if (!userId || !secret) {
  return new NextResponse('Missing fields', { status: 400 })
 }

 const { account } = await createAdminClient()
 const session = await account.createSession(userId, secret)

 cookies().set(AUTH_COOKIE, session.secret, {
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 30, // 30 days
 })

 return NextResponse.redirect(`${request.nextUrl.origin}/`)
}