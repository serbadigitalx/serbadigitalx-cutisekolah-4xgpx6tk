import React from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

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

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === selectedDate.getMonth() &&
      today.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
          {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={handlePrevMonth}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-gray-800" />
          </button>
          <button
            onClick={handleNextMonth}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-gray-800" />
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

      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayHolidays = getHolidaysForDate(day);
          const hasHoliday = dayHolidays.length > 0;
          const todayCell = isToday(day);
          
          return (
            <div
              key={day}
              className={`
                aspect-square p-1 relative rounded-lg transition-all duration-200
                ${todayCell ? 'bg-gradient-to-br from-amber-100 to-amber-200 shadow-sm' : ''}
                ${hasHoliday ? 'hover:transform hover:scale-105' : ''}
                ${hasHoliday && !todayCell ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : ''}
              `}
            >
              <div className={`
                text-sm font-medium
                ${todayCell ? 'text-amber-900' : 'text-gray-700'}
              `}>
                {day}
              </div>
              
              {hasHoliday && (
                <>
                  <div className="absolute bottom-1 left-1 right-1">
                    {dayHolidays.map((holiday, i) => (
                      <button
                        key={i}
                        onClick={() => onHolidayClick(holiday)}
                        className={`
                          w-full text-xs px-1.5 py-0.5 rounded-md mb-0.5 truncate text-left
                          transition-all duration-200 hover:shadow-md
                          ${holiday.type === 'national'
                            ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 hover:from-red-200 hover:to-pink-200'
                            : 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 hover:from-purple-200 hover:to-indigo-200'
                          }
                        `}
                      >
                        {holiday.name}
                      </button>
                    ))}
                  </div>

                  <div className="group relative">
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-lg">
                        {dayHolidays.map((holiday, i) => (
                          <div key={i} className="mb-1 last:mb-0">
                            <div className="font-medium">{holiday.name}</div>
                            <div className="text-gray-300 text-[10px]">{holiday.states}</div>
                          </div>
                        ))}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                          <div className="border-8 border-transparent border-t-gray-900" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-red-100 to-pink-100" />
          <span>National Holiday</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-purple-100 to-indigo-100" />
          <span>State Holiday</span>
        </div>
      </div>
    </div>
  );
}