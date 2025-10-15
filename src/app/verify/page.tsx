import { cookies } from 'next/headers';

export default function VerifyPage({ searchParams }: { searchParams: { token: string; email: string } }) {
  const token = searchParams.token;
  const email = searchParams.email;

  // TODO: Check token in DB, delete after use, create session
  if (/* token valid */) {
    cookies().set('auth-token', token, { httpOnly: true }); // Or use JWT/session lib
    return <p>Logged in successfully! Redirecting...</p>;
  }

  return <p>Invalid or expired link.</p>;
}
