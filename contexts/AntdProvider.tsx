'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, AppProps, ConfigProvider, theme, ThemeConfig } from 'antd'
import { createContext, JSX, ReactNode, useContext, useEffect, useState } from 'react'
import type { MessageInstance } from 'antd/es/message/interface'
import type { NotificationInstance } from 'antd/es/notification/interface'
import { useTheme } from 'next-themes'

/** Global theme configuration */
const themeConfig: ThemeConfig = { token: { borderRadius: 12 } }

/** Global Ant Design App configuration */
const appConfig: AppProps = {
  message: { maxCount: 1, duration: 4 },
  notification: { duration: 4, placement: 'topRight', maxCount: 1 }
}

/** Notification context interface */
interface INotificationContext {
  notifySuccess: (content: string) => void
  notifyError: (content: string) => void
  notifyInfo: (content: string) => void
  notifyWarning: (content: string) => void
  message: MessageInstance
  notification: NotificationInstance
}

/** Notification context */
const NotificationContext = createContext<INotificationContext | undefined>(undefined)

/** Notification provider */
const NotificationProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const { message, notification } = App.useApp()
  return (
    <NotificationContext.Provider
      value={{
        notifySuccess: (c) => message.success(c),
        notifyError: (c) => message.error(c),
        notifyInfo: (c) => message.info(c),
        notifyWarning: (c) => message.warning(c),
        message,
        notification
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

/** AntdProvider with SSR-safe theme */
export default function AntdProvider({ children }: { children: ReactNode }): JSX.Element {
  const { theme: currentTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const algorithm = mounted && currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm

  return (
    <AntdRegistry>
      <ConfigProvider theme={{ ...themeConfig, algorithm }}>
        <App {...appConfig}>
          <NotificationProvider>{children}</NotificationProvider>
        </App>
      </ConfigProvider>
    </AntdRegistry>
  )
}

/** Custom hook to access notification methods */
export function useNotify(): INotificationContext {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotify must be used within a AntdProvider')
  }
  return context
}
