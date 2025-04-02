import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notion Clone',
  description: 'Your custom Notion-style app',
  icons: {
    icon: [
      { url: '/logo.svg' },
      { media: '(prefers-color-scheme: dark)', url: '/logo-dark.svg' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
