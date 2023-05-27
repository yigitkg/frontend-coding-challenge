import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";

//TODO: Fix `any` types here

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

  //TODO: Handle APIs

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
