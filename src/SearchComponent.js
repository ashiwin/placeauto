import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { CircularProgress, TextField } from '@material-ui/core';

const SearchComponent = ({ setCoordinates, apiKey }) => {
  const [address, setAddress] = useState('');

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    const results = await geocodeByAddress(selectedAddress);
    const latLng = await getLatLng(results[0]);
    setCoordinates(latLng);
  }

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        googleCallbackName="initGoogleAutocomplete"
        apiKey={apiKey}
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
    </div>
  );
};

export default SearchComponent;
