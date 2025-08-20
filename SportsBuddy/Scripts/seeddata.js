// scripts/seedData.js
import { Client, Databases, ID } from "appwrite";
import dotenv from "dotenv";

dotenv.config(); // load .env values

// 🔑 Setup client
const client = new Client()
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const dbId = process.env.VITE_APPWRITE_DATABASE_ID;

// 📋 Collections
const collections = {
  sports: process.env.VITE_SPORTS_COLLECTION_ID,
  cities: process.env.VITE_CITIES_COLLECTION_ID,
  areas: process.env.VITE_AREAS_COLLECTION_ID,
};

// Default data
const sports = [
  "Football",
  "Cricket",
  "Basketball",
  "Tennis",
  "Badminton",
  "Hockey",
  "Table Tennis",
  "Swimming",
  "Volleyball",
  "Kabaddi",
  "Squash",
  "Athletics",
  "Golf",
  "Rugby"
];
const cities = [
  "Kolkata",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Kochi"
];
const areas = [
  // Kolkata
  "Park Street, Kolkata",
  "Salt Lake (Bidhannagar), Kolkata",
  "New Town (Rajarhat), Kolkata",
  "Gariahat, Kolkata",
  "Alipore, Kolkata",
  
  // Delhi
  "Connaught Place (CP), Delhi",
  "South Extension (South Ex), Delhi",
  "Hauz Khas Village, Delhi",
  "Khan Market, Delhi",
  "Saket, Delhi",
  
  // Mumbai
  "Andheri, Mumbai",
  "Bandra, Mumbai",
  "Juhu, Mumbai",
  "Colaba, Mumbai",
  "Powai, Mumbai",
  
  // Bangalore
  "Koramangala, Bangalore",
  "Indiranagar, Bangalore",
  "MG Road, Bangalore",
  "Whitefield, Bangalore",
  "Jayanagar, Bangalore",
  
  // Chennai
  "T. Nagar, Chennai",
  "Anna Nagar, Chennai",
  "Adyar, Chennai",
  "Velachery, Chennai",
  "Nungambakkam, Chennai",
  
  // Hyderabad
  "Gachibowli, Hyderabad",
  "Jubilee Hills, Hyderabad",
  "Banjara Hills, Hyderabad",
  "Hitech City, Hyderabad",
  "Kukatpally, Hyderabad",

  // Pune
  "Koregaon Park (KP), Pune",
  "Deccan Gymkhana, Pune",
  "Viman Nagar, Pune",
  "Hinjewadi, Pune",
  "Kothrud, Pune",
  
  // Ahmedabad
  "C.G. Road, Ahmedabad",
  "Satellite, Ahmedabad",
  "Vastrapur, Ahmedabad",
  "Navrangpura, Ahmedabad",
  "Bodakdev, Ahmedabad",
  
  // Jaipur
  "Malviya Nagar, Jaipur",
  "C-Scheme, Jaipur",
  "Vaishali Nagar, Jaipur",
  "Mansarovar, Jaipur",
  "Raja Park, Jaipur",
  
  // Lucknow
  "Hazratganj, Lucknow",
  "Gomti Nagar, Lucknow",
  "Aliganj, Lucknow",
  "Indiranagar, Lucknow",
  "Aminabad, Lucknow",
  
  // Chandigarh
  "Sector 17, Chandigarh",
  "Sector 35, Chandigarh",
  "Zirakpur, Chandigarh",
  "Mohali, Chandigarh",
  "Panchkula, Chandigarh",
  
  // Kochi
  "Fort Kochi, Kochi",
  "Marine Drive, Kochi",
  "MG Road, Kochi",
  "Kakkanad, Kochi",
  "Panampilly Nagar, Kochi"
];


// Helper: seed collection without duplicates
async function seedCollection(collectionId, items, label) {
  const res = await databases.listDocuments(dbId, collectionId);
  const existing = new Set(res.documents.map((d) => (d.name || "").toLowerCase()));
  console.log(`[${label}] Existing:`, [...existing]);

  for (const item of items) {
    if (!existing.has(item.toLowerCase())) {
      await databases.createDocument(dbId, collectionId, ID.unique(), { name: item });
      console.log(`✅ Added: ${item}`);
    } else {
      console.log(`⏭️ Skipped (already exists): ${item}`);
    }
  }
}

async function main() {
  try {
    await seedCollection(collections.sports, sports, "Sports");
    await seedCollection(collections.cities, cities, "Cities");
    await seedCollection(collections.areas, areas, "Areas");

    console.log("🎉 Seeding complete!");
  } catch (err) {
    console.error("❌ Error seeding data:", err.message);
  }
}

main();
