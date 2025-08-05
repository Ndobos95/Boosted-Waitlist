import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    // Get total signups
    const { data: totalData, error: totalError } = await supabaseAdmin
      .from('waitlist')
      .select('count(*)')
      .single()

    if (totalError) {
      console.error('Total count error:', totalError)
      return NextResponse.json({ error: 'Failed to get total count' }, { status: 500 })
    }

    // Get signups by day for the last 30 days
    const { data: dailyData, error: dailyError } = await supabaseAdmin
      .from('waitlist')
      .select('created_at')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: true })

    if (dailyError) {
      console.error('Daily data error:', dailyError)
      return NextResponse.json({ error: 'Failed to get daily data' }, { status: 500 })
    }

    // Group by date
    const dailySignups = dailyData.reduce((acc: Record<string, number>, row) => {
      const date = new Date(row.created_at).toISOString().split('T')[0]
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {})

    // Get email sent statistics
    const { data: emailStats, error: emailError } = await supabaseAdmin
      .from('waitlist')
      .select('email_sent')

    if (emailError) {
      console.error('Email stats error:', emailError)
      return NextResponse.json({ error: 'Failed to get email stats' }, { status: 500 })
    }

    const emailsSent = emailStats.filter(row => row.email_sent).length
    const emailsNotSent = emailStats.length - emailsSent

    return NextResponse.json({
      totalSignups: totalData.count,
      dailySignups,
      emailStats: {
        sent: emailsSent,
        notSent: emailsNotSent,
        successRate: emailStats.length > 0 ? (emailsSent / emailStats.length * 100).toFixed(1) : 0
      },
      last30Days: Object.keys(dailySignups).length
    })

  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}