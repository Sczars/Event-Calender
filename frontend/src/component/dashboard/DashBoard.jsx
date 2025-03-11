import { useState, useRef } from "react";
import DropDown from "./DropDown";
import "../../css/dashboard.css";
import filter_img from "../../assets/filter.png";
import SlideShow from "./Slideshow";
import CreateEvent from "./EventCreate";
import PropTypes from "prop-types";

function DashBoard(props) {
  const typeLabel = ["Normal", "Caution", "Extreme"];
  const statusLabel = ["Finished", "Miss", "onGoing"];
  const [filter, setFilter] = useState({
    type: Object.fromEntries(typeLabel.map((key) => [key, null])),
    status: Object.fromEntries(statusLabel.map((key) => [key, null])),
  });

  const [isAdd, setIsAdd] = useState(null);
  const [filterShown, setFilterShown] = useState(false);
  const filterRef = useRef(null);
  const [isShown, setIsShown] = useState(0);

  function handleCheckBox(category, key, value) {
    setFilter((prev) => ({
      ...prev,
      [category]: { ...prev[category], [key]: value ? true : false },
    }));
  }

  function filterEvents(formData) {
    typeLabel.map((item) => {
      handleCheckBox("type", item, formData.get(item));
    });

    statusLabel.map((item) => {
      handleCheckBox("status", item, formData.get(item));
    });

    setFilterShown((prev) => !prev);
  }

  const weekDropdown = (
    <DropDown
      id="dd-week"
      items={props.weekEvents}
      setIsShown={setIsShown}
      filter={filter}
      reRender={props.reRender}
    />
  );
  const monthDropdown = (
    <DropDown
      id="dd-month"
      items={props.monthEvents}
      setIsShown={setIsShown}
      filter={filter}
      reRender={props.reRender}
    />
  );
  const slideshow = <SlideShow items={props.todayEvents} />;

  const filterSection = (
    <div className="filter">
      <form id="filter" className="filter-form" action={filterEvents}>
        <div className="filter-options">
          <h3>Type:</h3>
          {typeLabel.map((item, index) => (
            <label key={index}>
              <input type="checkbox" name={item} />
              {item}
            </label>
          ))}
        </div>
        <div className="filter-options">
          <h3>Status:</h3>
          {statusLabel.map((item, index) => (
            <label key={index}>
              <input type="checkbox" name={item} />
              {item}
            </label>
          ))}
        </div>
        <button type="submit">Filter</button>
      </form>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div className="button-nav">
          <button
            className="button-add"
            onClick={() => {
              setIsAdd((prev) => !prev);
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              setFilterShown((prev) => !prev);
            }}
            ref={filterRef}
            className="button-filter"
          >
            <img src={filter_img} alt="filter" />
          </button>
          {filterShown && filterSection}
        </div>
        {isShown === 0 || isShown === 1 ? weekDropdown : null}
        {isShown === 0 || isShown === 2 ? monthDropdown : null}
        {isShown === 0 ? slideshow : null}
      </div>
      {isAdd && <CreateEvent toggle={setIsAdd} reRender={props.reRender} />}
    </div>
  );
}

DashBoard.propTypes = {
  reRender: PropTypes.func.isRequired,
  monthEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
    })
  ),
  weekEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
    })
  ),
  todayEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
    })
  ),
};

export default DashBoard;
