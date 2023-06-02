import React, { useState } from "react";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphonesAlt,
  faHeart,
  faPlayCircle,
  faSearch,
  faStream,
} from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Avatar } from "../../../assets/images/avatar.svg";
import "./_sidebar.scss";

const SideBar: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("/");
  const [searchInput, setSearchInput] = useState<string>("");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    // Perform the API call with the searchInput value
    console.log("Performing search for:", searchInput);
  };

  const renderSideBarOption = (
    link: string,
    icon: any,
    text: string,
    { selected }: { selected?: boolean } = {}
  ) => {
    return (
      <div
        className={cx("sidebar__option", {
          "sidebar__option--selected": selected,
        })}
        onClick={() => handleOptionClick(link)}
      >
        <FontAwesomeIcon icon={icon} />
        <p>{text}</p>
      </div>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <Avatar />
        <p>Bob Smith</p>
      </div>
      <div className="sidebar__options">
        {renderSideBarOption("/", faHeadphonesAlt, "Discover", {
          selected: selectedOption === "/",
        })}
        {renderSideBarOption("/search", faSearch, "Search", {
          selected: selectedOption === "/search",
        })}
        {selectedOption === "/search" && (
          <div className="sidebar__search">
            <input
              type="text"
              placeholder="Enter a search term"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <button onClick={handleSearch}>Explore</button>
          </div>
        )}
        {renderSideBarOption("/favourites", faHeart, "Favourites", {
          selected: selectedOption === "/favourites",
        })}
        {renderSideBarOption("/playlists", faPlayCircle, "Playlists", {
          selected: selectedOption === "/playlists",
        })}
        {renderSideBarOption("/charts", faStream, "Charts", {
          selected: selectedOption === "/charts",
        })}
      </div>
    </div>
  );
};

export default SideBar;
