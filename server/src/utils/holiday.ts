import { Calendar_Event } from "../entities/Calendar_Event";
import { Request, Response } from "express";

const BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY ="holiday@group.v.calendar.google.com";
const CALENDAR_REGION = "es.ar";
const currentYear = new Date().getFullYear();
const timeMin = new Date(`${currentYear}-01-01`).toISOString();
const timeMax = new Date(`${currentYear}-12-31`).toISOString();


export const getHolidays=async()=> {
  let API_KEY = process.env.API_KEY;
  return await fetch(
    `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}`
  )
  .then((res) => res.json())
}

export const renewHolidays=async(req: Request, res: Response, next)=>{  
  const feriados = [{}];
  Calendar_Event.clear();
  await getHolidays().then(data => {
    const formattedResponse = data.items
      .map(({ summary, start, end }) => ({ summary, start, end }))
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    for(let i = 0; i < formattedResponse.length; i++){
      const entity = new Calendar_Event();
      entity.title= formattedResponse[i].summary,
      entity.start= formattedResponse[i].start.date,
      entity.holiday= true,
      entity.save();
    }
    return res.send("OK")
  });
}