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

const Discover: React.FC<IDiscoverProps> = () => {
  const [newReleases, setNewReleases] = useState<Array<Release>>([]);
  const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
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

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((response) => response.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  useEffect(() => {
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
