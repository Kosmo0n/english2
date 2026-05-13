'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, LogOut, Settings, CreditCard, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const notifications = [
  { id: 1, title: 'New Achievement!', text: 'You unlocked "Fast Learner" badge.', time: '2m ago' },
  { id: 2, title: 'Daily Goal', text: 'You are only 5 XP away from your daily goal.', time: '1h ago' },
  { id: 3, title: 'Course Update', text: 'New content added to Technology topic.', time: '5h ago' },
];

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function DashboardTopbar({ title, subtitle }: TopbarProps) {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="sticky top-0 z-20 glass-dark border-b border-white/06 px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        {subtitle && <p className="text-xs text-white/40">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white border border-white/08 transition-all relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-navy"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 glass rounded-2xl border border-white/10 shadow-2xl z-40 overflow-hidden"
                >
                  <div className="p-4 border-b border-white/06 flex items-center justify-between bg-white/04">
                    <span className="font-bold text-sm">Notifications</span>
                    <span className="text-[10px] text-accent font-bold uppercase tracking-widest">3 New</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-4 border-b border-white/06 hover:bg-white/04 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-semibold">{n.title}</span>
                          <span className="text-[10px] text-white/30">{n.time}</span>
                        </div>
                        <p className="text-xs text-white/50">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        
        {/* Profile */}
        <div className="relative">
          <button 
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-3 pl-4 border-l border-white/06 group"
          >
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold group-hover:text-primary transition-colors">{user?.username || 'Learner'}</div>
              <div className="text-[10px] text-primary font-bold tracking-widest uppercase">Pro Member</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent p-[2px] transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-navy flex items-center justify-center overflow-hidden">
                <User className="w-6 h-6 text-white/20" />
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showProfile && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowProfile(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-64 glass rounded-2xl border border-white/10 shadow-2xl z-40 overflow-hidden"
                >
                  <div className="p-4 border-b border-white/06 bg-white/04">
                    <div className="font-bold text-sm">{user?.username || 'Learner'}</div>
                    <div className="text-xs text-white/40">Premium Account</div>
                  </div>
                  
                  <div className="p-2">
                    <button 
                      onClick={() => router.push('/dashboard/settings')}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/05 transition-all"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/05 transition-all">
                      <CreditCard className="w-4 h-4" /> Subscription
                    </button>
                  </div>

                  <div className="p-2 border-t border-white/06 bg-white/02">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
