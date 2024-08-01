import React from 'react'
import Sidebar from './include/Sidebar'
import Header from './include/Header'
import { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
  MonthView,
  DayView,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

const appointments = [
	{
	  id: 0,
	  title: 'Watercolor Landscape',
	  startDate: new Date(2018, 6, 23, 9, 30),
	  endDate: new Date(2018, 6, 23, 11, 30),
	  ownerId: 1,
	}, {
	  id: 1,
	  title: 'Monthly Planning',
	  startDate: new Date(2018, 5, 28, 9, 30),
	  endDate: new Date(2018, 5, 28, 11, 30),
	  ownerId: 1,
	}, {
	  id: 2,
	  title: 'Recruiting students',
	  startDate: new Date(2018, 6, 9, 12, 0),
	  endDate: new Date(2018, 6, 9, 13, 0),
	  ownerId: 2,
	}, {
	  id: 3,
	  title: 'Oil Painting',
	  startDate: new Date(2018, 6, 18, 14, 30),
	  endDate: new Date(2018, 6, 18, 15, 30),
	  ownerId: 2,
	}, {
	  id: 4,
	  title: 'Open Day',
	  startDate: new Date(2018, 6, 20, 12, 0),
	  endDate: new Date(2018, 6, 20, 13, 35),
	  ownerId: 6,
	}, {
	  id: 5,
	  title: 'Watercolor Landscape',
	  startDate: new Date(2018, 6, 6, 13, 0),
	  endDate: new Date(2018, 6, 6, 14, 0),
	  rRule: 'FREQ=WEEKLY;BYDAY=FR;UNTIL=20180816',
	  exDate: '20180713T100000Z,20180727T100000Z',
	  ownerId: 2,
	}, {
	  id: 6,
	  title: 'Meeting of Instructors',
	  startDate: new Date(2018, 5, 28, 12, 0),
	  endDate: new Date(2018, 5, 28, 12, 30),
	  rRule: 'FREQ=WEEKLY;BYDAY=TH;UNTIL=20180727',
	  exDate: '20180705T090000Z,20180719T090000Z',
	  ownerId: 5,
	}, {
	  id: 7,
	  title: 'Oil Painting for Beginners',
	  startDate: new Date(2018, 6, 3, 11, 0),
	  endDate: new Date(2018, 6, 3, 12, 0),
	  rRule: 'FREQ=WEEKLY;BYDAY=TU;UNTIL=20180801',
	  exDate: '20180710T080000Z,20180724T080000Z',
	  ownerId: 3,
	}, {
	  id: 8,
	  title: 'Watercolor Workshop',
	  startDate: new Date(2018, 6, 9, 11, 0),
	  endDate: new Date(2018, 6, 9, 12, 0),
	  ownerId: 3,
	},
  ];

const TeacherScheduler = () => {
  const [data, setData] = useState(appointments);
  const [currentViewName, setCurrentViewName] = useState('');
  const [addedAppointment, setAddedAppointment] = useState({});
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [editingAppointment, setEditingAppointment] = useState(undefined);

  const commitChanges = ({ added, changed, deleted }) => {
    setData((prevData) => {
		let newData = [...prevData];
		if (added) 
		{
			console.log(added);
			const startingAddedId = newData.length > 0 ? newData[newData.length - 1].id + 1 : 0;
			newData = [...newData, { id: startingAddedId, ...added }];
		}
		if (changed) 
		{
			console.log(changed);
			newData = newData.map(appointment => (
			changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
		));
		}
		if (deleted !== undefined) 
		{
			console.log(deleted);
			newData = newData.filter(appointment => appointment.id !== deleted);
		}
		// Update backend here (added/changed/deleted)
		console.log(newData);
		return newData;
    });
  };

  return (
    <>
      <Sidebar />
      <section id="content" className="contentcss">
        <Header />
        <Paper>
          <Scheduler data={data} height={660}>
            <ViewState
              defaultCurrentDate="2018-07-25"
              currentViewName={currentViewName}
              onCurrentViewNameChange={setCurrentViewName}
            />
            <EditingState
              onCommitChanges={commitChanges}
              addedAppointment={addedAppointment}
              onAddedAppointmentChange={setAddedAppointment}
              appointmentChanges={appointmentChanges}
              onAppointmentChangesChange={setAppointmentChanges}
              editingAppointment={editingAppointment}
              onEditingAppointmentChange={setEditingAppointment}
            />
            <WeekView startDayHour={8} endDayHour={19} />
            {/* <WeekView name="work-week" displayName="Work Week" excludedDays={[0, 6]} startDayHour={9} endDayHour={19} /> */}
            <MonthView />
            <DayView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <AllDayPanel />
            <EditRecurrenceMenu />
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip showOpenButton showDeleteButton />
            <AppointmentForm />
          </Scheduler>
        </Paper>
      </section>
    </>
  );
};

export default TeacherScheduler;
