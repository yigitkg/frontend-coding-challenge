import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import DiscoverItem from "./DiscoverItem";
import "../styles/_discover-block.scss";

const scrollContainer = (
  id: string,
  options: { isNegative?: boolean } = {}
) => {
  return () => {
    const scrollableContainer: HTMLElement | null = document.getElementById(id);
    if (scrollableContainer) {
      const amount = options.isNegative
        ? -scrollableContainer.offsetWidth
        : scrollableContainer.offsetWidth;

      scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
    }
  };
};

interface IDiscoverBlockProps {
  text: string;
  id: string;
  data: Array<DataItem>;
  imagesKey: string;
}

interface DataItem {
  [key: string]: any;
}

export default class DiscoverBlock extends React.Component<IDiscoverBlockProps> {
  static defaultProps = {
    imagesKey: "images",
  };

  render() {
    const { text, id, data, imagesKey } = this.props;
    return (
      <div className="discover-block">
        <div className="discover-block__header">
          <h2>{text}</h2>
          <span />
          {data.length ? (
            <div className="animate__animated animate__fadeIn">
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={scrollContainer(id, { isNegative: true })}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={scrollContainer(id)}
              />
            </div>
          ) : null}
        </div>
        <div className="discover-block__row" id={id}>
          {data.map(({ [imagesKey]: images, name }: DataItem) => (
            <DiscoverItem key={name} images={images} name={name} />
          ))}
        </div>
      </div>
    );
  }
}
