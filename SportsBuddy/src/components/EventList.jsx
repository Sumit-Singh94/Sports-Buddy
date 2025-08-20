import React, { useEffect, useState } from "react";
import { db, listDocuments, Query } from "../services/appwrite.js";

const Card = ({ e }) => (
  <div className="p-4 border rounded-lg shadow-sm bg-white">
    <h4 className="font-semibold text-lg">{e.name}</h4>
    <p className="text-sm">Sport: {e.sport}</p>
    <p className="text-sm">City: {e.city} • Area: {e.area}</p>
    <p className="text-sm">Skill: {e.skillLevel}</p>
    <p className="text-sm">When: {new Date(e.time).toLocaleString()}</p>
    <p className="text-xs text-gray-500 mt-1">By {e.ownerName}</p>
  </div>
);

export default function EventList() {
  const [rows, setRows] = useState([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await listDocuments(db.collections.events, [Query.orderAsc("time")]);
        setRows(res.documents);
      } finally {
        setBusy(false);
      }
    })().catch((e) => console.error(e));
  }, []);

  if (busy) return <p className="text-sm text-gray-500">Loading events…</p>;
  if (!rows.length) return <p className="text-sm text-gray-500">No events yet.</p>;

  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{rows.map((e) => <Card key={e.$id} e={e} />)}</div>;
}
