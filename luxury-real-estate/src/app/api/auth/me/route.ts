import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ user: null });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        agencyName: true,
        phone: true,
        avatar: true,
        createdAt: true,
        favoriteProperties: {
          select: { id: true }
        },
        savedSearches: {
          select: { id: true }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        ...user,
        favoriteProperties: user.favoriteProperties.map(p => p.id),
        savedSearches: user.savedSearches.map(s => s.id),
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ user: null });
  }
}