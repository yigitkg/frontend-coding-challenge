import React from "react";
import "../styles/_discover-item.scss";

interface Image {
  url: string;
}

interface IDiscoverItemProps {
  images: Array<Image>;
  name: string;
}

export default class DiscoverItem extends React.Component<IDiscoverItemProps> {
  render = () => {
    const { images, name } = this.props;
    return (
      <div className="discover-item animate__animated animate__fadeIn">
        <div
          className="discover-item__art"
          style={{ backgroundImage: `url(${images[0].url})` }}
        />
        <p className="discover-item__title">{name}</p>
      </div>
    );
  };
}
