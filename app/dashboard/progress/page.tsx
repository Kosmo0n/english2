'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Zap, Target, BarChart3, Calendar } from 'lucide-react';

export default function ProgressPage() {
  const stats = [
    { label: 'Total XP', value: '12,450', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Study Time', value: '48h 20m', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Words Learned', value: '842', icon: BarChart3, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Day Streak', value: '14 Days', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  return (
    <div className="flex min-h-screen bg-navy text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-grid pb-12">
        <DashboardTopbar 
          title="Your Progress"
          subtitle="Visualize your learning journey and milestones"
        />

        <div className="p-8 max-w-6xl mx-auto space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/08"
              >
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-black mb-1">{stat.value}</div>
                <div className="text-xs text-white/40 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Activity */}
            <div className="glass rounded-3xl p-6 border border-white/08">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" /> Weekly Activity
                </h3>
                <span className="text-xs text-white/40">Last 7 days</span>
              </div>
              
              <div className="flex items-end justify-between h-48 gap-2">
                {[40, 70, 45, 90, 65, 30, 85].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                      className={`w-full rounded-t-lg bg-gradient-to-t ${i === 6 ? 'from-primary to-accent shadow-neon-sm' : 'from-white/05 to-white/10'}`}
                    />
                    <span className="text-[10px] text-white/30 uppercase">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Radar Simulation */}
            <div className="glass rounded-3xl p-6 border border-white/08">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" /> Skill Distribution
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Vocabulary', value: 85, color: 'bg-primary' },
                  { label: 'Listening', value: 62, color: 'bg-blue-500' },
                  { label: 'Speaking', value: 45, color: 'bg-accent' },
                  { label: 'Grammar', value: 78, color: 'bg-emerald-500' },
                ].map((skill, i) => (
                  <div key={skill.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-white/70">{skill.label}</span>
                      <span className="font-bold">{skill.value}%</span>
                    </div>
                    <div className="h-2 bg-white/05 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.value}%` }}
                        transition={{ duration: 1.2, delay: 0.8 + i * 0.1 }}
                        className={`h-full rounded-full ${skill.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Milestones */}
          <div className="glass rounded-3xl p-6 border border-white/08">
            <h3 className="font-bold mb-6">Recent Milestones</h3>
            <div className="space-y-4">
              {[
                { date: 'Today', title: 'Unlocked "Tech Enthusiast" Badge', desc: 'Completed all technology lessons in record time.' },
                { date: 'Yesterday', title: 'Hit 14-Day Streak!', desc: 'You haven\'t missed a day in two weeks. Keep it up!' },
                { date: '3 days ago', title: 'Reached Level 5', desc: 'Fluency level increased. New advanced topics unlocked.' },
              ].map((m, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/02 border border-white/04 hover:bg-white/04 transition-colors">
                  <div className="text-[10px] text-white/30 font-bold uppercase w-16 pt-1">{m.date}</div>
                  <div>
                    <div className="text-sm font-bold text-white/90">{m.title}</div>
                    <div className="text-xs text-white/40 mt-1">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
