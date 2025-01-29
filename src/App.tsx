import React, { useState } from 'react';
import { Calendar as CalendarIcon, Share2, X, MapPin } from 'lucide-react';
import { Calendar } from './components/Calendar';

type Holiday = {
  date: string;
  name: string;
  states: string;
  isPast?: boolean;
  type: 'national' | 'state';
};

type SchoolHoliday = {
  name: string;
  startDate: string;
  endDate: string;
  isPast?: boolean;
};

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  event: Holiday | (SchoolHoliday & { type: 'school' }) | null;
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

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  const isSchoolHoliday = 'type' in event && event.type === 'school';
  const days = isSchoolHoliday 
    ? calculateDays(event.startDate, event.endDate)
    : calculateDays(event.date);

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
                : formatDateRange(event.date)
              }
            </p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Duration</p>
            <p className="text-base text-gray-900">{days} day{days > 1 ? 's' : ''}</p>
          </div>
          
          {!isSchoolHoliday && (
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
        </div>
      </div>
    </div>
  );
};

const publicHolidays: Holiday[] = [
  { date: "Jan 1", name: "New Year Holiday", states: "National (except JHR KDH KTN TRG)", type: "national" },
  { date: "Jan 6", name: "Sultan's Birthday", states: "Johor", type: "state" },
  { date: "Jan 14", name: "Sultan's Birthday", states: "Negeri Sembilan", type: "state" },
  { date: "Jan 27", name: "Israk dan Mikraj", states: "Kedah, Negeri Sembilan, Perlis, Terengganu", type: "state" },
  { date: "Jan 29", name: "Chinese New Year", states: "National", type: "national" },
  { date: "Jan 30", name: "Chinese New Year, Day 2", states: "National (except Kelantan)", type: "national" },
  { date: "Feb 1", name: "Federal Territory Day", states: "Kuala Lumpur, Labuan, Putrajaya", type: "state" },
  { date: "Feb 11", name: "Thaipusam", states: "Johor, Kedah, Kuala Lumpur, Negeri Sembilan, Putrajaya, Penang, Perak, Selangor", type: "state" },
  { date: "Feb 20", name: "Independence Proclamation Day", states: "Melaka", type: "state" },
  { date: "Mar 2", name: "Awal Ramadan", states: "Johor, Kedah", type: "state" },
  { date: "Mar 3", name: "Awal Ramadan Holiday", states: "Johor", type: "state" },
  { date: "Mar 4", name: "Sultan's Coronation Anniversary", states: "Terengganu", type: "state" },
  { date: "Mar 18", name: "Nuzul Quran", states: "Kelantan, Kuala Lumpur, Labuan, Pahang, Putrajaya, Perlis, Penang, Perak, Selangor, Terengganu", type: "state" },
  { date: "Mar 23", name: "Sultan's Birthday", states: "Johor", type: "state" },
  { date: "Mar 24", name: "Sultan's Birthday (day in lieu)", states: "Johor", type: "state" },
  { date: "Mar 31", name: "Hari Raya Puasa", states: "National", type: "national" },
  { date: "Apr 1", name: "Hari Raya Puasa Holiday", states: "National", type: "national" },
  { date: "Apr 2", name: "Hari Raya Aidilfitri Holiday Third Day", states: "Melaka", type: "state" },
  { date: "Apr 18", name: "Good Friday", states: "Sabah, Sarawak", type: "state" },
  { date: "Apr 26", name: "Sultan's Birthday", states: "Terengganu", type: "state" },
  { date: "Apr 27", name: "State Public Holiday", states: "Terengganu", type: "state" },
  { date: "May 1", name: "Labour Day", states: "National", type: "national" },
  { date: "May 12", name: "Wesak Day", states: "National", type: "national" },
  { date: "May 17", name: "Raja's Birthday", states: "Perlis", type: "state" },
  { date: "May 22", name: "Hari Hol Pahang", states: "Pahang", type: "state" },
  { date: "May 30", name: "Harvest Festival", states: "Labuan, Sabah", type: "state" },
  { date: "May 31", name: "State Public Holiday", states: "Labuan, Sabah", type: "state" },
  { date: "Jun 1", name: "Hari Gawai Dayak", states: "Sarawak", type: "state" },
  { date: "Jun 2", name: "Birthday of SPB Yang di-Pertuan Agong", states: "National", type: "national" },
  { date: "Jun 2", name: "State Public Holiday", states: "Sarawak", type: "state" },
  { date: "Jun 3", name: "State Public Holiday", states: "Sarawak", type: "state" },
  { date: "Jun 6", name: "Hari Arafah", states: "Kelantan, Terengganu", type: "state" },
  { date: "Jun 7", name: "Hari Raya Qurban", states: "National", type: "national" },
  { date: "Jun 8", name: "Hari Raya Qurban, Day 2", states: "Kedah, Kelantan, Perlis, Terengganu", type: "state" },
  { date: "Jun 9", name: "Hari Raya Qurban Holiday", states: "Kelantan, Terengganu", type: "state" },
  { date: "Jun 22", name: "Sultan's Birthday", states: "Kedah", type: "state" },
  { date: "Jun 27", name: "Awal Muharram", states: "National", type: "national" },
  { date: "Jun 29", name: "Awal Muharram Holiday", states: "Kedah", type: "state" },
  { date: "Jul 7", name: "George Town UNESCO Heritage Day", states: "Penang", type: "state" },
  { date: "Jul 12", name: "Ruler's Birthday", states: "Penang", type: "state" },
  { date: "Jul 22", name: "Sarawak Day", states: "Sarawak", type: "state" },
  { date: "Jul 30", name: "Sultan's Birthday", states: "Pahang", type: "state" },
  { date: "Jul 31", name: "Hari Hol Almarhum Sultan Iskandar", states: "Johor", type: "state" },
  { date: "Aug 24", name: "Ruler's Birthday", states: "Melaka", type: "state" },
  { date: "Aug 25", name: "State Public Holiday", states: "Melaka", type: "state" },
  { date: "Aug 31", name: "National Day", states: "National", type: "national" },
  { date: "Sep 1", name: "National Day Holiday", states: "National (except Kedah, Kelantan, Terengganu)", type: "national" },
  { date: "Sep 5", name: "Maulidur Rasul", states: "National", type: "national" },
  { date: "Sep 7", name: "Maulidur Rasul Holiday", states: "Kedah", type: "state" },
  { date: "Sep 16", name: "Malaysia Day", states: "National", type: "national" },
  { date: "Sep 29", name: "Sultan's Birthday", states: "Kelantan", type: "state" },
  { date: "Sep 30", name: "State Public Holiday", states: "Kelantan", type: "state" },
  { date: "Oct 4", name: "Ruler's Birthday", states: "Sabah", type: "state" },
  { date: "Oct 11", name: "Ruler's Birthday", states: "Sarawak", type: "state" },
  { date: "Oct 20", name: "Deepavali", states: "National (except Sarawak)", type: "national" },
  { date: "Nov 7", name: "Sultan's Birthday", states: "Perak", type: "state" },
  { date: "Dec 11", name: "Sultan's Birthday", states: "Selangor", type: "state" },
  { date: "Dec 24", name: "Christmas Eve", states: "Sabah", type: "state" },
  { date: "Dec 25", name: "Christmas Day", states: "National", type: "national" }
];

const groupAHolidays: SchoolHoliday[] = [
  { name: "Mid-Year Break", startDate: "May 29", endDate: "Jun 9" },
  { name: "Term 2 Break", startDate: "Sep 12", endDate: "Sep 20" },
  { name: "Deepavali Break", startDate: "Oct 19", endDate: "Oct 21" },
  { name: "Year-End Break", startDate: "Dec 19", endDate: "Jan 10" }
];

const groupBHolidays: SchoolHoliday[] = [
  { name: "Mid-Year Break", startDate: "May 23", endDate: "Jun 7" },
  { name: "Term 2 Break", startDate: "Sep 13", endDate: "Sep 21" },
  { name: "Deepavali Break", startDate: "Oct 20", endDate: "Oct 22" },
  { name: "Year-End Break", startDate: "Dec 20", endDate: "Jan 11" }
];

function App() {
  const [activeGroup, setActiveGroup] = useState<'A' | 'B'>('A');
  const [selectedEvent, setSelectedEvent] = useState<Holiday | (SchoolHoliday & { type: 'school' }) | null>(null);
  const [view, setView] = useState<'national' | 'state' | 'calendar'>('national');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Malaysia Public & School Holidays 2025',
        text: 'Check out the complete list of Malaysian public and school holidays for 2025!',
        url: window.location.href,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const currentMonth = selectedDate.getMonth();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonthHolidays = publicHolidays.filter(holiday => 
    holiday.date.startsWith(monthNames[currentMonth])
  );

  const filteredHolidays = view === 'calendar' 
    ? currentMonthHolidays 
    : publicHolidays.filter(holiday => holiday.type === view);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                MY Holidays 2025
              </h1>
              <p className="text-sm text-blue-100 mt-0.5">Plan Your Cuti with Ease</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-blue-100" />
          </div>
          
          <div className="flex mt-4 space-x-1 bg-white/10 p-1 rounded-xl">
            <button
              onClick={() => setView('national')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                view === 'national'
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              National
            </button>
            <button
              onClick={() => setView('state')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                view === 'state'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              State
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                view === 'calendar'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Calendar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-3 py-6 sm:px-6 lg:px-8 space-y-8">
        {view === 'calendar' ? (
          <Calendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            holidays={publicHolidays}
            onHolidayClick={setSelectedEvent}
          />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {view === 'calendar' 
                  ? `Holidays in ${new Date().toLocaleString('default', { month: 'long' })}`
                  : `${view === 'national' ? 'National' : 'State'} Holidays`}
              </h2>
            </div>

            <div className="grid gap-2 sm:gap-4 sm:grid-cols-2">
              {filteredHolidays.map((holiday, index) => {
                const days = calculateDays(holiday.date);
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedEvent(holiday)}
                    className={`text-left p-3 rounded-lg transition-all ${
                      holiday.isPast 
                        ? 'bg-gray-50 opacity-50' 
                        : 'bg-white shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-medium truncate ${holiday.isPast ? 'line-through' : ''}`}>
                          {holiday.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">{holiday.date}</p>
                        <div className="flex items-center mt-1.5 text-xs text-gray-500">
                          <MapPin className="h-3 w-3 mr-1 shrink-0" />
                          <span className="truncate">{holiday.states}</span>
                        </div>
                      </div>
                      <span className={`shrink-0 px-1.5 py-0.5 rounded-full text-xs font-medium ${
                        holiday.isPast 
                          ? 'bg-gray-100 text-gray-600' 
                          : holiday.type === 'national'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-purple-100 text-purple-800'
                      }`}>
                        {days}d
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <section className="pt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">School Holidays</h2>
                <div className="inline-flex p-0.5 space-x-1 bg-gray-100 rounded-lg text-sm">
                  <button
                    onClick={() => setActiveGroup('A')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      activeGroup === 'A'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setActiveGroup('B')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      activeGroup === 'B'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    B
                  </button>
                </div>
              </div>

              <div className="mb-4 px-3 py-2 bg-gray-50 rounded text-xs text-gray-600">
                {activeGroup === 'A' ? (
                  <span>Johor, Kedah, Kelantan, Terengganu</span>
                ) : (
                  <span>
                    Perlis, Penang, Perak, Selangor, N. Sembilan, Melaka, Pahang,
                    Sabah, Sarawak, KL, Putrajaya, Labuan
                  </span>
                )}
              </div>

              <div className="grid gap-2 sm:gap-4 sm:grid-cols-2">
                {(activeGroup === 'A' ? groupAHolidays : groupBHolidays).map((holiday, index) => {
                  const days = calculateDays(holiday.startDate, holiday.endDate);
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedEvent({ ...holiday, type: 'school' })}
                      className={`text-left p-3 rounded-lg transition-all ${
                        holiday.isPast 
                          ? 'bg-gray-50 opacity-50' 
                          : 'bg-white shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-sm font-medium truncate ${holiday.isPast ? 'line-through' : ''}`}>
                            {holiday.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {holiday.startDate} – {holiday.endDate}
                          </p>
                        </div>
                        <span className={`shrink-0 px-1.5 py-0.5 rounded-full text-xs font-medium ${
                          holiday.isPast 
                            ? 'bg-gray-100 text-gray-600' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {days}d
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </>
        )}

        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleShare}
            className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </main>

      <EventModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />
    </div>
  );
}

export default App;