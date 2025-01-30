import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';

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

interface EventPageProps {
  holidays: Holiday[];
  schoolHolidays: SchoolHoliday[];
}

export function EventPage({ holidays, schoolHolidays }: EventPageProps) {
  const { type, id } = useParams();
  
  // Find the event based on the URL parameters
  const event = type === 'school'
    ? schoolHolidays.find(h => h.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id)
    : holidays.find(h => h.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Event not found</h1>
          <Link to="/" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calendar
          </Link>
        </div>
      </div>
    );
  }

  const isSchoolHoliday = 'startDate' in event;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calendar
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">{event.name}</h1>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <h2 className="font-medium text-gray-900">Date</h2>
                  <p className="mt-1 text-gray-600">
                    {isSchoolHoliday 
                      ? `${event.startDate} to ${event.endDate}`
                      : event.date
                    }
                  </p>
                </div>
              </div>

              {!isSchoolHoliday && (
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <h2 className="font-medium text-gray-900">Regions</h2>
                    <p className="mt-1 text-gray-600">{event.states}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <h2 className="font-medium text-gray-900">Type</h2>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isSchoolHoliday
                        ? 'bg-yellow-100 text-yellow-800'
                        : event.type === 'national'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-purple-100 text-purple-800'
                    }`}>
                      {isSchoolHoliday ? 'School Holiday' : `${event.type.charAt(0).toUpperCase() + event.type.slice(1)} Holiday`}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-medium text-gray-900">Description</h2>
              <p className="text-gray-600">
                {isSchoolHoliday ? (
                  <>
                    This is a scheduled school holiday period for {type === 'A' ? 'Group A' : 'Group B'} states in Malaysia.
                    During this time, all schools in the affected regions will be closed for student holidays.
                  </>
                ) : (
                  <>
                    This is a {event.type} holiday celebrated in {event.states}.
                    Government offices, schools, and many businesses will be closed during this period.
                  </>
                )}
              </p>

              {!isSchoolHoliday && (
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-2">Important Information</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Government offices will be closed</li>
                    <li>Banks will be closed</li>
                    <li>Most businesses may have modified hours</li>
                    <li>Public transportation may run on holiday schedules</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}