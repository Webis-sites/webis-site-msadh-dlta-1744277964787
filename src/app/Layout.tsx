import './globals.css';
import { Inter, Heebo } from 'next/font/google';
import { Metadata } from 'next';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

// Define fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const heebo = Heebo({
  subsets: ['hebrew'],
  display: 'swap',
  variable: '--font-heebo',
});

// Define metadata
export const metadata: Metadata = {
  title: 'מסעדה דלתא | חוויה קולינרית מיוחדת',
  description: 'מסעדה דלתא מציעה חוויה קולינרית ייחודית עם תפריט עשיר, אווירה נעימה ושירות מעולה. בואו לטעום ממגוון המנות המיוחדות שלנו.',
  keywords: 'מסעדה, אוכל, קולינריה, שף, תפריט, מנות מיוחדות, דלתא, מסעדה ישראלית',
  authors: [{ name: 'מסעדה דלתא' }],
  creator: 'מסעדה דלתא',
  publisher: 'מסעדה דלתא',
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://www.delta-restaurant.com',
    title: 'מסעדה דלתא | חוויה קולינרית מיוחדת',
    description: 'מסעדה דלתא מציעה חוויה קולינרית ייחודית עם תפריט עשיר, אווירה נעימה ושירות מעולה',
    siteName: 'מסעדה דלתא',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'מסעדה דלתא',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'מסעדה דלתא | חוויה קולינרית מיוחדת',
    description: 'מסעדה דלתא מציעה חוויה קולינרית ייחודית עם תפריט עשיר, אווירה נעימה ושירות מעולה',
    images: ['/images/twitter-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="he" dir="rtl" className={`${inter.variable} ${heebo.variable}`}>
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
        <div className="flex-grow flex flex-col">
          {/* Glass effect container for the entire layout */}
          <div className="fixed inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10" />
          
          {/* Navigation */}
          <header className="sticky top-0 z-50">
            <div className="backdrop-blur-md bg-white/70 border-b border-white/20 shadow-sm">
              <NavigationBar />
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
            {/* Neumorphic container for main content */}
            <div className="w-full h-full rounded-2xl bg-white/80 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_8px_20px_rgba(0,0,0,0.06)] p-6 md:p-8">
              {children}
            </div>
          </main>
          
          {/* Footer */}
          <footer className="mt-auto backdrop-blur-md bg-white/70 border-t border-white/20">
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  );
}