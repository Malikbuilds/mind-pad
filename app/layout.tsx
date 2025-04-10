import { ThemeProvider } from '@/components/ui/providers/theme-provider';
import '@/app/globals.css';
import type { Metadata } from 'next';
import { ConvexClientProvider } from '@/components/ui/providers/convex-provider';
import { Toaster } from "sonner";
import { ModalProvider } from '@/components/ui/providers/modal-provider';
import { EdgeStoreProvider } from '@/lib/edgestore';

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
    <html lang="en" className="mindpad-theme" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <EdgeStoreProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="mindpad-theme"
        >
              <Toaster position="bottom-center"/>
              <ModalProvider />
            {children}
          </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
        </body>
    </html>
  );
}
