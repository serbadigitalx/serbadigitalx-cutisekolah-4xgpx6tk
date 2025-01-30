import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar as CalendarIcon, MapPin, Clock, Share2, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

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
  
  const event = type === 'school'
    ? schoolHolidays.find(h => h.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id)
    : holidays.find(h => h.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Helmet>
          <title>Event Not Found - Malaysia Holidays 2025</title>
          <meta name="description" content="The requested holiday event could not be found." />
        </Helmet>
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
  const eventImage = isSchoolHoliday
    ? "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80"
    : type === 'national'
      ? "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&q=80"
      : "https://images.unsplash.com/photo-1577037789343-307901c3e5b5?auto=format&fit=crop&q=80";

  const handleShare = async () => {
    try {
      await navigator.share({
        title: event.name,
        text: `Check out details about ${event.name} in Malaysia Holidays 2025!`,
        url: window.location.href,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{event.name} - Malaysia Holidays 2025</title>
        <meta 
          name="description" 
          content={`Learn more about ${event.name} ${isSchoolHoliday 
            ? `school holiday from ${event.startDate} to ${event.endDate}` 
            : `on ${event.date} in ${event.states}`}`} 
        />
        <meta property="og:title" content={`${event.name} - Malaysia Holidays 2025`} />
        <meta property="og:description" content={`Details about ${event.name} in Malaysia`} />
        <meta property="og:image" content={eventImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calendar
          </Link>
          <div className="mt-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{event.name}</h1>
            <button
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={eventImage}
                alt={event.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">About this Holiday</h2>
                  {isSchoolHoliday ? (
                    <>
                      <p className="text-gray-600 mb-4">
                        This is a scheduled school holiday period for Malaysian schools. During this time,
                        all schools in the affected regions will be closed for student holidays, providing
                        a break from academic activities.
                      </p>
                      <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">What to Expect</h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                        <li>All schools will be closed</li>
                        <li>School-related activities will be suspended</li>
                        <li>Teachers and students can plan for vacation</li>
                        <li>School facilities may undergo maintenance</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 mb-4">
                        This is a {event.type} holiday celebrated in {event.states}. During this period,
                        government offices, schools, and many businesses will be closed to observe the holiday.
                      </p>
                      <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">What to Expect</h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                        <li>Government offices will be closed</li>
                        <li>Banks will be closed</li>
                        <li>Most businesses may have modified hours</li>
                        <li>Public transportation may run on holiday schedules</li>
                        <li>Special events or celebrations may be held</li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Planning Tips</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  To make the most of this holiday period, consider the following tips:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Plan your activities in advance</li>
                  <li>Check operating hours for places you plan to visit</li>
                  <li>Make reservations early if traveling</li>
                  <li>Keep track of special events or celebrations</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Holiday Details</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Date</h3>
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
                      <h3 className="font-medium text-gray-900">Regions</h3>
                      <p className="mt-1 text-gray-600">{event.states}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Type</h3>
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
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Links</h2>
              <div className="space-y-3">
                <a
                  href="https://www.malaysia.gov.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700">Official Government Portal</span>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
                <a
                  href="https://www.tourism.gov.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700">Tourism Malaysia</span>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
                {isSchoolHoliday && (
                  <a
                    href="https://www.moe.gov.my"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">Ministry of Education</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}