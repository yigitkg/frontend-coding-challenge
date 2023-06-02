import {
  SET_SEARCH_TERM,
  SearchActionTypes,
  SearchState,
} from "../types/searchTypes";

const initialState: SearchState = {
  searchTerm: "",
};

const searchReducer = (
  state = initialState,
  action: SearchActionTypes
): SearchState => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
