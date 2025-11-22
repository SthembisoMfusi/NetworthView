/**
 * Single Category API Route Handler
 * 
 * PUT /api/categories/[id] - Update a category
 * DELETE /api/categories/[id] - Delete a category
 */

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'
 

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  void request; void context;
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await context.params
    const category = await prisma.category.findUnique({
      where: { id, userId: session.user.id },
    })
    if (!category) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: category })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch category' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  void request; void context;
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await context.params
    const { name } = await request.json()
    const category = await prisma.category.update({
      where: { id, userId: session.user.id },
      data: { name },
    })
    return NextResponse.json({ success: true, data: category })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  void request; void context;
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await context.params
    const category = await prisma.category.delete({
      where: { id, userId: session.user.id },
    })
    return NextResponse.json({ success: true, data: category })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete category' }, { status: 500 })
  }
}

function getServerSession(authOptions: NextAuthConfig) {
  throw new Error('Function not implemented.');
}

