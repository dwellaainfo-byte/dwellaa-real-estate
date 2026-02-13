import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth-token')?.value;
    
    if (!token || token === 'mock-jwt-token') {
      // Return mock user for demo purposes
      if (token === 'mock-jwt-token') {
        const mockUser = {
          id: '1',
          email: 'demo@example.com',
          firstName: 'John',
          lastName: 'Doe',
          agencyName: 'Premium Realty',
          phone: null,
          avatar: null,
          createdAt: new Date().toISOString(),
          favoriteProperties: [],
          savedSearches: [],
        };

        return NextResponse.json({ user: mockUser });
      }
      
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: null });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ user: null });
  }
}