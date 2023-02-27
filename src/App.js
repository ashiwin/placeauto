import React, { useState, useEffect } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { CircularProgress, Grid, TextField, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const WrappedMap = withGoogleMap(({ coordinates }) => {
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


const GooglePlacesAutocomplete = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 3.1569, lng: 101.7123 });

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    const results = await geocodeByAddress(selectedAddress);
    const latLng = await getLatLng(results[0]);
    setCoordinates(latLng);
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={10} lg={8}>
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            googleCallbackName="initGoogleAutocomplete"
            apiKey='AIzaSyCLyCoeqN2jJr4xJeK7k65Oa3foM-fYArg'
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <TextField
                    fullWidth={true}
                    variant="standard"
                    type="search"
                    {...getInputProps({
                      label: 'Search',
                      placeholder: 'Search place name, address, or plus code',
                      inputProps: {style: { fontSize: '1.1rem'}}
                    })}
                  />
                  <div>
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      suggestions.map((suggestion) => {
                        return (
                          <div {...getSuggestionItemProps(suggestion, { style: { fontSize: '1.1rem' } })}>
                            {suggestion.description}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
          </PlacesAutocomplete>
          <WrappedMap
            containerElement={<div style={{ height: '90vh' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            coordinates={coordinates}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default GooglePlacesAutocomplete;
// Ashiwin Kumar for Maybank, 2023
