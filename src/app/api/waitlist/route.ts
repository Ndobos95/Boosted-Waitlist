import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Get request metadata for analytics
    const userAgent = request.headers.get('user-agent') || ''
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ipAddress = forwarded?.split(',')[0] || realIp || 'unknown'
    const referrer = request.headers.get('referer') || ''

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert([
        {
          email: email.toLowerCase().trim(),
          user_agent: userAgent,
          ip_address: ipAddress,
          referrer: referrer,
          source: 'landing_page'
        }
      ])
      .select()

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already registered', alreadyRegistered: true },
          { status: 409 }
        )
      }
      
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to add to waitlist' },
        { status: 500 }
      )
    }

    // Send welcome email
    try {
      const emailResult = await resend.emails.send({
        from: 'Boosted <noreply@boosted.band>',
        to: [email],
        subject: "You're on the Boosted waitlist! 🎉",
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; font-size: 32px; font-weight: bold; margin: 0;">Boosted</h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 10px 0 0 0;">Band Booster Software</p>
            </div>
            
            <div style="background: white; padding: 40px 20px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 20px 0;">Welcome to the waitlist! 🎉</h2>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for your interest in Boosted! We're building something special to help band boosters like you streamline fundraising, manage payments, and improve communication.
              </p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0 0 15px 0;">What's coming:</h3>
                <ul style="color: #4b5563; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">Smart fundraising campaign management</li>
                  <li style="margin-bottom: 8px;">Seamless online payment processing</li>
                  <li style="margin-bottom: 8px;">Enhanced parent-student communication tools</li>
                  <li style="margin-bottom: 8px;">Automated reporting and analytics</li>
                </ul>
              </div>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                We'll keep you updated on our progress and let you know as soon as we're ready to launch. In the meantime, feel free to reach out if you have any questions or suggestions!
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                  Built by band parents, for band parents
                </p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                You're receiving this email because you signed up for the Boosted waitlist.
              </p>
            </div>
          </div>
        `
      })

      // Update the record to mark email as sent
      await supabaseAdmin
        .from('waitlist')
        .update({ email_sent: true })
        .eq('id', data[0].id)

      console.log('Email sent successfully:', emailResult.data?.id)
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't fail the request if email fails - user is still on waitlist
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist',
      data: { id: data[0].id, email: data[0].email }
    })

  } catch (error) {
    console.error('Waitlist signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint for analytics (optional)
export async function GET() {
  try {
    const { count, error } = await supabaseAdmin
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Analytics error:', error)
      return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 })
    }

    return NextResponse.json({ totalSignups: count || 0 })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}