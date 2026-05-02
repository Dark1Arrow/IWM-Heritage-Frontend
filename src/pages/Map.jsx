import React, { useEffect } from 'react'
import HeritageMap from "../components/core/HeriatgeMap/HeritageMap"

const Map = () => {
  useEffect(() => {
  console.log("ENV: ", import.meta.env.VITE_API_URL) 
},[])
  return (
    <div>
      <HeritageMap/>
    </div>
  )
}

export default Map
