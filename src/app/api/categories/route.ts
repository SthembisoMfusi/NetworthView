/**
 * Categories API Route Handler
 * 
 * This route handles category CRUD operations:
 * - GET /api/categories - List all user's categories
 * - POST /api/categories - Create a new category
 */

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'
 

export async function GET(request: NextRequest) {
  void request;
  try {
    
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const categories = await prisma.category.findMany({
      where: { userId: session.user.id },
    })
    return NextResponse.json({ success: true, data: categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  void request;
  try {
    
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const { name } = await request.json()
    const category = await prisma.category.create({
      data: {
        name,
        userId: session.user.id,
      },
    })
    return NextResponse.json({ success: true, data: category })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ success: false, error: 'Failed to create category' }, { status: 500 })
  }
}

function getServerSession(authOptions: NextAuthConfig) {
  throw new Error('Function not implemented.');
}

