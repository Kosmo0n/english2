'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import TopicGrid from '@/components/dashboard/TopicGrid';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';

export default function TopicsPage() {
  return (
    <div className="flex min-h-screen bg-navy text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-grid pb-12">
        <DashboardTopbar 
          title="Explore Topics"
          subtitle="Select a topic to start your lesson"
        />

        <div className="px-8 pt-8">
          <TopicGrid />
        </div>
      </main>
    </div>
  );
}
