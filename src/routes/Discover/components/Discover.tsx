import React, { useEffect, useState } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";

interface IDiscoverProps {}

interface IDiscoverState {
  newReleases: Array<Release>;
  playlists: Array<Playlist>;
  categories: Array<Category>;
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
/**
 * Discover component that fetches new releases, featured playlists, and categories from Spotify API
 * @returns React functional component
 */
const Discover: React.FC<IDiscoverProps> = () => {
  // State hooks to store fetched data and access token
  const [newReleases, setNewReleases] = useState<Array<Release>>([]);
  const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [accessToken, setAccessToken] = useState<string>("");

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
    </div>
  );
};

export default Discover;
