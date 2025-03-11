import "../../css/slideshow.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function SlideShow(props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (props.items.length > 0) {
      const timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % props.items.length);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [index]);

  function changePrev() {
    setIndex((prev) => (prev - 1 + props.items.length) % props.items.length);
  }

  function changeNext() {
    setIndex((prev) => (prev + 1 + props.items.length) % props.items.length);
  }

  return (
    <div className="slideshow">
      {props.items.length > 0 ? (
        <>
          <div className={`ss-header ${props.items[index]?.type}`}>
            <p className={props.items[index]?.status}></p>
            <h3>{props.items[index]?.name}</h3>
          </div>

          <div className="ss-detail">
            <p>Time: {props.items[index]?.date}</p>
            <p>Duration: {props.items[index]?.duration}s</p>
            <p>Note: {props.items[index]?.note}</p>
          </div>

          {props.items.length > 1 && (
            <>
              <button className="left" onClick={changePrev}>
                {"<"}
              </button>
              <button className="right" onClick={changeNext}>
                {">"}
              </button>
            </>
          )}
        </>
      ):<p>There is no event</p>}
    </div>
  );
}

SlideShow.propTypes = {
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
};

export default SlideShow;
