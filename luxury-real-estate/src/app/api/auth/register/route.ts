import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, agencyName, phone } = body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mock user creation
    const mockUser = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      firstName,
      lastName,
      agencyName: agencyName || null,
      phone: phone || null,
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
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}