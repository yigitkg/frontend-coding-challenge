import React, { Component } from "react";
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

export default class Discover extends Component<
  IDiscoverProps,
  IDiscoverState
> {
  constructor(props: IDiscoverProps) {
    super(props);

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchNewReleases();
    this.fetchFeaturedPlaylists();
    this.fetchCategories();
  }

  fetchNewReleases = async () => {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/browse/new-releases",
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching new releases");
      }

      const data = await response.json();

      this.setState({ newReleases: data.albums.items });
    } catch (error) {
      console.error("Error fetching new releases:", error);
    }
  };

  fetchFeaturedPlaylists = async () => {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/browse/featured-playlists",
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching featured playlists");
      }

      const data = await response.json();

      this.setState({ playlists: data.playlists.items });
    } catch (error) {
      console.error("Error fetching featured playlists:", error);
    }
  };

  fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/browse/categories",
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching categories");
      }

      const data = await response.json();

      this.setState({ categories: data.categories.items });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
