import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapCards from './MapCards';
import { useState } from 'react';

const HeritageMap = () => {
  // 1. Boundary coordinates (Ensure these match your actual GeoJSON)

  const allHeritageSites = [
  {
    "id": 1,
    "name": "Rajwada Palace",
    "type": "Royal Palace",
    "position": [22.7187, 75.8552],
    "description": "A 200-year-old seven-story structure blending Maratha, Mughal, and French architectural styles.",
    "image": "/images/rajwada.jpg"
  },
  {
    "id": 2,
    "name": "Lal Bagh Palace",
    "type": "Royal Palace",
    "position": [22.7011, 75.8451],
    "description": "Set on 28 acres, this palace features Italian marble floors and gates cast in England.",
    "image": "/images/lalbagh.jpg"
  },
  {
    "id": 3,
    "name": "Gandhi Hall",
    "type": "Civic Heritage",
    "position": [22.7219, 75.8778],
    "description": "An Indo-Gothic masterpiece built in 1904 with red sandstone and a prominent clock tower.",
    "image": "/images/gandhi-hall.jpg"
  },
  {
    "id": 4,
    "name": "Kanch Mandir",
    "type": "Religious",
    "position": [22.7176, 75.8504],
    "description": "A stunning Jain temple where the walls, floor, and ceilings are entirely inlaid with glass.",
    "image": "/images/kanch-mandir.jpg"
  },
  {
    "id": 5,
    "name": "Krishnapura Chhatris",
    "type": "Memorial",
    "position": [22.7171, 75.8569],
    "description": "Royal cenotaphs of the Holkars known for their architectural beauty along the Khan River.",
    "image": "/images/chhatri.jpg"
  },
  {
    "id": 6,
    "name": "Bada Ganpati",
    "type": "Religious",
    "position": [22.7194, 75.8427],
    "description": "Houses a 25-foot tall idol of Ganesha, one of the largest in the world.",
    "image": "/images/bada-ganpati.jpg"
  },
  {
    "id": 7,
    "name": "Khajrana Ganesh Temple",
    "type": "Religious",
    "position": [22.7412, 75.8974],
    "description": "A historic temple built by Rani Ahilyabai Holkar to safeguard the idol from invaders.",
    "image": "/images/khajrana.jpg"
  },
  {
    "id": 8,
    "name": "Central Museum (Indore Museum)",
    "type": "Civic Heritage",
    "position": [22.7118, 75.8732],
    "description": "Features a rich collection of Parmar sculptures and artifacts dating back to the 11th century.",
    "image": "/images/museum.jpg"
  },
  {
    "id": 9,
    "name": "Annapurna Temple",
    "type": "Religious",
    "position": [22.6953, 75.8368],
    "description": "Modeled after the Meenakshi Temple in Madurai, featuring four life-size elephant statues at the gate.",
    "image": "/images/annapurna.jpg"
  },
  {
    "id": 10,
    "name": "Bolya Sarkar Chhatri",
    "type": "Memorial",
    "position": [22.7165, 75.8530],
    "description": "A beautiful stone cenotaph showcasing intricate Maratha architectural carvings.",
    "image": "/images/bolya.jpg"
  },
  {
    "id": 11,
    "name": "Sukh Niwas Palace",
    "type": "Royal Palace",
    "position": [22.6845, 75.8189],
    "description": "The Holkars' summer retreat, connected to the main palace via an underground tunnel.",
    "image": "/images/sukh-niwas.jpg"
  },
  {
    "id": 12,
    "name": "Daly College",
    "type": "Civic Heritage",
    "position": [22.7092, 75.8924],
    "description": "Founded in 1870, its main building is a grand example of Indo-Saracenic architecture.",
    "image": "/images/daly-college.jpg"
  },
  {
    "id": 13,
    "name": "Sarafa Bazaar",
    "type": "Living Heritage",
    "position": [22.7175, 75.8540],
    "description": "Indore's historic jewelry market that transforms into a vibrant night street food hub.",
    "image": "/images/sarafa.jpg"
  },
  {
    "id": 14,
    "name": "Indreshwar Temple",
    "type": "Religious",
    "position": [22.7150, 75.8520],
    "description": "The oldest temple in the city; Indore was named after the presiding deity, Lord Indreshwar.",
    "image": "/images/indreshwar.jpg"
  },
  {
    "id": 15,
    "name": "Yeshwant Club",
    "type": "Civic Heritage",
    "position": [22.7230, 75.8750],
    "description": "A colonial-era club established in 1934 for the Holkar royalty and British officers.",
    "image": "/images/yeshwant-club.jpg"
  },
  {
    "id": 16,
    "name": "Manik Bagh Palace",
    "type": "Royal Palace",
    "position": [22.7080, 75.8620],
    "description": "A rare example of Modernist architecture in India, designed in the 1930s.",
    "image": "/images/manik-bagh.jpg"
  },
  {
    "id": 17,
    "name": "Bijasen Tekri",
    "type": "Religious",
    "position": [22.7245, 75.8050],
    "description": "A hilltop temple offering a panoramic view of the Indore city skyline and airport.",
    "image": "/images/bijasen.jpg"
  },
  {
    "id": 18,
    "name": "Gomatgiri",
    "type": "Religious",
    "position": [22.7480, 75.7950],
    "description": "Features a 21-foot statue of Lord Bahubali and 24 marble temples for the Tirthankaras.",
    "image": "/images/gomatgiri.jpg"
  },
  {
    "id": 19,
    "name": "Chhatri Baag",
    "type": "Memorial",
    "position": [22.7120, 75.8480],
    "description": "A walled garden containing numerous cenotaphs dedicated to members of the Holkar family.",
    "image": "/images/chhatri-baag.jpg"
  },
  {
    "id": 20,
    "name": "White Church",
    "type": "Religious",
    "position": [22.7135, 75.8790],
    "description": "The oldest church in Central India, built in 1858 in typical European style.",
    "image": "/images/white-church.jpg"
  }
];

  const indoreBoundary = {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
       [75.80, 22.78], [75.82, 22.82], [75.88, 22.82], [75.92, 22.80],
      [75.95, 22.75], [75.94, 22.70], [75.90, 22.65], [75.85, 22.62],
      [75.80, 22.64], [75.75, 22.68], [75.75, 22.75], [75.80, 22.78]
      ]]
    }
  };

  // 2. Strict bounds (Southwest, Northeast)
  const indoreBounds = [
    [22.5, 75.6],
    [23.0, 76.1]
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["Religious", "Royal Palace", "Civic Heritage", "Memorial", "Living Heritage"];

  // THE SEARCH LOGIC
  const filteredSites = allHeritageSites.filter(site => {
    const matchesCategory = selectedCategory === "All" || site.type === selectedCategory;
    const searchWords = searchTerm.toLowerCase().split(" ").filter(word => word !== "");
    const matchesSearch = searchWords.every(word => 
      site.name.toLowerCase().includes(word) || 
      site.description.toLowerCase().includes(word)
    );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative h-screen border-8 w-full ">

      {/* FLOATING UI - Must be OUTSIDE MapContainer but INSIDE the relative div */}
      <div className="absolute top-8 left-20 z-4 flex flex-col gap-3 w-full max-w-md">
        <div className="flex bg-white rounded-lg shadow-lg p-2 items-center border">
          <select 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 border-r text-sm font-medium outline-none bg-transparent"
          >
            <option value="All">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input
            type="text"
            placeholder="Search heritage places..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 outline-none text-sm"
          />
        </div>
      </div>

      {/* SINGLE MAP CONTAINER */}
      <MapContainer
        center={[22.7196, 75.8577]}
        zoom={12}
        // --- RESTRICTION SETTINGS ---
        minZoom={12}               // Prevents zooming out too far
        maxZoom={18}               // Normal close-up limit
        maxBounds={indoreBounds}   // Locks the "box" around Indore
        maxBoundsViscosity={1.0}  // Makes the edge hard like a wall
        // ----------------------------
        className="h-full w-full  z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" noWrap={true}
          bounds={indoreBounds} />

        {/* Boundary Line */}
        <GeoJSON
          data={indoreBoundary}
          style={() => ({
            color: '#16a34a',
            weight: 3,
            fillColor: 'transparent',
            opacity: 1
          })}
        />

        {/* Markers or other map-specific components */}
        <MapCards sites={filteredSites} />

      </MapContainer >
    </div>
  );
}

export default HeritageMap;