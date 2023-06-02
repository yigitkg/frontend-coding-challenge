export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

export interface SearchState {
  searchTerm: string;
}

interface SetSearchTermAction {
  type: typeof SET_SEARCH_TERM;
  payload: string;
}

export type SearchActionTypes = SetSearchTermAction;
