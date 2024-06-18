import React, { createContext, useState } from 'react';

/**
 * Context provider for managing appointment and personal data.
 *
 * @component
 */
const AppointmentContext = createContext();

/**
 * Provider component for AppointmentContext.
 *
 * @param {object} props - The props for the AppointmentProvider.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} JSX element representing the AppointmentProvider.
 */
const AppointmentProvider = ({ children }) => {
  const [appointmentData, setAppointmentData] = useState({
    typeOfService: '',
    dateTime: new Date(),
    serviceId: ''
  });

  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: ''
  });

  return (
    <AppointmentContext.Provider
      value={{
        appointmentData,
        setAppointmentData,
        personalData,
        setPersonalData
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export { AppointmentContext, AppointmentProvider };
