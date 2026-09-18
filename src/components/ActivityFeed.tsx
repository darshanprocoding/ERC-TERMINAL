import React from 'react';
import { ActivityItem } from '../types';

interface ActivityFeedProps {
  activities?: ActivityItem[];
  onViewAll?: () => void;
}

const DEFAULT_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    time: '10:41 AM',
    text: 'Police Unit PV-23 assigned to INC-2025-015',
    color: 'blue'
  },
  {
    id: '2',
    time: '10:40 AM',
    text: 'Fire Engine FE-12 reached the incident location',
    color: 'red'
  },
  {
    id: '3',
    time: '10:39 AM',
    text: 'Ambulance AMB-07 dispatched to INC-2025-014',
    color: 'green'
  },
  {
    id: '4',
    time: '10:38 AM',
    text: 'New incident reported: Fire at Kilpauk',
    color: 'red'
  },
  {
    id: '5',
    time: '10:32 AM',
    text: 'Incident INC-2025-014 assigned to Traffic Police',
    color: 'blue'
  }
];

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities = DEFAULT_ACTIVITIES, onViewAll }) => {
  const displayActivities = activities.length > 0 ? activities : DEFAULT_ACTIVITIES;

  const getDotStyle = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-500 shadow-[0_0_8px_#ef4444]';
      case 'green':
        return 'bg-emerald-500 shadow-[0_0_8px_#10b981]';
      case 'amber':
        return 'bg-amber-500 shadow-[0_0_8px_#f59e0b]';
      default:
        return 'bg-blue-500 shadow-[0_0_8px_#3b82f6]';
    }
  };

  return (
    <div className="bg-[#0b101d] border border-[#172338] rounded-2xl p-4 flex flex-col shadow-[0_4px_25px_rgba(0,0,0,0.3)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#172338]">
        <h2 className="font-bold text-sm text-slate-100">Activity Feed</h2>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
        >
          View All →
        </button>
      </div>

      {/* Timeline Items */}
      <div className="space-y-3">
        {displayActivities.slice(0, 6).map((item) => (
          <div key={item.id} className="flex items-center gap-3 text-xs">
            <span className={`w-2 h-2 rounded-full shrink-0 ${getDotStyle(item.color)}`}></span>
            <span className="font-mono text-[11px] text-slate-400 shrink-0 font-medium">{item.time}</span>
            <span className="text-slate-300 font-medium truncate">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
