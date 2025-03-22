import "../../css/calendar.css";
import PropTypes from "prop-types";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";
import { useEffect, useState } from "react";
import PopUp from "../dashboard/Popup";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function Calendar(props) {
  const [daysEvents, setDaysEvents] = useState([]);
  const [isClick, setIsClick] = useState(null);
  const [indexUpdate, setIndexUpdate] = useState(0)

  const currDate = new Date();
  const firstDay = startOfMonth(currDate);
  const lastDay = endOfMonth(currDate);

  useEffect(()=>{
    const timer = setTimeout(() => {
      setIndexUpdate(prev => prev+1)
    }, 3000);

    return ()=> clearTimeout(timer)
  },[indexUpdate])

  const daysInMonth = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });

  const firstDayIndex = getDay(firstDay);

  const eventDayList = (daysInMonth, monthEvents) => {
    return daysInMonth.map((day) => {
      const dayEvents = monthEvents.filter(
        (event) => new Date(event.date).toDateString() === day.toDateString()
      );
      return { day, events: dayEvents };
    });
  };

  useEffect(() => {
    setDaysEvents(eventDayList(daysInMonth, props.monthEvents));
  }, [props.monthEvents]);

  return (
    <div className="calendar-container">
      <header>{format(currDate, "MMMM, yyyy")}</header>
      <div className="calendar">
        {WEEKDAYS.map((i) => (
          <p className="day-name" key={i}>
            {i}
          </p>
        ))}

        {Array.from({ length: (6 + firstDayIndex - 1) % 6 }).map((_, index) => (
          <p className="day" key={`empty-${index}`} />
        ))}

        {daysEvents.map((day, index) => (
          <div
            className={`day${isToday(day.day) ? " today" : ""}`}
            key={index}
            onClick={() => {
              setIsClick(day.events);
            }}
          >
            <p>{format(day.day, "d")}</p>
            <div
              className={`strip${
                day.events[indexUpdate % day.events.length]?.name.length >= 14 ? " overflow" : ""
              } ${day.events[indexUpdate % day.events.length]?.type} ${day.events?.length === 0&&" border"}`}
            >
              {day.events[indexUpdate % day.events.length]?.name}
            </div>
            {day.events.length > 0 && (
              <button className="event-counter">{day.events.length}</button>
            )}
          </div>
        ))}

        {isClick !== null && isClick.length > 0 && (
          <PopUp
            items={isClick}
            setPopup={setIsClick}
            reRender={props.reRender}
          />
        )}
      </div>
    </div>
  );
}

Calendar.propTypes = {
  getEvent: PropTypes.func.isRequired,
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
  reRender: PropTypes.func.isRequired,
};

export default Calendar;
