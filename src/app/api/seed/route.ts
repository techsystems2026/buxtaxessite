import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'
import { runSeed } from '@/lib/seed'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })

    console.log('Checking for users...')
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (users.docs.length === 0) {
      console.log('Creating admin user...')
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@buxtaxes.kz',
          password: 'admin-password-123',
        },
      })
    }

    console.log('Running data seed...')
    await runSeed(payload)

    return NextResponse.json({
      success: true,
      message: 'Database initialized and seeded successfully. Admin: admin@buxtaxes.kz / admin-password-123'
    })
  } catch (error: unknown) {
    console.error('Seed error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    const stack = error instanceof Error ? error.stack : undefined
    return NextResponse.json({
      success: false,
      error: message,
      stack: stack
    }, { status: 500 })
  }
}
