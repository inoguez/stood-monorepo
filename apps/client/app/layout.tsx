import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stood',
  description: 'Real time chat',
};

export default function RootLayout({
  sidebar,
  chat,
}: Readonly<{
  sidebar: React.ReactNode;
  chat: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          inter.className,
          'bg-neutral-800 flex gap-4 min-h-screen p-4 text-neutral-400'
        )}
      >
        {sidebar}
        {chat}
      </body>
    </html>
  );
}
