import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, name } = body

    if (!email || !password) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const exists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (exists) {
      return new NextResponse('User already exists', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log('[REGISTER_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}