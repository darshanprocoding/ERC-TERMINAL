import React from 'react';
import { AlertTriangle, Users, Building2, Car, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface KPICardsProps {
  activeIncidentsCount?: number;
  respondersCount?: number;
  hospitalsCount?: number;
  resourcesCount?: number;
  alertsCount?: number;
  onViewUnits?: () => void;
}

export const KPICards: React.FC<KPICardsProps> = ({
  activeIncidentsCount = 15,
  respondersCount = 128,
  hospitalsCount = 24,
  resourcesCount = 64,
  alertsCount = 7,
  onViewUnits
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* 1. Active Incidents */}
      <div className={`border rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group transition-all ${
        isDark 
          ? 'bg-[#0b101d] border-[#172338] hover:border-red-500/40 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
          : 'bg-white border-slate-200 hover:border-red-300 shadow-xs'
      }`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-semibold uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Active Incidents</span>
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${
            isDark 
              ? 'bg-red-500/15 border-red-500/30 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.3)]' 
              : 'bg-red-50 border-red-200 text-red-600'
          }`}>
            <AlertTriangle size={15} />
          </div>
        </div>
        <div className="mt-3">
          <div className={`text-2xl font-black tracking-tight font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{activeIncidentsCount}</div>
          <div className={`text-[11px] font-medium mt-1 flex items-center gap-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            <span>↗</span> 3 new today
          </div>
        </div>
      </div>

      {/* 2. Responders Deployed */}
      <div className={`border rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group transition-all ${
        isDark 
          ? 'bg-[#0b101d] border-[#172338] hover:border-blue-500/40 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
          : 'bg-white border-slate-200 hover:border-blue-300 shadow-xs'
      }`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-semibold uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Responders Deployed</span>
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${
            isDark 
              ? 'bg-blue-500/15 border-blue-500/30 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.3)]' 
              : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            <Users size={15} />
          </div>
        </div>
        <div className="mt-3">
          <div className={`text-2xl font-black tracking-tight font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{respondersCount}</div>
          <button
            onClick={onViewUnits}
            className="text-[11px] font-medium text-blue-500 hover:text-blue-600 mt-1 flex items-center gap-1 transition-colors cursor-pointer"
          >
            View all units →
          </button>
        </div>
      </div>

      {/* 3. Hospitals Available */}
      <div className={`border rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group transition-all ${
        isDark 
          ? 'bg-[#0b101d] border-[#172338] hover:border-emerald-500/40 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
          : 'bg-white border-slate-200 hover:border-emerald-300 shadow-xs'
      }`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-semibold uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Hospitals Available</span>
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${
            isDark 
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-600'
          }`}>
            <Building2 size={15} />
          </div>
        </div>
        <div className="mt-3">
          <div className={`text-2xl font-black tracking-tight font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{hospitalsCount}</div>
          <div className={`text-[11px] font-medium mt-1 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
            78% Capacity
          </div>
        </div>
      </div>

      {/* 4. Resources On Field */}
      <div className={`border rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group transition-all ${
        isDark 
          ? 'bg-[#0b101d] border-[#172338] hover:border-amber-500/40 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
          : 'bg-white border-slate-200 hover:border-amber-300 shadow-xs'
      }`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-semibold uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Resources On Field</span>
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${
            isDark 
              ? 'bg-amber-500/15 border-amber-500/30 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]' 
              : 'bg-amber-50 border-amber-200 text-amber-600'
          }`}>
            <Car size={15} />
          </div>
        </div>
        <div className="mt-3">
          <div className={`text-2xl font-black tracking-tight font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{resourcesCount}</div>
          <div className={`text-[11px] font-medium mt-1 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
            Vehicles & Equipments
          </div>
        </div>
      </div>

      {/* 5. Active Alerts */}
      <div className={`border rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group transition-all ${
        isDark 
          ? 'bg-[#0b101d] border-[#172338] hover:border-purple-500/40 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
          : 'bg-white border-slate-200 hover:border-purple-300 shadow-xs'
      }`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-semibold uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Active Alerts</span>
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${
            isDark 
              ? 'bg-purple-500/15 border-purple-500/30 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)]' 
              : 'bg-purple-50 border-purple-200 text-purple-600'
          }`}>
            <Bell size={15} />
          </div>
        </div>
        <div className="mt-3">
          <div className={`text-2xl font-black tracking-tight font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{alertsCount}</div>
          <div className={`text-[11px] font-medium mt-1 flex items-center gap-1 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
            <span>↗</span> High Priority
          </div>
        </div>
      </div>
    </div>
  );
};
