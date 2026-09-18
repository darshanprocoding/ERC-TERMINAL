import React from 'react';
import { Flame, Ambulance, Shield, Users, PlusCircle } from 'lucide-react';
import { Vehicle } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ResourceOverviewProps {
  vehicles?: Vehicle[];
  onViewAll?: () => void;
}

export const ResourceOverview: React.FC<ResourceOverviewProps> = ({ vehicles = [], onViewAll }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const fireTotal = vehicles.filter(v => v.type === 'Fire').length || 6;
  const fireAvail = vehicles.filter(v => v.type === 'Fire' && v.status === 'Available').length;

  const ambTotal = vehicles.filter(v => v.type === 'Ambulance').length || 6;
  const ambAvail = vehicles.filter(v => v.type === 'Ambulance' && v.status === 'Available').length;

  const policeTotal = vehicles.filter(v => v.type === 'Police').length || 8;
  const policeAvail = vehicles.filter(v => v.type === 'Police' && v.status === 'Available').length;

  const rescueTotal = vehicles.filter(v => v.type === 'Rescue').length || 4;
  const rescueAvail = vehicles.filter(v => v.type === 'Rescue' && v.status === 'Available').length;

  const resources = [
    {
      name: 'Fire Engines',
      icon: Flame,
      current: fireAvail,
      total: fireTotal,
      status: fireAvail > 0 ? 'Available' : 'All Dispatched',
      barColor: 'bg-red-500',
      iconBg: isDark ? 'text-red-400 bg-red-500/10' : 'text-red-600 bg-red-50'
    },
    {
      name: 'Ambulances',
      icon: Ambulance,
      current: ambAvail,
      total: ambTotal,
      status: ambAvail > 0 ? 'Available' : 'All Dispatched',
      barColor: 'bg-emerald-500',
      iconBg: isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50'
    },
    {
      name: 'Police Units',
      icon: Shield,
      current: policeAvail,
      total: policeTotal,
      status: policeAvail > 0 ? 'Available' : 'All Dispatched',
      barColor: 'bg-blue-500',
      iconBg: isDark ? 'text-blue-400 bg-blue-500/10' : 'text-blue-600 bg-blue-50'
    },
    {
      name: 'Rescue Squads',
      icon: Users,
      current: rescueAvail,
      total: rescueTotal,
      status: rescueAvail > 0 ? 'Available' : 'All Dispatched',
      barColor: 'bg-amber-500',
      iconBg: isDark ? 'text-amber-400 bg-amber-500/10' : 'text-amber-600 bg-amber-50'
    },
    {
      name: 'Medical Teams',
      icon: PlusCircle,
      current: Math.max(0, ambAvail * 2),
      total: ambTotal * 2,
      status: 'Active Grid',
      barColor: 'bg-teal-500',
      iconBg: isDark ? 'text-teal-400 bg-teal-500/10' : 'text-teal-600 bg-teal-50'
    }
  ];

  return (
    <div className={`border rounded-2xl p-4 flex flex-col transition-colors ${
      isDark ? 'bg-[#0b101d] border-[#172338] shadow-[0_4px_25px_rgba(0,0,0,0.3)]' : 'bg-white border-slate-200 shadow-xs'
    }`}>
      {/* Header */}
      <div className={`flex justify-between items-center mb-3.5 pb-2 border-b ${
        isDark ? 'border-[#172338]' : 'border-slate-200'
      }`}>
        <h2 className={`font-bold text-sm ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Resource Overview</h2>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
        >
          View All →
        </button>
      </div>

      {/* Resource Rows */}
      <div className="space-y-3">
        {resources.map((item) => {
          const Icon = item.icon;
          const percentage = item.total > 0 ? Math.round((item.current / item.total) * 100) : 0;
          return (
            <div key={item.name} className="flex items-center gap-3 text-xs">
              <div className={`p-1.5 rounded-lg shrink-0 ${item.iconBg}`}>
                <Icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-semibold truncate ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-[11px] font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {item.current} / {item.total}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        item.current > 0
                          ? isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                          : isDark ? 'text-amber-400 bg-amber-500/10' : 'text-amber-800 bg-amber-50 border border-amber-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-[#151f32]' : 'bg-slate-200'}`}>
                  <div
                    className={`h-full ${item.barColor} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
