import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// Get user's favorites
export async function GET(req: NextRequest) {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ favorites: [] });
    }

    const token = req.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const favorites = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        favoriteProperties: {
          select: {
            id: true,
            title: true,
            price: true,
            currency: true,
            city: true,
            state: true,
            images: {
              where: { isMainImage: true },
              select: { url: true, alt: true }
            }
          }
        }
      }
    });

    return NextResponse.json({ favorites: favorites?.favoriteProperties || [] });
  } catch (error) {
    console.error('Get favorites error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Add/Remove favorite
export async function POST(req: NextRequest) {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const token = req.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { propertyId, action } = await req.json();

    if (!propertyId || !action || !['add', 'remove'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (action === 'add') {
      await prisma.user.update({
        where: { id: decoded.userId },
        data: {
          favoriteProperties: {
            connect: { id: propertyId }
          }
        }
      });
    } else {
      await prisma.user.update({
        where: { id: decoded.userId },
        data: {
          favoriteProperties: {
            disconnect: { id: propertyId }
          }
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}