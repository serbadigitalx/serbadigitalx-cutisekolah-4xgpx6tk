import React from 'react';
import { Bell } from 'lucide-react';

interface UpcomingHolidayProps {
  holiday: {
    name: string;
    date: string;
    type: 'national' | 'state';
    states: string;
  } | null;
}

export function UpcomingHoliday({ holiday }: UpcomingHolidayProps) {
  if (!holiday) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 shadow-sm border border-blue-100">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-100 rounded-full p-2">
          <Bell className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-900">Next Holiday</h3>
          <p className="text-lg font-semibold text-blue-950">{holiday.name}</p>
          <div className="flex items-center mt-1">
            <span className="text-sm text-blue-700">{holiday.date}</span>
            <span className="mx-2 text-blue-300">•</span>
            <span className="text-sm text-blue-600">{holiday.states}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          holiday.type === 'national'
            ? 'bg-red-100 text-red-800'
            : 'bg-purple-100 text-purple-800'
        }`}>
          {holiday.type === 'national' ? 'National' : 'State'}
        </div>
      </div>
    </div>
  );
}