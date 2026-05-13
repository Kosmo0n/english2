'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { User, Bell, Lock, Globe, Shield, Moon, Eye, Smartphone } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Eye },
  ];

  return (
    <div className="flex min-h-screen bg-navy text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-grid pb-12">
        <DashboardTopbar 
          title="Account Settings"
          subtitle="Manage your profile, preferences and security"
        />

        <div className="p-8 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Tabs Sidebar */}
            <div className="w-full md:w-64 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'text-white/40 hover:text-white hover:bg-white/05'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Area */}
            <div className="flex-1 glass rounded-3xl border border-white/08 p-8">
              {activeTab === 'profile' && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b border-white/06">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent p-1">
                      <div className="w-full h-full rounded-full bg-navy flex items-center justify-center">
                        <User className="w-10 h-10 text-white/10" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{user?.username || 'Learner'}</h3>
                      <p className="text-sm text-white/40">Joined June 2024 • Pro Member</p>
                      <button className="text-xs text-primary font-bold mt-2 hover:text-primary-light transition-colors uppercase tracking-wider">Change Avatar</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-white/40 ml-1 uppercase tracking-widest">Full Name</label>
                      <input type="text" defaultValue={user?.username || ''} className="w-full bg-white/04 border border-white/08 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-all text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-white/40 ml-1 uppercase tracking-widest">Email Address</label>
                      <input type="email" defaultValue={`${user?.username?.toLowerCase() || 'learner'}@example.com`} className="w-full bg-white/04 border border-white/08 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-all text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-white/40 ml-1 uppercase tracking-widest">Native Language</label>
                      <select className="w-full bg-white/04 border border-white/08 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-all text-sm appearance-none">
                        <option className="bg-navy">Russian</option>
                        <option className="bg-navy">Kazakh</option>
                        <option className="bg-navy">Spanish</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-white/40 ml-1 uppercase tracking-widest">Goal</label>
                      <select className="w-full bg-white/04 border border-white/08 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-all text-sm appearance-none">
                        <option className="bg-navy">Professional</option>
                        <option className="bg-navy">Travel</option>
                        <option className="bg-navy">Casual</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-sm shadow-neon-sm hover:opacity-90 transition-all">Save Changes</button>
                  </div>
                </motion.div>
              )}

              {activeTab !== 'profile' && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/04 flex items-center justify-center mb-4 border border-white/08">
                    <Smartphone className="w-8 h-8 text-white/20" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{tabs.find(t => t.id === activeTab)?.label} Settings</h3>
                  <p className="text-sm text-white/40 max-w-xs">This section is currently under development. Coming soon in the next update!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
