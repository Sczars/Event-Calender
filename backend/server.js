import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {getEvents, addEvent, delEvent, editEvent} from "./modules/getEvents.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/get-events", async (req, res)=> {
  try {
    const reqEvents = await getEvents(Number(req.body.type))    
    res.json({events: reqEvents})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

app.post("/add-event", async (req, res)=> {
  try {
    await addEvent(req)
    res.json({status: "Adding Successfully"})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

app.post("/del-event", async (req, res)=> {
  try {
    await delEvent(req)
    res.json({status: "Delete Successfully"})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

app.post("/edit-event", async (req, res)=>{
  try {    
    await editEvent(req)
    res.json({status: "Edit successfully"})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
