import React from 'react';
import { Link } from 'react-router-dom';
import { X, ExternalLink } from 'lucide-react';

type Holiday = {
  date: string;
  name: string;
  states: string;
  type: 'national' | 'state';
};

type SchoolHoliday = {
  name: string;
  startDate: string;
  endDate: string;
  type: 'school';
};

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  event: Holiday | SchoolHoliday | null;
};

const calculateDays = (startDate: string, endDate?: string) => {
  if (!endDate) return 1;
  
  const start = new Date(startDate.split('–')[0].trim());
  const end = new Date(endDate.trim());
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const formatDateRange = (date: string) => {
  const dates = date.split('–');
  if (dates.length === 1) return date;
  return `${dates[0].trim()} to ${dates[1].trim()}`;
};

export function EventModal({ isOpen, onClose, event }: EventModalProps) {
  if (!isOpen || !event) return null;

  const isSchoolHoliday = event.type === 'school';
  const days = isSchoolHoliday 
    ? calculateDays(event.startDate, event.endDate)
    : calculateDays('date' in event ? event.date : '');

  // Create a URL-friendly ID from the event name
  const eventId = event.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {event.name}
        </h3>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-500">Date</p>
            <p className="text-base text-gray-900">
              {isSchoolHoliday 
                ? `${event.startDate} to ${event.endDate}`
                : 'date' in event ? formatDateRange(event.date) : ''
              }
            </p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Duration</p>
            <p className="text-base text-gray-900">{days} day{days > 1 ? 's' : ''}</p>
          </div>
          
          {!isSchoolHoliday && 'states' in event && (
            <>
              <div>
                <p className="text-sm font-medium text-gray-500">Regions</p>
                <p className="text-base text-gray-900">{event.states}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Holiday Type</p>
                <p className="text-base text-gray-900 capitalize">{event.type} Holiday</p>
              </div>
            </>
          )}

          <Link
            to={`/event/${event.type}/${eventId}`}
            className="mt-6 inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={onClose}
          >
            Learn More
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}