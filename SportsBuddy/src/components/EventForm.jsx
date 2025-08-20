import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { db, listDocuments, createDocument } from "../services/appwrite.js";

export default function EventForm({ onEventCreated }) {
  const { user } = useAuth();
  const [options, setOptions] = useState({ sports: [], cities: [], areas: [] });
  const [form, setForm] = useState({ name: "", sport: "", city: "", area: "", time: "", skill: "" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const [sports, cities, areas] = await Promise.all([
        listDocuments(db.collections.sports),
        listDocuments(db.collections.cities),
        listDocuments(db.collections.areas),
      ]);
      setOptions({
        sports: sports.documents,
        cities: cities.documents,
        areas: areas.documents,
      });
    })().catch((e) => console.error("Failed to load options:", e));
  }, []);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const data = {
        name: form.name,
        sport: form.sport,
        city: form.city,
        area: form.area,
        time: new Date(form.time).toISOString(),
        skillLevel: form.skill,
        ownerId: user.$id,
        ownerName: user.name,
      };
      // Public read so lists show for everyone; owner can update/delete
      const perms = [
        'read("any")',
        `update("user:${user.$id}")`,
        `delete("user:${user.$id}")`,
      ];
      await createDocument(db.collections.events, data, perms);
      setForm({ name: "", sport: "", city: "", area: "", time: "", skill: "" });
      onEventCreated?.();
      alert("Event created!");
    } catch (e2) {
      console.error(e2);
      alert("Failed to create event.");
    } finally {
      setBusy(false);
    }
  };

  const safeLabel = (doc) => doc.name || doc.title || doc.label || doc.slug || doc.$id;

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
      <input name="name" placeholder="Event Name" required value={form.name} onChange={onChange}
             className="w-full px-4 py-2 border rounded-lg" />

      <select name="sport" required value={form.sport} onChange={onChange}
              className="w-full px-4 py-2 border rounded-lg">
        <option value="">Select a Sport</option>
        {options.sports.map((s) => (
          <option key={s.$id} value={safeLabel(s)}>{safeLabel(s)}</option>
        ))}
      </select>

      <select name="city" required value={form.city} onChange={onChange}
              className="w-full px-4 py-2 border rounded-lg">
        <option value="">Select a City</option>
        {options.cities.map((c) => (
          <option key={c.$id} value={safeLabel(c)}>{safeLabel(c)}</option>
        ))}
      </select>

      <select name="area" required value={form.area} onChange={onChange}
              className="w-full px-4 py-2 border rounded-lg">
        <option value="">Select an Area</option>
        {options.areas.map((a) => (
          <option key={a.$id} value={safeLabel(a)}>{safeLabel(a)}</option>
        ))}
      </select>

      <input name="time" type="datetime-local" required value={form.time} onChange={onChange}
             className="w-full px-4 py-2 border rounded-lg" />

      <select name="skill" required value={form.skill} onChange={onChange}
              className="w-full px-4 py-2 border rounded-lg">
        <option value="">Select Skill Level</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <button disabled={busy} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
        {busy ? "Creating…" : "Create Event"}
      </button>
    </form>
  );
}
