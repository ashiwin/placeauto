import React, { useState } from 'react';
import { Grid, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import SearchComponent from './SearchComponent';
import MapComponent from './MapComponent';

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

const App = () => {
  const [coordinates, setCoordinates] = useState({ lat: 3.1569, lng: 101.7123 });
  const [apiKey] = useState('AIzaSyCLyCoeqN2jJr4xJeK7k65Oa3foM-fYArg');

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={10} lg={8}>
          <SearchComponent setCoordinates={setCoordinates} apiKey={apiKey} />
          <MapComponent
            containerElement={<div style={{ height: '90vh' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            coordinates={coordinates}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
