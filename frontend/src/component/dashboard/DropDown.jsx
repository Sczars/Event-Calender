import "../../css/dropdown.css";
import { useState } from "react";
import Popup from "./Popup";
import PropTypes from "prop-types";

function DropDown(props) {
  const overflowNum = 3;
  const [isClicked, setIsClicked] = useState(false);
  const [isPopupShown, setIsPopupShown] = useState(null);

  function getDetail(e) {
    setIsPopupShown(
      props.items.find((item) => item.id === e.currentTarget.value)
    );
  }

  function filterCategoryCheck(category) {
    return Object.values(props.filter[category]).every(
      (value) => value === null || value === false
    );
  }

  const returnOption = (item, index) => {
    const cond1 = filterCategoryCheck("status")
      ? true
      : props.filter["status"][item.status];
    const cond2 = filterCategoryCheck("type")
      ? true
      : props.filter["type"][item.type];

    if (cond1 && cond2) {
      return (
        <div key={index} className={`event-option`}>
          <div className="event-detail">
            <p className={`status ${item.status}`}></p>
            <p>{item.name}</p>
          </div>
          <button
            value={item.id}
            onClick={getDetail}
            className="more-detail-btn"
          >
            {">>"}
          </button>
        </div>
      );
    } else {
      return (
        cond1 &&
        cond2 && (
          <div key={index} className={`event-option`}>
            <div className="event-detail">
              <p className={`status ${item.status}`}></p>
              <p>{item.name}</p>
            </div>
            <button
              value={item.id}
              onClick={getDetail}
              className="more-detail-btn"
            >
              {">>"}
            </button>
          </div>
        )
      );
    }
  };

  function toggleShown() {
    if (props.items.length > 0) {
      setIsClicked((prev) => !prev);
      if (!isClicked) {
        props.setIsShown(props.id === "dd-week" ? 1 : 2);
      } else {
        props.setIsShown(0);
      }
    } else {
      alert("There is no event");
    }
  }

  return (
    <>
      <div className={`dropdown${isClicked ? " popIn" : ""}`}>
        <button onClick={toggleShown}>
          Event this {props.id === "dd-week" ? "week" : "month"}
        </button>
        <div
          className={`dropdown-events ${
            props.items.length > overflowNum ? "dropdown-overflow" : null
          }`}
        >
          {isClicked &&
            props.items.map((item, index) => returnOption(item, index))}
        </div>
      </div>
      {isPopupShown !== null && (
        <Popup
          reRender={props.reRender}
          items={[isPopupShown]}
          setPopup={setIsPopupShown}
        />
      )}
    </>
  );
}

DropDown.propTypes = {
  id: PropTypes.string.isRequired,
  reRender: PropTypes.func.isRequired,
  setIsShown: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
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
  filter: PropTypes.shape({
    type: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.oneOf([null]),
      ])
    ),
    status: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.oneOf([null]),
      ])
    ),
  }),
};

export default DropDown;
