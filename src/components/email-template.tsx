"use client";

import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  magicLink: string;
}

export function EmailTemplate({ firstName, magicLink }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Welcome, {firstName}!</h1>
      <p>Click the link below to sign in securely (this magic link expires in 15 minutes):</p>
      <a href={magicLink} style={{ color: '#3B82F6', textDecoration: 'none', fontWeight: 'bold' }}>
        Sign In Now
      </a>
      <p>If you didn&apos;t request this, ignore this email.</p>
    </div>
  );
}
