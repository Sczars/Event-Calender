import "../../css/create.css";

function CreateEvent(props) {
  function addEvent(formData) {
    fetch("http://localhost:8000/add-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        date: formData.get("date"),
        duration: formData.get("duration"),
        type: formData.get("type"),
        status: formData.get("status"),
        note: formData.get("note"),
      }),
    })
      .then(() => props.reRender())
      .catch((error) => console.error("Error:", error));
  }

  return (
    <form className="add-event" action={addEvent}>
      <label>
        Type:
        <select name="type" id="type" required>
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
        <select name="status" id="status" required>
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
        <input type="text" name="name" required/>
      </label>
      <label>
        Date:
        <input type="date" name="date" required/>
      </label>
      <label>
        Duration:
        <input type="text" name="duration" required/>
      </label>
      <label htmlFor="note">Note:</label>
      <textarea name="note" id="note" maxLength="100"></textarea>
      <button className="add" type="submit">Add event</button>
      <button className="exit" type="button" onClick={()=> {props.toggle(prev => !prev)}}>
        X
      </button>
    </form>
  );
}

export default CreateEvent;
