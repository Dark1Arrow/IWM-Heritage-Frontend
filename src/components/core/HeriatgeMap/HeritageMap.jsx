import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapCards from './MapCards';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHeritage } from "../../../redux/api/operation/heritageApi";

const HeritageMap = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // 1. Create a state for sites, initialized with your default data
  const [sites, setSites] = useState([
    {
      "id": 1,
      "name": "Rajwada Palace",
      "type": "Royal Palace",
      "location": [22.7187, 75.8552],
      "description": "A 200-year-old seven-story structure blending Maratha, Mughal, and French architectural styles.",
      "image": "/images/rajwada.jpg"
    },
    // ... rest of your 20 default sites
    {
      "id": 20,
      "name": "White Church",
      "type": "Religious",
      "location": [22.7135, 75.8790],
      "description": "The oldest church in Central India, built in 1858 in typical European style.",
      "image": "/images/white-church.jpg"
    }
  ]);

  // 2. Fetch data from API
  useEffect(() => {
    const fetchHeritageData = async () => {
      try {
        const res = await dispatch(getAllHeritage(token));
        // Check if response exists and has data
        if (res  && res.length > 0) {
          setSites(res); 
        }
      } catch (error) {
        console.error("Failed to fetch heritage sites, using defaults:", error);
        // State remains as the initial default data
      }
    };

    fetchHeritageData();
  }, [dispatch, token]);

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

  const indoreBounds = [[22.5, 75.6], [23.0, 76.1]];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ['Religious', 'Architectural', 'Commercial', 'Natural', 'Memorial', 'Museums', 'Memrorial', 'Food', 'Markets'];

  // 3. Filter using the 'sites' state variable
  const filteredSites = sites.filter(site => {
    const matchesCategory = selectedCategory === "All" || site.heritageType === selectedCategory;
    const searchWords = searchTerm.toLowerCase().split(" ").filter(word => word !== "");
    const matchesSearch = searchWords.every(word => 
      site.name.toLowerCase().includes(word) || 
      site.about.content.toLowerCase().includes(word)
    );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative h-[calc(100vh-64px)] w-full ">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0 z-[1000] flex flex-col gap-3 w-[90%] md:w-full md:max-w-md">
        <div className="flex bg-white rounded-lg shadow-xl p-1 items-center border border-gray-200">
          <select 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2 py-2 border-r text-[12px] md:text-sm font-semibold outline-none bg-transparent cursor-pointer"
          >
            <option value="All">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input
            type="text"
            placeholder="Search heritage places..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 outline-none text-[12px] md:text-sm"
          />
        </div>
      </div>

      <MapContainer
        center={[22.7196, 75.8577]}
        zoom={13}
        minZoom={12}
        maxZoom={18}
        maxBounds={indoreBounds}
        maxBoundsViscosity={1.0}
        className="h-full w-full z-0"
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          noWrap={true}
          bounds={indoreBounds} 
        />

        <GeoJSON
          data={indoreBoundary}
          style={() => ({
            color: 'transparent',
            weight: 3,
            fillColor: 'transparent',
            opacity: 1
          })}
        />
        {/* {console.log("filteredSites", filteredSites)} */}
        <MapCards sites={filteredSites} />
      </MapContainer >
    </div>
  );
}

export default HeritageMap;