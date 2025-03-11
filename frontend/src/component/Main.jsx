import Calender from "./calender/Calender.jsx";
import DashBoard from "./dashboard/DashBoard.jsx";
import "../css/main.css";
import { useState, useEffect } from "react";

function Main() {
  const [events, setEvents] = useState([]);
  const [weekEvents, setWeekEvents] = useState([]);
  const [monthEvents, setMonthEvents] = useState([]);

  function getEvent(type, set) {
    fetch("http://localhost:8000/get-events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: type }),
    })
      .then((res) => res.json())
      .then((data) => {
        set(data.events.length > 0 ? data.events : []);
      }).catch(error=> alert(error.message))
  }

  function reRender() {
    getEvent(0, setEvents);
    getEvent(1, setWeekEvents);
    getEvent(2, setMonthEvents);
  }


  useEffect(() => {
    reRender()
  }, []);

  return (
    <main>
      <DashBoard weekEvents={weekEvents} monthEvents={monthEvents} todayEvents={events} reRender={reRender}/>
      <Calender getEvent={getEvent} monthEvents={monthEvents} reRender={reRender}/>
    </main>
  );
}

export default Main;
