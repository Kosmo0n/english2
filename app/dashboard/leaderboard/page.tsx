'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Star, ArrowUp, ArrowDown, Minus } from 'lucide-react';

const leaders = [
  { rank: 1, name: 'Alex Johnson', xp: 24500, level: 42, avatar: '🥇', trend: 'up' },
  { rank: 2, name: 'Maria Garcia', xp: 22100, level: 38, avatar: '🥈', trend: 'up' },
  { rank: 3, name: 'Chen Wei', xp: 21800, level: 37, avatar: '🥉', trend: 'down' },
  { rank: 4, name: 'Elena Petrova', xp: 19500, level: 34, avatar: '👤', trend: 'same' },
  { rank: 5, name: 'Sarah Miller', xp: 18200, level: 32, avatar: '👤', trend: 'up' },
  { rank: 6, name: 'Tom Wilson', xp: 17100, level: 30, avatar: '👤', trend: 'down' },
  { rank: 7, name: 'You', xp: 12450, level: 25, avatar: '🔥', trend: 'up', isUser: true },
  { rank: 8, name: 'David Smith', xp: 11900, level: 24, avatar: '👤', trend: 'same' },
];

export default function LeaderboardPage() {
  return (
    <div className="flex min-h-screen bg-navy text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-grid pb-12">
        <DashboardTopbar 
          title="Leaderboard"
          subtitle="Compete with learners worldwide and climb the ranks"
        />

        <div className="p-8 max-w-4xl mx-auto">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 mb-12 items-end pt-10">
            {/* Rank 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center text-2xl mb-3">🥈</div>
              <div className="glass-dark border border-white/06 rounded-t-2xl w-full p-4 text-center h-32 flex flex-col justify-center shadow-lg">
                <div className="font-bold text-sm truncate">{leaders[1].name}</div>
                <div className="text-primary text-xs font-bold mt-1">{leaders[1].xp} XP</div>
              </div>
            </motion.div>

            {/* Rank 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-3">
                <Crown className="w-8 h-8 text-yellow-400 absolute -top-6 left-1/2 -translate-x-1/2 drop-shadow-neon-yellow" />
                <div className="w-20 h-20 rounded-full glass border border-yellow-400/30 flex items-center justify-center text-3xl shadow-neon-yellow">🥇</div>
              </div>
              <div className="glass-dark border border-yellow-400/20 rounded-t-2xl w-full p-4 text-center h-44 flex flex-col justify-center shadow-neon-sm relative z-10">
                <div className="font-black text-white">{leaders[0].name}</div>
                <div className="text-accent text-sm font-bold mt-1">{leaders[0].xp} XP</div>
              </div>
            </motion.div>

            {/* Rank 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center text-xl mb-3">🥉</div>
              <div className="glass-dark border border-white/06 rounded-t-2xl w-full p-4 text-center h-28 flex flex-col justify-center shadow-lg">
                <div className="font-bold text-sm truncate">{leaders[2].name}</div>
                <div className="text-primary text-xs font-bold mt-1">{leaders[2].xp} XP</div>
              </div>
            </motion.div>
          </div>

          {/* List */}
          <div className="glass rounded-3xl border border-white/08 overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/06 bg-white/04 grid grid-cols-12 text-[10px] font-bold uppercase tracking-widest text-white/40">
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-6 pl-4">Learner</div>
              <div className="col-span-2 text-center">Level</div>
              <div className="col-span-3 text-right pr-4">Total XP</div>
            </div>

            <div className="divide-y divide-white/04">
              {leaders.map((leader, i) => (
                <motion.div 
                  key={leader.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`grid grid-cols-12 p-4 items-center transition-colors ${leader.isUser ? 'bg-primary/10 border-l-2 border-l-primary' : 'hover:bg-white/02'}`}
                >
                  <div className="col-span-1 flex flex-col items-center">
                    <span className={`text-sm font-black ${i < 3 ? 'text-accent' : 'text-white/40'}`}>{leader.rank}</span>
                    {leader.trend === 'up' && <ArrowUp className="w-2.5 h-2.5 text-emerald-500" />}
                    {leader.trend === 'down' && <ArrowDown className="w-2.5 h-2.5 text-red-500" />}
                    {leader.trend === 'same' && <Minus className="w-2.5 h-2.5 text-white/20" />}
                  </div>
                  
                  <div className="col-span-6 flex items-center gap-4 pl-4">
                    <div className="w-10 h-10 rounded-full glass border border-white/08 flex items-center justify-center text-lg shadow-sm">
                      {leader.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold flex items-center gap-2">
                        {leader.name}
                        {leader.isUser && <span className="px-1.5 py-0.5 rounded bg-primary/20 text-[8px] text-primary border border-primary/20 uppercase tracking-tighter">You</span>}
                      </div>
                      <div className="text-[10px] text-white/30">Active this week</div>
                    </div>
                  </div>

                  <div className="col-span-2 text-center">
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/04 border border-white/06 text-[10px] font-bold">
                      <Star className="w-2.5 h-2.5 text-primary" /> {leader.level}
                    </div>
                  </div>

                  <div className="col-span-3 text-right pr-4">
                    <div className="text-sm font-black text-white/90">{leader.xp.toLocaleString()}</div>
                    <div className="text-[10px] text-accent font-bold uppercase">XP</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
