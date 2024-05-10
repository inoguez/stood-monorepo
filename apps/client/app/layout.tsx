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
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, '')}>
        <div
          vaul-drawer-wrapper=''
          className='flex gap-4 min-h-screen p-4 bg-neutral-800 text-neutral-400 '
        >
          {children}
        </div>
      </body>
    </html>
  );
}
