'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@heroui/button'
import { MoonIcon, SunIcon } from 'lucide-react'
import { cn } from '@/libs/utils'

interface ThemeSwitcherProps {
  /** Additional class names for customization */
  className?: string
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * ThemeSwitcher Component
 *
 * A button that toggles the website's theme between light and dark modes.
 * - Uses `next-themes` to manage theme state.
 * - Supports custom sizes (`sm`, `md`, `lg`) and additional styling via `className`.
 * - Prevents hydration errors by rendering only on the client.
 *
 * @param {string} className Optional additional class names for styling
 * @param {'sm' | 'md' | 'lg'} size Optional size of the button, default is 'md'
 * @returns {JSX.Element | null} Returns a themed toggle button or null during SSR
 */
export default function ThemeSwitcher({ className, size = 'md' }: ThemeSwitcherProps) {
  // next-themes hook to get current theme and function to update it
  const { theme, setTheme } = useTheme()
  // State to track if component has mounted to avoid SSR mismatch
  const [mounted, setMounted] = useState(false)

  // Mark as mounted after client-side hydration
  useEffect(() => setMounted(true), [])

  // Prevent rendering on the server to avoid hydration mismatch
  if (!mounted) return null

  // Toggle between light and dark theme
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <Button
      isIconOnly
      size={size}
      variant="light"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={cn(
        'rounded-full border shadow transition-colors',
        'border-gray-700 hover:bg-gray-100',
        'dark:border-gray-600 dark:hover:bg-gray-800',
        className
      )}
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-700" />
      )}
    </Button>
  )
}
