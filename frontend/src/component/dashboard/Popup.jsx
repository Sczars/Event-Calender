import { useState } from "react";
import PropTypes from "prop-types";

function Popup(props) {
  const [isEdited, setIsEdited] = useState(false);

  function delEvent(item) {
    fetch("http://localhost:8000/del-event", {
      method: "POST",
      header: {
        "Content-Type": "application'json",
      },
      body: JSON.stringify({
        id: item.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.reRender();
      })
      .catch((error) => console.error("Error:", error));
  }

  function editEvent(formData) {
    console.log(formData.get("id"));
    fetch("http://localhost:8000/edit-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: formData.get("id"),
        name: formData.get("name"),
        date: formData.get("date"),
        duration: formData.get("duration"),
        type: formData.get("type"),
        status: formData.get("status"),
        note: formData.get("note"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.reRender();
        closePopup();
      })
      .catch((error) => console.error("Error:", error));
  }

  function closePopup() {
    document.querySelector(".background").disable = true;
    props.setPopup(null);
  }

  function detailEdited(item) {
    return (
      <form action={editEvent}>
        <input
          name="id"
          type="text"
          defaultValue={item.id}
          id="event-form-id"
        />
        <label>
          Type:
          <select name="type" required defaultValue={item.type}>
            <option value="default" disabled>
              ---Choose event type---
            </option>
            <option value="Normal">Normal</option>
            <option value="Caution">Caution</option>
            <option value="Extreme">Extreme</option>
          </select>
        </label>
        <label>
          Status:
          <select name="status" required defaultValue={item.status}>
            <option value="default" disabled>
              ---Choose event status---
            </option>
            <option value="onGoing">onGoing</option>
            <option value="Finished">Finished</option>
            <option value="Miss">Miss</option>
          </select>
        </label>
        <label>
          Name:
          <input name="name" type="text" defaultValue={item.name} />
        </label>
        <label>
          Date:
          <input name="date" type="text" defaultValue={item.date} />
        </label>
        <label>
          Duration:
          <input name="duration" type="text" defaultValue={item.duration} />
        </label>
        <label>Note:</label>
        <textarea name="note" defaultValue={item.note}></textarea>
        <button
          type="button"
          className="discard-change"
          onClick={() => {
            setIsEdited((prev) => !prev);
          }}
        >
          Discard
        </button>
        <button type="submit" className="popup-event">
          Save
        </button>
      </form>
    );
  }

  return (
    <>
      <div className="background"></div>

      <section className="popup-section fadeIn">
        {props.items.map((item, index) => (
          <div key={`event-${index}`} className="popup">
            <div className={`status ${item.status}`}></div>
            <div className={`detail ${item.type}`}>
              {!isEdited ? (
                <>
                  <h1>
                    {item.name}
                    <button
                      onClick={() => {
                        setIsEdited((prev) => !prev);
                      }}
                      className="type"
                    >
                      &#8942;
                    </button>
                  </h1>
                  <p>
                    <span>Date:</span> {item.date}
                  </p>
                  <p>
                    <span>Duration:</span> {item.duration}s
                  </p>
                  <div className="note-container">
                    <p><span>Note:</span></p>
                    <p className="note">
                      {item.note}
                    </p>
                  </div>
                  <button
                    className="popup-event"
                    onClick={() => {
                      delEvent(item);
                      closePopup();
                    }}
                  >
                    Delete
                  </button>
                </>
              ) : (
                detailEdited(item)
              )}
            </div>
          </div>
        ))}
        <div className="close" onClick={() => closePopup()}>
          X
        </div>
      </section>
    </>
  );
}

Popup.propTypes = {
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
  reRender: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
};

export default Popup;
