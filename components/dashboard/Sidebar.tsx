'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, TrendingUp, Settings,
  LogOut, Zap, ChevronLeft, ChevronRight, Mic, Trophy,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const navItems = [
  { id: 'nav-dashboard', icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { id: 'nav-topics', icon: BookOpen, label: 'Topics', href: '/dashboard/topics' },
  { id: 'nav-progress', icon: TrendingUp, label: 'Progress', href: '/dashboard/progress' },
  { id: 'nav-leaderboard', icon: Trophy, label: 'Leaderboard', href: '/dashboard/leaderboard' },
  { id: 'nav-speaking', icon: Mic, label: 'AI Speaking', href: '/dashboard/speaking' },
  { id: 'nav-settings', icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`hidden md:flex flex-col h-screen sticky top-0 glass-dark border-r border-white/06 transition-all duration-300 z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/06">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-neon-sm">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold gradient-text"
            >
              Winglish
            </motion.span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.id}
              id={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-primary/20 to-accent/10 text-white border border-primary/30'
                  : 'text-white/50 hover:text-white hover:bg-white/05'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 py-4 border-t border-white/06 space-y-1">
        <button
          id="sidebar-logout"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/05 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
        <button
          id="sidebar-collapse"
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/05 transition-all duration-200 w-full"
        >
          {collapsed
            ? <ChevronRight className="w-5 h-5" />
            : <ChevronLeft className="w-5 h-5" />}
          {!collapsed && <span className="text-sm font-medium">Collapse</span>}
        </button>
      </div>
    </motion.aside>
  )
}
