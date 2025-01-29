import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  holidays: Array<{
    date: string;
    name: string;
    type: 'national' | 'state';
    states: string;
  }>;
  onHolidayClick: (holiday: any) => void;
}

export function Calendar({ selectedDate, onDateChange, holidays, onHolidayClick }: CalendarProps) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const handlePrevMonth = () => {
    onDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    onDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1));
  };

  const getHolidaysForDate = (day: number) => {
    const currentMonthStr = monthNames[selectedDate.getMonth()].substring(0, 3);
    return holidays.filter(holiday => {
      const [monthStr, dayStr] = holiday.date.split(' ');
      return monthStr === currentMonthStr && parseInt(dayStr) === day;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayHolidays = getHolidaysForDate(day);
          const hasHoliday = dayHolidays.length > 0;
          
          return (
            <div
              key={day}
              className={`aspect-square p-1 relative ${
                hasHoliday ? 'bg-blue-50 rounded-lg' : ''
              }`}
            >
              <div className="text-sm text-gray-700">{day}</div>
              {hasHoliday && (
                <div className="absolute bottom-1 left-1 right-1">
                  {dayHolidays.map((holiday, i) => (
                    <button
                      key={i}
                      onClick={() => onHolidayClick(holiday)}
                      className={`w-full text-xs px-1 py-0.5 rounded mb-0.5 truncate text-left ${
                        holiday.type === 'national'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {holiday.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}