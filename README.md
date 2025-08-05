# Boosted Waitlist - Band Booster Software

A beautiful, fully-functional waitlist landing page for Boosted, a band booster management platform.

## Features

- 🎨 **Modern UI** - Built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn/ui
- 📧 **Email Collection** - Full waitlist signup with Supabase database storage
- ✉️ **Automated Emails** - Welcome emails sent via Resend
- 📊 **Analytics** - Vercel Analytics + Google Analytics + custom analytics API
- 🛡️ **Error Handling** - Comprehensive error states and duplicate email detection
- 📱 **Responsive** - Mobile-first design that works on all devices
- 🚀 **Production Ready** - Optimized for deployment on Vercel

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **Analytics**: Vercel Analytics, Google Analytics
- **Icons**: Lucide React

## Setup Instructions

### 1. Environment Variables

Copy the `.env.local` file and fill in your credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend Email Configuration
RESEND_API_KEY=your_resend_api_key

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS=your_google_analytics_id
```

### 2. Supabase Setup

1. Create a new Supabase project
2. Run the SQL from `sql/waitlist-table.sql` in your Supabase SQL Editor
3. This will create the `waitlist` table with proper RLS policies

### 3. Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain or use their sandbox domain for testing
3. Get your API key from the dashboard
4. Update the `from` field in the API route to match your verified domain

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

## What Happens When Someone Joins the Waitlist

1. **Form Submission** - User enters email and clicks "Join Waitlist"
2. **API Processing** - Email is sent to `/api/waitlist` endpoint
3. **Database Storage** - Email stored in Supabase with metadata (IP, user agent, referrer)
4. **Email Sent** - Automated welcome email sent via Resend
5. **Success State** - User sees confirmation message
6. **Analytics Tracking** - Event tracked in Google Analytics and Vercel Analytics
7. **Duplicate Detection** - Returns friendly error if email already exists

## Analytics

The system provides comprehensive analytics:

- **Real-time tracking** via Vercel Analytics
- **Google Analytics** events for conversions
- **Custom analytics API** at `/api/analytics` showing:
  - Total signups
  - Daily signup trends (last 30 days)
  - Email delivery success rates
  - User metadata for insights

## API Endpoints

- `POST /api/waitlist` - Add email to waitlist
- `GET /api/waitlist` - Get total signup count
- `GET /api/analytics` - Get detailed analytics

## Database Schema

The `waitlist` table includes:
- `id` - UUID primary key
- `email` - Unique email address
- `created_at` - Signup timestamp
- `updated_at` - Last modified timestamp
- `email_sent` - Boolean flag for email delivery
- `source` - Traffic source tracking
- `user_agent` - Browser information
- `ip_address` - User IP (for geographic insights)
- `referrer` - Referring URL

## Deployment

This project is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Email Template

The welcome email includes:
- Branded header with gradient design
- Welcome message and feature preview
- Professional styling with your brand colors
- Unsubscribe compliance text

## Security Features

- Row Level Security (RLS) enabled on Supabase
- Input validation and sanitization
- Rate limiting ready (can be added with Vercel)
- CSRF protection via Next.js
- Environment variable protection

## Customization

- Update brand colors in `tailwind.config.js`
- Modify email template in `/api/waitlist/route.ts`
- Customize copy and messaging in `page.tsx`
- Add more analytics events as needed

## Support

Built with ❤️ for band boosters nationwide. For questions or support, reach out to the development team.