import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

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
  const [selectedFilters, setSelectedFilters] = useState<('national' | 'state')[]>(['national', 'state']);
  const [selectedDayEvents, setSelectedDayEvents] = useState<any[]>([]);

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
      return monthStr === currentMonthStr && 
             parseInt(dayStr) === day && 
             selectedFilters.includes(holiday.type);
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

  const toggleFilter = (type: 'national' | 'state') => {
    setSelectedFilters(prev => 
      prev.includes(type) 
        ? prev.filter(f => f !== type)
        : [...prev, type]
    );
  };

  const handleDaySelect = (day: number, events: any[]) => {
    setSelectedDayEvents(events);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <button
                onClick={() => toggleFilter('national')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedFilters.includes('national')
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                National
              </button>
              <button
                onClick={() => toggleFilter('state')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedFilters.includes('state')
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                State
              </button>
            </div>
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
                  ${todayCell ? 'bg-gradient-to-br from-red-50 to-red-100 shadow-sm ring-2 ring-red-500 ring-offset-2' : ''}
                  ${hasHoliday ? 'hover:transform hover:scale-105' : ''}
                  ${hasHoliday && !todayCell ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : ''}
                `}
                onClick={() => {
                  handleDaySelect(day, dayHolidays);
                  if (dayHolidays.length === 1) {
                    onHolidayClick(dayHolidays[0]);
                  }
                }}
              >
                <div className={`
                  text-sm font-medium
                  ${todayCell ? 'text-red-700' : 'text-gray-700'}
                `}>
                  {day}
                </div>
                
                {hasHoliday && (
                  <div className="absolute bottom-1 left-1 right-1 space-y-0.5">
                    {dayHolidays.map((holiday, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          onHolidayClick(holiday);
                        }}
                        className={`
                          w-full text-[10px] px-1 py-0.5 rounded truncate
                          transition-all duration-200 hover:scale-105
                          ${holiday.type === 'national'
                            ? 'bg-red-100 text-red-800 hover:bg-red-200'
                            : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                          }
                        `}
                      >
                        {holiday.name.length > 12 ? `${holiday.name.slice(0, 12)}...` : holiday.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Summary Section */}
      {selectedDayEvents.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Selected Date Events
          </h3>
          <div className="space-y-4">
            {selectedDayEvents.map((event, index) => (
              <button
                key={index}
                onClick={() => onHolidayClick(event)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                  event.type === 'national'
                    ? 'bg-red-50 border border-red-100 hover:bg-red-100'
                    : 'bg-purple-50 border border-purple-100 hover:bg-purple-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{event.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{event.date}</p>
                    <p className="text-sm text-gray-500 mt-2">{event.states}</p>
                  </div>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${event.type === 'national'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-purple-100 text-purple-800'
                    }
                  `}>
                    {event.type === 'national' ? 'National' : 'State'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}