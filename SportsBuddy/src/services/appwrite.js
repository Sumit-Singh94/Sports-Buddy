import { Client, Account, Databases, ID, Query } from "appwrite";

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  console.error("[Appwrite] Missing VITE_APPWRITE_ENDPOINT or VITE_APPWRITE_PROJECT_ID in .env");
}

const client = new Client();
client.setEndpoint(endpoint ?? "").setProject(projectId ?? "");

export const account = new Account(client);
export const databases = new Databases(client);

export const db = {
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  collections: {
    sports: import.meta.env.VITE_SPORTS_COLLECTION_ID,
    cities: import.meta.env.VITE_CITIES_COLLECTION_ID,
    areas: import.meta.env.VITE_AREAS_COLLECTION_ID,
    events: import.meta.env.VITE_EVENTS_COLLECTION_ID,
  },
};

// Guard helpers so we fail loudly (and clearly) if IDs are missing
const requireId = (label, value) => {
  if (!value) throw new Error(`[Appwrite] Missing ${label}. Check your .env`);
  return value;
};

export const listDocuments = (collectionId, queries = []) =>
  databases.listDocuments(
    requireId("Database ID", db.databaseId),
    requireId("Collection ID", collectionId),
    queries
  );

export const createDocument = (collectionId, data, permissions = []) =>
  databases.createDocument(
    requireId("Database ID", db.databaseId),
    requireId("Collection ID", collectionId),
    ID.unique(),
    data,
    permissions
  );

export const deleteDocument = (collectionId, documentId) =>
  databases.deleteDocument(
    requireId("Database ID", db.databaseId),
    requireId("Collection ID", collectionId),
    requireId("Document ID", documentId)
  );

export { ID, Query };
export default client;
