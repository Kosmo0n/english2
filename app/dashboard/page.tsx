'use client'

import Sidebar from '@/components/dashboard/Sidebar'
import ProgressWidget from '@/components/dashboard/ProgressWidget'
import TopicGrid from '@/components/dashboard/TopicGrid'
import AchievementBadges from '@/components/dashboard/AchievementBadges'
import DashboardTopbar from '@/components/dashboard/DashboardTopbar'
import { useAuth } from '@/context/AuthContext'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen bg-navy text-white">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-grid pb-12">
        <DashboardTopbar 
          title={`Welcome back, ${user?.username || 'Learner'}!`}
          subtitle="Your fluency journey is 45% complete."
        />

        {/* Content */}
        <div className="p-8 space-y-8 max-w-6xl mx-auto">
          <ProgressWidget />
          <TopicGrid />
          <AchievementBadges />
        </div>
      </main>
    </div>
  )
}
