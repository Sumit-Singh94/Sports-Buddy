import React, { useState } from "react";
import EventForm from "../components/EventForm.jsx";
import EventList from "../components/EventList.jsx";

export default function UserDashboard() {
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-3">Create Event</h2>
        <EventForm onEventCreated={() => setRefresh((n) => n + 1)} />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-3">Upcoming Events</h2>
        <EventList key={refresh} />
      </section>
    </div>
  );
}
