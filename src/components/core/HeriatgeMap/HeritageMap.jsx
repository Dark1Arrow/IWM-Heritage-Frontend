import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapCards from './MapCards';

const HeritageMap = () => {
  // 1. Boundary coordinates (Ensure these match your actual GeoJSON)
  const indoreBoundary = {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
        [75.7, 22.6], [76.0, 22.6], [76.0, 22.9], [75.7, 22.9], [75.7, 22.6]
      ]]
    }
  };

  // 2. Strict bounds (Southwest, Northeast)
  const indoreBounds = [
    [22.5, 75.6],
    [23.0, 76.1]
  ];

  return (
    <div className="relative h-screen w-full bg-green-100">

      {/* FLOATING UI - Must be OUTSIDE MapContainer but INSIDE the relative div */}
      <div className="absolute top-20 left-4 z- flex flex-col gap-3 w-full max-w-md">
        <div className="flex bg-white rounded-lg shadow-lg p-2 items-center border">
          <button className="px-3 border-r text-sm font-medium flex items-center gap-1">
            All Categories <span className="text-xs">▼</span>
          </button>
          <input
            type="text"
            placeholder="Search heritage places"
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
        className="height: '100%', width: '100%', zIndex: 0"
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
        <MapCards />

      </MapContainer>
    </div>
  );
}

export default HeritageMap;