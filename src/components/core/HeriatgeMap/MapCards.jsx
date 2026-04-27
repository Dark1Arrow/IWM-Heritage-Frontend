import { Link } from 'react-router-dom';
import React from 'react'
import { Marker, Popup } from 'react-leaflet';

const MapCards = ({ sites }) => {
    if (!sites || !Array.isArray(sites)) return null;

    return (
        <>
            {sites.map((site, index) => {
                // Determine the correct coordinate field (backend might use position or location)
                // console.log("hey there this is lat & log", site.location.coordinates)
                // console.log("hey there this is lat & log", site.location)
                let pos;
                if (site?.location?.length > 0) {
                    pos = site.location;
                }else{
                    pos = site.location.coordinates;
                }

                console.log("pos", pos)
                
                if (!pos || !Array.isArray(pos) || pos.length < 2) return null;
                return (
                    <Marker
                        key={site.id || site._id || index}
                        position={pos}
                    >
                        <Popup className="custom-popup">
                            <Link to={`/heritage-details/${site._id}`}>
                                <div className="w-64 overflow-hidden rounded-lg">
                                    {console.log(site)}
                                    <img
                                        src={site.mainImage || "/gandhi-hall.jpg"}
                                        alt={site.name}
                                        className="w-full h-32 object-cover"
                                    />
                                    <div className="p-3">
                                        <h3 className="font-bold text-lg uppercase">{site.name}</h3>
                                        <p className="text-xs text-gray-600 mb-4">{site.tagline}</p>
                                        <div className="flex justify-between border-t pt-2 text-blue-600 text-xs font-semibold">
                                            <span>SAVE</span>
                                            <span>SHARE</span>
                                            <span>DIRECTIONS</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Popup>
                    </Marker>
                );
            })}
        </>
    )
}

export default MapCards