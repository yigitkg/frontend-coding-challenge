import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SearchState } from "../../../common/redux/types/searchTypes";
import { setSearchTerm } from "../../../common/redux/actions/searchActions";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";

interface IDiscoverProps {
  searchInput: string;
  setSearchTerm: (term: string) => void;
}

interface IDiscoverState {
  newReleases: Array<Release>;
  playlists: Array<Playlist>;
  categories: Array<Category>;
  discography: Array<Discography>;
}

interface Release {
  title: string;
  artist: string;
}

interface Playlist {
  name: string;
  songs: Array<string>;
}

interface Category {
  name: string;
  description: string;
}

interface Discography {
  name: string;
  songs: Array<string>;
}

const Discover: React.FC<IDiscoverProps> = ({ searchInput, setSearchTerm }) => {
  // State hooks to store fetched data and access token
  const [newReleases, setNewReleases] = useState<Array<Release>>([]);
  const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [discography, setDiscography] = useState<Array<Discography>>([]);
  const [accessToken, setAccessToken] = useState<string>("");
  const [searchKey, setSearchKey] = useState<string>("");

  // Fetch access token on component mount
  useEffect(() => {
    // Request body for Spotify API authentication
    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        process.env.REACT_APP_SPOTIFY_CLIENT_ID +
        "&client_secret=" +
        process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
    };

    // Fetch access token from Spotify API
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((response) => response.json())
      .then((data) => {
        setAccessToken(data.access_token);
        console.log("data.access_token: ", data.access_token);
      });
  }, []);

  // Fetch new releases, featured playlists, and categories on access token update
  useEffect(() => {
    /**
     * Fetches new releases from the Spotify API
     * @param token Access token for Spotify API authentication
     * @returns {Promise<void>} Promise that resolves when the new releases have been fetched and stored
     */
    const fetchNewReleases = async (token: string): Promise<void> => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/browse/new-releases",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching new releases");
        }

        const data = await response.json();

        // Replace with actual code to store new releases
        setNewReleases(data.albums.items);
      } catch (error) {
        console.error("Error fetching new releases:", error);
      }
    };

    /**
     * Fetches featured playlists from Spotify API
     * @param token Access token for Spotify API authentication
     */
    const fetchFeaturedPlaylists = async (token: string) => {
      try {
        // Send a GET request to Spotify API to fetch featured playlists
        const response = await fetch(
          "https://api.spotify.com/v1/browse/featured-playlists",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach access token to request headers
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching featured playlists"); // Throw an error if response status is not ok
        }

        const data = await response.json(); // Parse response data as JSON

        setPlaylists(data.playlists.items); // Update playlists state with fetched playlists
        console.log("playlists", data.playlists.items); // Log fetched playlists to console
      } catch (error) {
        console.error("Error fetching featured playlists:", error); // Log any errors that occur during the fetch request
      }
    };

    /**
     * Fetch categories from Spotify API
     * @param token Access token for Spotify API authentication
     */
    const fetchCategories = async (token: string) => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/browse/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching categories");
        }

        const data = await response.json();

        // Set categories in state and log them
        setCategories(data.categories.items);
        console.log("categories", data.categories.items);
      } catch (error) {
        // Log error if categories fetch fails
        console.error("Error fetching categories:", error);
      }
    };

    // Fetch data if access token is available
    if (accessToken) {
      fetchNewReleases(accessToken);
      fetchFeaturedPlaylists(accessToken);
      fetchCategories(accessToken);
    }
  }, [accessToken]);

  /**
   * This function is responsible for fetching artist data from the Spotify API.
   * It takes no parameters and returns nothing.
   */
  useEffect(() => {
    /**
     * Fetches artist data from Spotify API
     * @param {string} token - Authorization token for Spotify API
     */
    const fetchArtistData = async (token: string) => {
      // Log search input
      console.log("searchInput", searchInput);

      // Only perform search if searchInput has changed
      if (searchInput !== searchKey && searchInput.length > 0) {
        // Update search key
        setSearchKey(searchInput);

        try {
          const artistParameters = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };

          // Fetch artist data from Spotify API
          const artistResponse = await fetch(
            `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
            artistParameters
          );

          // If response is not OK, throw an error
          if (!artistResponse.ok) {
            throw new Error("Error fetching artist data");
          }

          // Parse response data
          const data = await artistResponse.json();

          // Log artist data
          console.log("artistData", data.artists.items);

          // Update discography state with artist data
          setDiscography(data.artists.items);

          // Process artist data here
        } catch (error) {
          // Log error if fetch fails
          console.error("Error fetching artist data:", error);
        }
      }
    };

    if (accessToken && searchInput.length > 0) {
      fetchArtistData(accessToken);
    }
  }, [searchInput, accessToken]);

  return (
    <div className="discover">
      <DiscoverBlock
        text="RELEASED THIS WEEK"
        id="released"
        data={newReleases}
      />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
      <DiscoverBlock
        text="BROWSE"
        id="browse"
        data={categories}
        imagesKey="icons"
      />
      {searchKey && accessToken && (
        <DiscoverBlock
          text="SEARCH RESULTS"
          id="search"
          data={discography}
          /* imagesKey="icons" */
        />
      )}
    </div>
  );
};

/**
 * Maps the state to props for the Search component.
 *
 * @param state The current state of the application.
 * @returns An object containing the searchInput prop.
 */
const mapStateToProps = (state: SearchState) => ({
  // The searchInput prop is derived from the searchTerm slice of the state.
  searchInput: state.searchTerm,
});

const mapDispatchToProps = {
  setSearchTerm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
