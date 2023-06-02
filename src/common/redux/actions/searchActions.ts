import { SET_SEARCH_TERM, SearchActionTypes } from "../types/searchActionTypes";

export const setSearchTerm = (term: string): SearchActionTypes => ({
  type: SET_SEARCH_TERM,
  payload: term,
});
