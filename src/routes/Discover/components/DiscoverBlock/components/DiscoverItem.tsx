import React from "react";
import "../styles/_discover-item.scss";

interface Image {
  url: string;
}

interface IDiscoverItemProps {
  images: Image[];
  name: string;
}

export default class DiscoverItem extends React.Component<IDiscoverItemProps> {
  render = () => {
    const { images, name } = this.props;
    console.log("images", images);
    console.log("name", name);

    if (!images || images.length === 0) {
      return null; // Return null if images array is empty or undefined
    }

    const imageUrl = images[0]?.url; // Access the URL property safely using optional chaining

    if (!imageUrl) {
      return null; // Return null if the URL is undefined
    }

    return (
      <div className="discover-item animate__animated animate__fadeIn">
        <div
          className="discover-item__art"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <p className="discover-item__title">{name}</p>
      </div>
    );
  };
}
