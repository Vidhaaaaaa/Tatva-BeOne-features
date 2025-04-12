import React from 'react';
// import { gapi } from 'gapi-script';
import './schedule.css';

// interface CalendarEvent {
//   id: string;
//   summary: string;
//   start: { dateTime?: string; date?: string };
//   end: { dateTime?: string; date?: string };
// }

const Schedule: React.FC = () => {
  // const [events, setEvents] = useState<CalendarEvent[]>([]);
  // const [isSignedIn, setIsSignedIn] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '';
  // const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || '';
  // const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID || 'primary';
  // const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  // const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  // Initialize Google API client
  // const initClient = () => {
  //   gapi.load('client:auth2', () => {
  //     gapi.client
  //       .init({
  //         apiKey: API_KEY,
  //         clientId: CLIENT_ID,
  //         discoveryDocs: DISCOVERY_DOCS,
  //         scope: SCOPES,
  //       })
  //       .then(() => {
  //         const authInstance = gapi.auth2.getAuthInstance();
  //         setIsSignedIn(authInstance.isSignedIn.get());
  //         authInstance.isSignedIn.listen(setIsSignedIn);
  //         if (authInstance.isSignedIn.get()) {
  //           fetchEvents();
  //         }
  //       })
  //       .catch((err: any) => {
  //         setError('Failed to initialize Google API client');
  //         console.error(err);
  //       });
  //   });
  // };

  // Fetch events from Google Calendar
  // const fetchEvents = () => {
  //   gapi.client.calendar.events
  //     .list({
  //       calendarId: CALENDAR_ID,
  //       timeMin: new Date().toISOString(),
  //       showDeleted: false,
  //       singleEvents: true,
  //       maxResults: 10,
  //       orderBy: 'startTime',
  //     })
  //     .then((response: any) => {
  //       const events = response.result.items || [];
  //       setEvents(events);
  //     })
  //     .catch((err: any) => {
  //       setError('Failed to fetch events');
  //       console.error(err);
  //     });
  // };

  // Handle sign-in
  // const handleSignIn = () => {
  //   gapi.auth2.getAuthInstance().signIn();
  // };

  // Handle sign-out
  // const handleSignOut = () => {
  //   gapi.auth2.getAuthInstance().signOut();
  // };

  // Load Google API client on component mount
  // useEffect(() => {
  //   initClient();
  // }, []);

  // Format event date for display
  // const formatDate = (dateTime?: string, date?: string) => {
  //   if (dateTime) {
  //     return new Date(dateTime).toLocaleString();
  //   }
  //   if (date) {
  //     return new Date(date).toLocaleDateString();
  //   }
  //   return 'N/A';
  // };

  return (
    // <div className="schedule-container">
    //   <h2>Schedule</h2>
    //   {error && <p className="error">{error}</p>}
    //   {!isSignedIn ? (
    //     <button onClick={handleSignIn} className="auth-button">
    //       Sign in with Google
    //     </button>
    //   ) : (
    //     <>
    //       <button onClick={handleSignOut} className="auth-button">
    //         Sign out
    //       </button>
    //       <div className="events-list">
    //         {events.length > 0 ? (
    //           events.map((event) => (
    //             <div key={event.id} className="event-item">
    //               <h3>{event.summary || 'No title'}</h3>
    //               <p>
    //                 Start: {formatDate(event.start.dateTime, event.start.date)}
    //               </p>
    //               <p>End: {formatDate(event.end.dateTime, event.end.date)}</p>
    //             </div>
    //           ))
    //         ) : (
    //           <p>No upcoming events found.</p>
    //         )}
    //       </div>
    //     </>
    //   )}
    // </div>
    <div className="schedule-container">
      <img src='/calendar.png' />
    </div>
  );
};

export default Schedule;