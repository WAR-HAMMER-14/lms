import React from 'react'
import Sidebar from './include/Sidebar'
import Header from './include/Header'

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

const currentDate = '2018-11-01';
// const schedulerData = [
//   { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
//   { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
// ];
const appointments = [
    {
      title: 'Website Re-Design Plan',
      startDate: new Date(2018, 6, 23, 9, 30),
      endDate: new Date(2018, 6, 23, 11, 30),
    }, {
      title: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date(2018, 6, 23, 12, 0),
      endDate: new Date(2018, 6, 23, 13, 0),
    }, {
      title: 'Install New Router in Dev Room',
      startDate: new Date(2018, 6, 23, 14, 30),
      endDate: new Date(2018, 6, 23, 15, 30),
    }, {
      title: 'Approve Personal Computer Upgrade Plan',
      startDate: new Date(2018, 6, 24, 10, 0),
      endDate: new Date(2018, 6, 24, 11, 0),
    }, {
      title: 'Final Budget Review',
      startDate: new Date(2018, 6, 24, 12, 0),
      endDate: new Date(2018, 6, 24, 13, 35),
    }, {
      title: 'New Brochures',
      startDate: new Date(2018, 6, 24, 14, 30),
      endDate: new Date(2018, 6, 24, 15, 45),
    }, {
      title: 'Install New Database',
      startDate: new Date(2018, 6, 25, 9, 45),
      endDate: new Date(2018, 6, 25, 11, 15),
    }, {
      title: 'Approve New Online Marketing Strategy',
      startDate: new Date(2018, 6, 25, 12, 0),
      endDate: new Date(2018, 6, 25, 14, 0),
    }, {
      title: 'Upgrade Personal Computers',
      startDate: new Date(2018, 6, 25, 15, 15),
      endDate: new Date(2018, 6, 25, 16, 30),
    }, {
      title: 'Customer Workshop',
      startDate: new Date(2018, 6, 26, 11, 0),
      endDate: new Date(2018, 6, 26, 12, 0),
    }, {
      title: 'Prepare 2015 Marketing Plan',
      startDate: new Date(2018, 6, 26, 11, 0),
      endDate: new Date(2018, 6, 26, 13, 30),
    }, {
      title: 'Brochure Design Review',
      startDate: new Date(2018, 6, 26, 14, 0),
      endDate: new Date(2018, 6, 26, 15, 30),
    }, {
      title: 'Create Icons for Website',
      startDate: new Date(2018, 6, 27, 10, 0),
      endDate: new Date(2018, 6, 27, 11, 30),
    }, {
      title: 'Upgrade Server Hardware',
      startDate: new Date(2018, 6, 27, 14, 30),
      endDate: new Date(2018, 6, 27, 16, 0),
    }, {
      title: 'Submit New Website Design',
      startDate: new Date(2018, 6, 27, 16, 30),
      endDate: new Date(2018, 6, 27, 18, 0),
    }, {
      title: 'Launch New Website',
      startDate: new Date(2018, 6, 26, 12, 20),
      endDate: new Date(2018, 6, 26, 14, 0),
    }, {
      title: 'Website Re-Design Plan',
      startDate: new Date(2018, 6, 16, 9, 30),
      endDate: new Date(2018, 6, 16, 15, 30),
    }, {
      title: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date(2018, 6, 16, 12, 0),
      endDate: new Date(2018, 6, 16, 13, 0),
    }, {
      title: 'Install New Database',
      startDate: new Date(2018, 6, 17, 15, 45),
      endDate: new Date(2018, 6, 18, 12, 15),
    }, {
      title: 'Approve New Online Marketing Strategy',
      startDate: new Date(2018, 6, 18, 12, 35),
      endDate: new Date(2018, 6, 18, 14, 15),
    }, {
      title: 'Upgrade Personal Computers',
      startDate: new Date(2018, 6, 19, 15, 15),
      endDate: new Date(2018, 6, 20, 20, 30),
    }, {
      title: 'Prepare 2015 Marketing Plan',
      startDate: new Date(2018, 6, 20, 20, 0),
      endDate: new Date(2018, 6, 20, 13, 30),
    }, {
      title: 'Brochure Design Review',
      startDate: new Date(2018, 6, 20, 14, 10),
      endDate: new Date(2018, 6, 20, 15, 30),
    }, {
      title: 'Vacation',
      startDate: new Date(2018, 5, 22),
      endDate: new Date(2018, 6, 1),
    }, {
      title: 'Vacation',
      startDate: new Date(2018, 6, 28),
      endDate: new Date(2018, 7, 7),
    },
  ];


export default class TeacherScheduler extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
          data: appointments,
          currentDate: '2018-06-27',
          currentViewName: 'work-week',
    
          addedAppointment: {},
          appointmentChanges: {},
          editingAppointment: undefined,
        };
    
        this.currentViewNameChange = (currentViewName) => {
            this.setState({ currentViewName });
          };
        this.commitChanges = this.commitChanges.bind(this);
        this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
        this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
        this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
      }
    
      changeAddedAppointment(addedAppointment) {
        this.setState({ addedAppointment });
        console.log(addedAppointment);
      }
    
      changeAppointmentChanges(appointmentChanges) {
        this.setState({ appointmentChanges });
      }
    
      changeEditingAppointment(editingAppointment) {
        this.setState({ editingAppointment });
      }
    
      commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
          let { data } = state;
          if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            data = [...data, { id: startingAddedId, ...added }];
          }
          if (changed) {
            data = data.map(appointment => (
              changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
          }
          if (deleted !== undefined) {
            data = data.filter(appointment => appointment.id !== deleted);
          }
          return { data };
        });
      }
    
      render() {
        const {
          currentDate, data, addedAppointment, appointmentChanges, editingAppointment, currentViewName,
        } = this.state;


  return (
    <>
        <Sidebar />
		<section id="content" className="contentcss">
        <Header />	

        <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            defaultCurrentDate="2018-07-25"
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
          />
          <WeekView
            startDayHour={10}
            endDayHour={19}
          />
          <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
          />
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
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />
        </Scheduler>
      </Paper>

        </section>
    </>
    );
    }
}
