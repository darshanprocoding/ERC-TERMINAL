import React from 'react';
import { Eye, Flame, Car, Stethoscope, Shield, AlertTriangle, Radio, Biohazard, Radiation, Waves, AlertOctagon } from 'lucide-react';
import { Incident } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ActiveIncidentsTableProps {
  incidents: Incident[];
  onViewIncident: (inc: Incident) => void;
  onViewAll?: () => void;
}

const getIncidentTypeIcon = (type: string, isDark: boolean) => {
  switch (type) {
    case 'Fire':
      return <Flame size={14} className={isDark ? "text-red-400" : "text-red-600"} />;
    case 'Accident':
      return <Car size={14} className={isDark ? "text-amber-400" : "text-amber-600"} />;
    case 'Medical':
      return <Stethoscope size={14} className={isDark ? "text-cyan-400" : "text-emerald-600"} />;
    case 'Police':
      return <Shield size={14} className={isDark ? "text-blue-400" : "text-blue-600"} />;
    case 'Hazmat':
      return <Biohazard size={14} className={isDark ? "text-purple-400 animate-pulse" : "text-purple-600 animate-pulse"} />;
    case 'Radiation':
      return <Radiation size={14} className={isDark ? "text-yellow-400 animate-spin-slow" : "text-amber-600 animate-spin-slow"} />;
    case 'Disaster':
      return <Waves size={14} className={isDark ? "text-orange-400" : "text-orange-600"} />;
    default:
      return <AlertOctagon size={14} className={isDark ? "text-emerald-400" : "text-emerald-600"} />;
  }
};

const getPriorityBadge = (priority: string, isDark: boolean) => {
  switch (priority) {
    case 'High':
      return isDark ? 'text-red-400 bg-red-500/10 border-red-500/30' : 'text-red-800 bg-red-50 border-red-200';
    case 'Medium':
      return isDark ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' : 'text-amber-800 bg-amber-50 border-amber-200';
    case 'Low':
      return isDark ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 'text-emerald-800 bg-emerald-50 border-emerald-200';
    default:
      return isDark ? 'text-slate-400 bg-slate-500/10 border-slate-500/30' : 'text-slate-800 bg-slate-100 border-slate-200';
  }
};

const getStatusBadge = (status: string, isDark: boolean) => {
  switch (status) {
    case 'In Progress':
      return isDark ? 'text-blue-400 bg-blue-500/15 border-blue-500/30' : 'text-blue-800 bg-blue-50 border-blue-200';
    case 'Assigned':
      return isDark ? 'text-purple-400 bg-purple-500/15 border-purple-500/30' : 'text-purple-800 bg-purple-50 border-purple-200';
    case 'Resolved':
      return isDark ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' : 'text-emerald-800 bg-emerald-50 border-emerald-200';
    default:
      return isDark ? 'text-slate-300 bg-slate-800 border-slate-700' : 'text-slate-700 bg-slate-100 border-slate-300';
  }
};

export const ActiveIncidentsTable: React.FC<ActiveIncidentsTableProps> = ({
  incidents,
  onViewIncident,
  onViewAll
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`border rounded-2xl overflow-hidden flex flex-col transition-colors ${
      isDark ? 'bg-[#0b101d] border-[#172338] shadow-[0_4px_25px_rgba(0,0,0,0.3)]' : 'bg-white border-slate-200 shadow-xs'
    }`}>
      {/* Header */}
      <div className={`p-4 border-b flex justify-between items-center ${
        isDark ? 'border-[#172338] bg-[#0d1322]/50' : 'border-slate-200 bg-slate-50'
      }`}>
        <h2 className={`font-bold text-sm ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Active Incidents</h2>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
        >
          View All →
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className={`text-[11px] font-semibold uppercase tracking-wider border-b ${
            isDark ? 'bg-[#0e1626]/80 text-slate-400 border-[#172338]' : 'bg-slate-50 text-slate-700 border-slate-200'
          }`}>
            <tr>
              <th className="px-5 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-5 py-3 font-semibold">Location</th>
              <th className="px-4 py-3 font-semibold">Reported Time</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-[#151f32] text-slate-300' : 'divide-slate-200 text-slate-800'}`}>
            {incidents.filter(i => i.status !== 'Resolved' && i.status !== 'Closed').slice(0, 5).map((inc) => (
              <tr key={inc.id} className={`transition-colors ${isDark ? 'hover:bg-[#111927]/60' : 'hover:bg-slate-50'}`}>
                <td className={`px-5 py-3.5 font-mono font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{inc.id}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5 font-medium">
                    {getIncidentTypeIcon(inc.type, isDark)}
                    <span>{inc.type}</span>
                  </div>
                </td>
                <td className={`px-5 py-3.5 font-medium ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>{inc.location}</td>
                <td className={`px-4 py-3.5 font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{inc.time}</td>
                <td className="px-4 py-3.5">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${getPriorityBadge(inc.priority, isDark)}`}>
                    {inc.priority}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${getStatusBadge(inc.status, isDark)}`}>
                    {inc.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <button
                    onClick={() => onViewIncident(inc)}
                    className={`p-1.5 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer ${
                      isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    title="View Incident"
                  >
                    <Eye size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
