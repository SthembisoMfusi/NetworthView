/**
 * Plaid Link Token Creation API
 * 
 * POST /api/plaid/create-link-token - Initialize Plaid Link flow
 */

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  void request;
  try {
    // TODO: Implement Link token creation
    // 1. Get authenticated user
    // 2. Create Plaid client
    // 3. Call Plaid linkTokenCreate
    // 4. Return link_token
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const linkToken = await plaidClient.linkTokenCreate({
      user: { client_user_id: session.user.id },
    })
    return NextResponse.json({ success: true, data: linkToken })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create link token' }, { status: 500 })
  }
}

