import React, { createContext, useState } from 'react';

const AppointmentContext = createContext();

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
