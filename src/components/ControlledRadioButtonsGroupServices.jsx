import React, { useContext, useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AppointmentContext } from '../contexts/AppointmentContext';

/**
 * Represents a controlled radio buttons group for selecting a type of service.
 *
 * @component
 * @returns {JSX.Element} The component for selecting a type of service.
 */
export default function ControlledRadioButtonsGroup() {
  const { appointmentData, setAppointmentData } = useContext(AppointmentContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://onedv613-restful-api.onrender.com/api/v1/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  /**
   * Handles change in the selected type of service.
   *
   * @param {Object} event - The event object representing the change.
   */
  const handleChange = (event) => {
    const { value } = event.target;

    // Find the service object corresponding to the selected service name.
    const selectedService = services.find((service) => service.name === value);

    // Extract the service ID from the selected service object.
    const selectedServiceId = selectedService ? selectedService.id : null;

    setAppointmentData({ ...appointmentData, typeOfService: value, serviceId: selectedServiceId });
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Type of service</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="typeOfService"
        value={appointmentData.typeOfService}
        onChange={handleChange}
      >
        {services.map((service) => (
          <FormControlLabel
            key={service.name}
            value={service.name}
            control={<Radio />}
            label={service.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
