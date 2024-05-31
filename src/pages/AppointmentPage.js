import React from 'react'
import Appointment from '../components/Appointment'
import { AppointmentProvider } from '../contexts/AppointmentContext';

const AppointmentPage = () => {
  return (
    <AppointmentProvider>
    <Appointment />
    </AppointmentProvider>
  )
}

export default AppointmentPage