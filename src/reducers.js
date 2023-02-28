import { combineReducers } from 'redux';
import searchResultsReducer from './searchResultsSlice';

const rootReducer = combineReducers({
  results: searchResultsReducer,
});

// const initialState = {
//   query: '',
//   results: [],
// };
//
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SEARCH':
//       return { ...state, query: action.payload };
//     default:
//       return state;
//   }
// };

export default rootReducer;
