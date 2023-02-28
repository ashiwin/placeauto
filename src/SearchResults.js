import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

const SearchResults = ({ results, updateCoordinates }) => {
  const handleButtonClick = (result) => {
    updateCoordinates(result.latLng);
  }

  return (
    <div>
      {results.map((result, index) => (
        <Button
          key={index}
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick(result)}
        >
          {result.address}
        </Button>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    results: state.results,
  };
};

export default connect(mapStateToProps)(SearchResults);
