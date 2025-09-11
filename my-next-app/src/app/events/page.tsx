"use client";

import { useEffect, useState } from "react";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<{
    upcoming: Event[];
    ongoing: Event[];
    past: Event[];
  }>({ upcoming: [], ongoing: [], past: [] });

  const [tab, setTab] = useState<"upcoming" | "ongoing" | "past">("upcoming");

  useEffect(() => {
    fetch("http://localhost:5005/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("❌ Error fetching events:", err));
  }, []);

  const currentEvents = events[tab] || [];

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["upcoming", "ongoing", "past"].map((t) => (
          <button
            key={t}
            className={tab === t ? "font-bold underline" : ""}
            onClick={() => setTab(t as typeof tab)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Cards */}
      {currentEvents.length === 0 ? (
        <p className="text-gray-500">No {tab} events available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentEvents.map((event) => (
            <div key={event._id} className="p-4 border rounded-lg shadow">
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <h2 className="text-xl font-bold mt-2">{event.title}</h2>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-sm mt-1">
                {event.date} at {event.time} – {event.location}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
