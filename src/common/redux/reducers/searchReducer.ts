import {
  SET_SEARCH_TERM,
  SearchActionTypes,
  SearchState,
} from "../types/searchTypes";

const initialState: SearchState = {
  searchTerm: "",
};

/**
 * Reducer function for search-related state
 * @param state Current state of the search-related state
 * @param action Action to perform on the state
 * @returns Updated state
 */
const searchReducer = (
  state = initialState, // Initial state
  action: SearchActionTypes // Action type
): SearchState => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      // Update the search term in the state
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
