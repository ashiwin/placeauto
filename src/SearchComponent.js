import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { CircularProgress, TextField } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { addSearchResult } from './searchResultsSlice';

const SearchComponent = ({ setCoordinates, apiKey }) => {
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    const results = await geocodeByAddress(selectedAddress);
    const latLng = await getLatLng(results[0]);
    setCoordinates(latLng);
    dispatch(addSearchResult({ address: selectedAddress, latLng }));
  }

  return (
    <div style={{ position: 'relative', width: '100%', zIndex: 100 }}>
      <div style={{ position: 'absolute', width: '100%', backgroundColor: '#fff' }}>
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
                        <div {...getSuggestionItemProps(suggestion, { style: { fontSize: '1.1rem', fontFamily: 'Roboto, sans-serif', fontWeight: 'normal', lineHeight: '1.5', color: '#333' } })}>
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
    </div>
  );
};

export default SearchComponent;
