import '@ant-design/v5-patch-for-react-19'
import './globals.css'
import AntdProvider from '@/contexts/AntdProvider'
import { HeroUIProvider } from '@heroui/system'
import { ThemeProvider } from 'next-themes'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Next.js Template',
    template: '%s | Next.js Template'
  },
  description:
    'A modern Next.js 15 starter template with Ant Design, Tailwind CSS, HeroUI, ESLint, Prettier, and Husky.',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Ant Design',
    'HeroUI',
    'Template',
    'SWR',
    'ESLint',
    'Prettier',
    'Husky',
    'Lint-Staged',
    'Vercel'
  ],
  authors: [{ name: 'KNguyen1411b', url: 'https://knguyen1411b.vercel.app' }],
  creator: 'KNguyen1411b',
  publisher: 'KNguyen1411b',
  openGraph: {
    title: 'Next.js Template',
    description:
      'A modern Next.js 15 starter template with Ant Design, Tailwind CSS, HeroUI, ESLint, Prettier, and Husky.',
    siteName: 'Next.js Template',
    locale: 'en_US',
    type: 'website'
  },
  icons: {
    icon: '/favicon.ico'
  },
  category: 'technology'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AntdProvider>
            <HeroUIProvider>{children}</HeroUIProvider>
          </AntdProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
