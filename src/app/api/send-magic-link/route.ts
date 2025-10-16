// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template'; // Adjust path as needed
import { randomUUID } from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { email, firstName } = await request.json();

    // Generate a simple token (store in DB/session for verification later)
    const token = randomUUID();
    const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}&email=${encodeURIComponent(email)}`; // e.g., http://localhost:3000/verify?...

    const { data, error } = await resend.emails.send({
      from: 'Jerry Rubin <jerry@callauditors.com>', // Verified sender in Resend dashboard
      to: [email],
      subject: 'Your Magic Sign-In Link',
      react: EmailTemplate({ firstName: firstName || 'there', magicLink }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // TODO: Store token in DB with expiration (e.g., 15 min) for verification



    return NextResponse.json({ message: 'Magic link sent!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
