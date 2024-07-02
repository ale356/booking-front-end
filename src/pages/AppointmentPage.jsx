import React from 'react';
import Appointment from '../components/Appointment';
import { AppointmentProvider } from '../contexts/AppointmentContext';

/**
 * Renders the AppointmentPage component.
 *
 * @returns {JSX.Element} The AppointmentPage component wrapped with the AppointmentProvider.
 */
function AppointmentPage() {
  return (
    <AppointmentProvider>
      <Appointment />
    </AppointmentProvider>
  );
}

export default AppointmentPage;
