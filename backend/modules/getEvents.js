import path from "path";
import fs from "fs/promises";

async function readEvent() {
  const fileContent = await fs.readFile(
    path.resolve("./data/events.js"),
    "utf-8"
  );
  return JSON.parse(fileContent.replace("export default ", "").trim());
}

export async function getEvents(type) {
  /**
   * Type:
   * -0: today
   * -1: this week
   * -2: this month
   * -3: onGoing
   * -4: Miss
   * -5: Finished
   * -6: All
   */
  function getWeekNumber(date) {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + oneJan.getDay() + 1) / 7);
  }

  const events = await readEvent();

  const reqEvents =
    type === 6
      ? events
      : events.filter((event) => {
          /* Get today */
          if (
            type === 0 &&
            new Date(event.date).toDateString() === new Date().toDateString()
          ) {
            return event;
          }

          /* Get week */
          if (
            type === 1 &&
            getWeekNumber(new Date(event.date)) === getWeekNumber(new Date())
          ) {
            return event;
          }

          /* Get month */
          if (
            type === 2 &&
            new Date(event.date).getMonth() === new Date().getMonth()
          ) {
            return event;
          }

          /* Get onGoing */
          if (type === 3 && event.status === "onGoing") {
            return event;
          }

          /* Get Miss */
          if (type === 4 && event.status === "Miss") {
            return event;
          }

          /* Get Finished */
          if (type === 5 && event.status === "Finished") {
            return event;
          }

          return false;
        });
  return reqEvents;
}

async function writeToFile(content, path) {
  await fs.writeFile(path, content, "utf-8");
}

export async function addEvent(req) {
  const events = await readEvent();
  const nEvent = {
    id: String(events.length),
    name: req.body.name,
    date: req.body.date,
    duration: req.body.duration,
    type: req.body.type,
    status: req.body.status,
    note: req.body.note,
  };

  events.push(nEvent);
  const nContent = `export default ${JSON.stringify(events, null, 2)}`;
  writeToFile(nContent, path.resolve("./data/events.js"));
}

export async function editEvent(req) {
  const events = await readEvent();
  const nEvent = {
    id: req.body.id,
    name: req.body.name,
    date: req.body.date,
    duration: req.body.duration,
    type: req.body.type,
    status: req.body.status,
    note: req.body.note,
  };
  const nEvents = events.map((item) => (item.id === nEvent.id ? nEvent : item));

  const nContent = `export default ${JSON.stringify(nEvents, null, 2)}`;
  writeToFile(nContent, path.resolve("./data/events.js"));
}

export async function delEvent(req) {
  const events = await readEvent();
  events.splice(
    events.findIndex((event) => event.id === req.body.id),
    1
  );
  const nContent = `export default ${JSON.stringify(events, null, 2)}`;
  writeToFile(nContent, path.resolve("./data/events.js"));
}
