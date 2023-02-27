import React, { useState, useEffect } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapComponent = withGoogleMap(({ coordinates }) => {
  const [center, setCenter] = useState(coordinates);

  useEffect(() => {
    setCenter(coordinates);
  }, [coordinates]);

  return (
    <GoogleMap
      defaultZoom={15}
      center={center}
    >
      <Marker position={coordinates} />
    </GoogleMap>
  );
});

export default MapComponent;
