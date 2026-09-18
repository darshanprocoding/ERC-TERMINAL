import React, { useState, useEffect } from 'react';
import { Activity, Bell, Calendar, Menu, LogOut, Shield, PhoneCall, Radio, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  currentView: string;
  unreadAlertsCount?: number;
  onToggleSidebar?: () => void;
  onAlertsClick?: () => void;
  onRadioCallClick?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, unreadAlertsCount = 0, onToggleSidebar, onAlertsClick, onRadioCallClick, onLogout }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
      setDateStr(now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 bg-[#090d16] border-b border-[#151f32] flex items-center justify-between px-6 shrink-0 z-30">
      {/* Left Title & Status */}
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800"
          >
            <Menu size={20} />
          </button>
        )}
        <div className="flex items-center gap-3">
          <div className="text-red-500 flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
            <Activity size={24} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-100 tracking-wide flex items-center gap-2">
              {currentView}
            </h1>
            <p className="text-[11px] text-slate-400 font-normal">
              Real-time overview of emergency operations
            </p>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Tactical Theme Selector Toggle (Dark Mode vs Light Mode) */}
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all duration-300 shadow-sm cursor-pointer group active:scale-95 ${
            isDark 
              ? 'bg-[#0e1626] hover:bg-[#15233c] text-amber-300 border-[#1b2a45] shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
              : 'bg-white hover:bg-slate-50 text-amber-600 border-slate-200 shadow-[0_0_10px_rgba(217,119,6,0.15)]'
          }`}
          title={`Current: ${isDark ? 'Dark Mode (Tactical Night)' : 'Light Mode (Daytime Ops)'}. Click to switch theme.`}
        >
          <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-350 transform ${
                isDark
                  ? 'opacity-100 rotate-0 scale-100'
                  : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
              }`}
            >
              <Moon size={14} className="text-amber-400 group-hover:-rotate-12 transition-transform duration-200" />
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-350 transform ${
                isDark
                  ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
                  : 'opacity-100 rotate-0 scale-100'
              }`}
            >
              <Sun size={14} className="text-amber-500 group-hover:rotate-45 transition-transform duration-200" />
            </span>
          </div>
          <span className="hidden sm:inline font-mono transition-all duration-300">
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>

        {/* Tactical 2-Way Radio Call Launcher */}
        {onRadioCallClick && (
          <button
            onClick={onRadioCallClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all group ${
              isDark
                ? 'bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-600 shadow-sm'
            }`}
            title="Launch 2-Way Tactical Radio Voice Call"
          >
            <PhoneCall size={14} className={isDark ? "text-emerald-400 group-hover:animate-bounce" : "text-white group-hover:animate-bounce"} />
            <span className="hidden sm:inline font-mono">Radio Call</span>
          </button>
        )}

        {/* System Status */}
        <div className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full ${
          isDark 
            ? 'bg-[#0d1c24] border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]' 
            : 'bg-emerald-50 border border-emerald-200 shadow-sm'
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
          <div className="text-left">
            <span className={`text-[9px] font-bold uppercase tracking-wider block leading-none ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>System Status</span>
            <span className={`text-[11px] font-semibold leading-none ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>All Systems Operational</span>
          </div>
        </div>

        {/* Notifications */}
        <button
          onClick={onAlertsClick}
          className={`relative p-2 rounded-xl transition-all shadow-sm group ${
            isDark 
              ? 'text-slate-300 hover:text-white bg-[#0e1626] hover:bg-[#15233c] border border-[#1b2a45]' 
              : 'text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200'
          }`}
          title={unreadAlertsCount > 0 ? `${unreadAlertsCount} Unread Notifications` : 'Notifications & Alerts'}
        >
          <Bell size={18} />
          {unreadAlertsCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-black text-[10px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center shadow-md border border-[#090d16]">
              {unreadAlertsCount > 99 ? '99+' : unreadAlertsCount}
            </span>
          )}
        </button>

        {/* Date & Time */}
        <div className={`hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl text-xs font-mono shadow-sm ${
          isDark 
            ? 'text-slate-300 bg-[#0e1626] border border-[#1b2a45]' 
            : 'text-slate-700 bg-white border border-slate-200'
        }`}>
          <Calendar size={14} className={isDark ? "text-slate-400" : "text-slate-500"} />
          <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{dateStr || 'Today'}</span>
          <span className={isDark ? "text-slate-600" : "text-slate-300"}>|</span>
          <span className={`font-bold tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>{timeStr}</span>
        </div>

        {/* Field Responder Terminal Link */}
        <button
          onClick={() => { window.location.hash = '#responder'; }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all group ${
            isDark
              ? 'bg-blue-950/70 hover:bg-blue-900/90 text-blue-300 border border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-600 shadow-sm'
          }`}
          title="Open Field Responder Mobile Terminal"
        >
          <Radio size={14} className={isDark ? "text-blue-400 group-hover:scale-110 transition-transform" : "text-white group-hover:scale-110 transition-transform"} />
          <span className="hidden sm:inline font-mono">Field Terminal</span>
        </button>

        {/* Tactical User Clearance & Logout */}
        {onLogout && (
          <button
            onClick={onLogout}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm group ${
              isDark 
                ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30' 
                : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
            }`}
            title="Log out from tactical terminal"
          >
            <LogOut size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        )}
      </div>
    </header>
  );
};
