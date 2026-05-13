import Sidebar from '@/components/dashboard/Sidebar'
import ProgressWidget from '@/components/dashboard/ProgressWidget'
import TopicGrid from '@/components/dashboard/TopicGrid'
import AchievementBadges from '@/components/dashboard/AchievementBadges'
import { Bell, Search, User } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-navy overflow-hidden">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <div className="sticky top-0 z-10 glass-dark border-b border-white/06 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Good morning, Alex! 👋</h1>
            <p className="text-sm text-white/50">Ready for today's lesson?</p>
          </div>
          <div className="flex items-center gap-3">
            <button id="topbar-search" className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/50 hover:text-white border border-white/08 transition-all duration-200">
              <Search className="w-4 h-4" />
            </button>
            <button id="topbar-notifications" className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/50 hover:text-white border border-white/08 transition-all duration-200 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full text-xs flex items-center justify-center font-bold">3</span>
            </button>
            <button id="topbar-profile" className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-w-6xl mx-auto">
          {/* Progress Widget */}
          <ProgressWidget />

          {/* Topic Grid */}
          <TopicGrid />

          {/* Achievements */}
          <AchievementBadges />
        </div>
      </div>
    </div>
  )
}
