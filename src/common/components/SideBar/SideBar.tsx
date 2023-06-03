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
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/actions/searchActions";
import "./_sidebar.scss";

const SideBar: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("/");
  const [searchInput, setSearchInput] = useState<string>("");

  const dispatch = useDispatch();

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchTerm(searchInput));
    console.log("Performing search for:", searchInput);
  };

  /**
   * Renders a side bar option.
   *
   * @param link The link to navigate to when the option is clicked.
   * @param icon The icon to display for the option.
   * @param text The text to display for the option.
   * @param selected Whether the option is currently selected.
   * @returns The rendered side bar option.
   */
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
