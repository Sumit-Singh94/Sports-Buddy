import React, { useEffect, useState } from "react";
import { db, listDocuments, createDocument, deleteDocument } from "../services/appwrite.js";

function Manager({ label, collectionId }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(true);

  const load = async () => {
    setBusy(true);
    const res = await listDocuments(collectionId);
    setItems(res.documents);
    setBusy(false);
  };

  const add = async (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    await createDocument(collectionId, { name: n });
    setName("");
    await load();
  };

  const remove = async (id) => {
    await deleteDocument(collectionId, id);
    await load();
  };

  useEffect(() => { load(); }, [collectionId]);

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h3 className="font-semibold mb-3">{label}</h3>
      <form onSubmit={add} className="flex gap-2 mb-3">
        <input className="flex-1 px-3 py-2 border rounded-lg" placeholder={`Add ${label.slice(0, -1)}`}
               value={name} onChange={(e) => setName(e.target.value)} />
        <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">Add</button>
      </form>
      {busy ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : items.length ? (
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.$id} className="flex items-center justify-between">
              <span>{it.name || it.$id}</span>
              <button onClick={() => remove(it.$id)} className="text-red-600 text-sm hover:underline">Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No {label.toLowerCase()} yet.</p>
      )}
    </div>
  );
}

export default function AdminPanel() {
  const [seeding, setSeeding] = useState(false);

  const doSeed = async () => {
    setSeeding(true);
    await seedData();
    setSeeding(false);
    alert("Seeded default Sports, Cities, Areas (skipped existing).");
  };

  return (
    <div className="space-y-6">
      <button onClick={doSeed} disabled={seeding}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400">
        {seeding ? "Seeding…" : "Seed Default Data"}
      </button>
      <div className="grid gap-6 md:grid-cols-3">
        <Manager label="Sports" collectionId={db.collections.sports} />
        <Manager label="Cities" collectionId={db.collections.cities} />
        <Manager label="Areas" collectionId={db.collections.areas} />
      </div>
    </div>
  );
}
