import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Mock successful login response
    const mockUser = {
      id: '1',
      email: email.toLowerCase(),
      firstName: 'John',
      lastName: 'Doe',
      agencyName: 'Premium Realty',
      phone: null,
      avatar: null,
      createdAt: new Date().toISOString(),
      favoriteProperties: [],
      savedSearches: [],
    };

    // Mock token
    const token = 'mock-jwt-token';

    const response = NextResponse.json({
      user: mockUser,
      token
    });

    // Set mock cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}