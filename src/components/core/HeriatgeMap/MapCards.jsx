import React from 'react'
import { Marker, Popup, useMap } from 'react-leaflet';

const MapCards = ({ sites }) => {

    return (
        <div>
            {sites.map(site => (
                <Marker key={site.id} position={site.position}>
                    {/* 3. POPUP UI (Similar to Gandhi Hall card) */}
                    <Popup className="custom-popup">
                        <div className="w-64 overflow-hidden rounded-lg">
                            <img src="/gandhi-hall.jpg" alt="Gandhi Hall" className="w-full h-32 object-cover" />
                            <div className="p-3">
                                <h3 className="font-bold text-lg uppercase">{site.name}</h3>
                                <p className="text-xs text-gray-600 mb-4">{site.description}</p>
                                <div className="flex justify-between border-t pt-2 text-blue-600 text-xs font-semibold">
                                    <span>SAVE</span>
                                    <span>SHARE</span>
                                    <span>DIRECTIONS</span>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </div>
    )
}

export default MapCards
