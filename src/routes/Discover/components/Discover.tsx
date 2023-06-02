import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SearchState } from "../../../common/redux/types/searchTypes";
import { setSearchTerm } from "../../../common/redux/actions/searchActions";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";

interface IDiscoverProps {
  searchInput: string;
  setSearchTerm: (term: string) => void;
  // Add other relevant props here
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
     * Fetch new releases from Spotify API
     * @param token Access token for Spotify API authentication
     */
    const fetchNewReleases = async (token: string) => {
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

        setNewReleases(data.albums.items);
      } catch (error) {
        console.error("Error fetching new releases:", error);
      }
    };

    /**
     * Fetch featured playlists from Spotify API
     * @param token Access token for Spotify API authentication
     */
    const fetchFeaturedPlaylists = async (token: string) => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/browse/featured-playlists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching featured playlists");
        }

        const data = await response.json();

        setPlaylists(data.playlists.items);
        console.log("playlists", data.playlists.items);
      } catch (error) {
        console.error("Error fetching featured playlists:", error);
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

        setCategories(data.categories.items);
        console.log("categories", data.categories.items);
      } catch (error) {
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
    const fetchArtistData = async (token: string) => {
      console.log("searchInput", searchInput);
      if (searchInput !== searchKey && searchInput.length > 0) {
        setSearchKey(searchInput);

        try {
          const artistParameters = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };

          const artistResponse = await fetch(
            `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
            artistParameters
          );

          if (!artistResponse.ok) {
            throw new Error("Error fetching artist data");
          }

          const data = await artistResponse.json();
          console.log("artistData", data.artists);

          setDiscography(data.artists);
          // Process artist data here
        } catch (error) {
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
          imagesKey="icons"
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: SearchState) => ({
  searchInput: state.searchTerm,
});

const mapDispatchToProps = {
  setSearchTerm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
