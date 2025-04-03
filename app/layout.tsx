import { ThemeProvider } from '@/components/ui/providers/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
import { ConvexClientProvider } from '@/components/ui/providers/convex-provider';

export const metadata = {
  title: 'MindPad',
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            storageKey="mindpad-theme"
            >
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
        </body>
    </html>
  );
}
