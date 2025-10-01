/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import ThemeSwitcher from '@/components/ThemeSwitcher'
import pkg from '../package.json'
import { Button as BtnUI } from '@heroui/button'
import { useNotify } from '@/contexts/AntdProvider'
import { useCounter } from '@mantine/hooks'
import useSWR from 'swr'
import { GithubFilled } from '@ant-design/icons'

/**
 * Fetcher function for SWR
 * - A simple wrapper around fetch to return JSON data
 * @param url The API endpoint to fetch
 * @returns Promise resolving to JSON data
 */
const fetcher = (url: string) => fetch(url).then((res) => res.json())

/**
 * Header Component
 * - Displays the application title with an icon
 * - Includes a ThemeSwitcher for toggling light/dark mode
 * - Fixed at the top with backdrop blur and shadow
 */
const Header = () => (
  <header className="fixed h-20 top-0 left-0 w-full bg-white/20 dark:bg-gray-900/20 backdrop-blur-md shadow px-8 z-50 flex justify-between items-center transition-colors duration-300">
    <h1 className="text-xl font-semibold flex items-center gap-2">
      {/* GitHub icon for branding */}
      <GithubFilled className="text-indigo-500" />
      Next.js Template
    </h1>
    {/* Theme toggle button */}
    <ThemeSwitcher />
  </header>
)

/**
 * Footer Component
 * - Displays copyright information and current year
 * - Supports dark mode styling
 */
const Footer = () => (
  <footer className="border-t border-gray-200 dark:border-gray-700 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
    &copy; Khanh Nguyen {new Date().getFullYear()}
  </footer>
)

/**
 * HeroSection Component
 * - Main landing section for the homepage
 * - Displays title, version number, description, and GitHub button
 * - Fully responsive with TailwindCSS styling
 */
const HeroSection = () => (
  <div className="relative isolate h-full overflow-hidden px-6 pt-24 lg:px-8 flex items-center">
    <div className="mx-auto max-w-3xl text-center">
      {/* Main title with version */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
        Next.js Template <span className="text-indigo-500 dark:text-indigo-400">v{pkg.version}</span>
      </h1>
      {/* Description / features */}
      <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
        A modern starter template with <strong>Next.js 15</strong>, <strong>TypeScript</strong>,{' '}
        <strong>TailwindCSS</strong>, <strong>Ant Design</strong>, <strong>HeroUI</strong>, <strong>SWR</strong>,{' '}
        <strong>Framer Motion</strong>, and more.
      </p>

      {/* Call-to-action GitHub button */}
      <div className="mt-8 flex justify-center">
        <BtnUI
          color="primary"
          size="lg"
          variant="solid"
          className="text-lg font-semibold"
          startContent={<GithubFilled />}
        >
          View on GitHub
        </BtnUI>
      </div>
    </div>
  </div>
)

/**
 * HomePage Component
 * - Main entry page for the Next.js template
 * - Demonstrates usage of Ant Design notifications, Mantine hooks, and SWR data fetching
 * - Integrates Header, HeroSection, and Footer
 * - Supports light/dark mode with TailwindCSS
 */
export default function HomePage() {
  /**
   * Ant Design Notification Example
   * - Provides `message` and `notification` API for in-app feedback
   */
  const { message, notification } = useNotify()

  /**
   * Mantine Counter Example
   * - Demonstrates state management using `useCounter` hook
   */
  const [count, handlers] = useCounter(0, { min: 0, max: 10 })

  /**
   * SWR Data Fetching Example
   * - Fetches random quote data from `/api/quote`
   * - Demonstrates revalidation with `refreshInterval`
   */
  const { data, error, isLoading } = useSWR('/api/quote', fetcher, { refreshInterval: 30000 })

  return (
    <main className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Fixed header with theme switcher */}
      <Header />
      {/* Hero section with main title and GitHub button */}
      <HeroSection />
      {/* Footer with copyright info */}
      <Footer />
    </main>
  )
}
