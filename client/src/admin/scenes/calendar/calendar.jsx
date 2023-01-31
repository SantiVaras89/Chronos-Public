import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography, useTheme, Button } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../../theme";
import { renewHoliday, getCalendarEvents } from "./api";


const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [calendarEvents, setCalendarEvents] = useState([]);

  
  
  useEffect(() => {
    getCalendarEvents().then(data => {
      setCalendarEvents(data)
    });
  }, []);
    

  //Llama a la API de creacion de eventos
  const reloadHolidays=async(event)=> {
    const renew = await renewHoliday();
    if(renew === "OK"){
      getCalendarEvents().then(data => {
        setCalendarEvents(data)
      })
    }
  }

  const handleDateClick = (selected) => {
    const title = prompt("Por favor agregue un titulo para un nuevo evento");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
        
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Esta seguro que desea borrar el evento '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendario" subtitle="" />

     <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
         {/*
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >*/}
         <Box
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "column",
            height: 1012,
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <Typography variant="h5">Eventos</Typography>
          <List>
            {calendarEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        locale: 'es'
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
        <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => {
              reloadHolidays()
            }}
          >
            Actualizar Feriados
          </Button>
          <FullCalendar
            height="75vh"
            locale="es"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              locale: "es",
            }}
            buttonText={{           
              today:    'Hoy',
              month:    'Mes',
              week:     'Semana',
              day:      'Día',
              list:     'Lista'
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            //eventsSet={(events) => setCurrentEvents(events)}
            events={calendarEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
