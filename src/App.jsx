import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useThemeColors } from './contexts/ThemeColorContext';
import StartPage from './pages/StartPage';
import AboutUsPage from './pages/AboutUsPage';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import FooterTwo from './components/FooterTwo';
import ServicesPage from './pages/ServicesPage';
import AppointmentPage from './pages/AppointmentPage';
import ContactUsPage from './pages/ContactUsPage';
import FaqPage from './pages/FaqPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import EditAppointmentPage from './pages/EditAppointmentPage';
import DeleteAppointmentPage from './pages/DeleteAppointmentPage';
import EditServicePage from './pages/EditServicePage';
import DeleteServicePage from './pages/DeleteServicePage';
import CreateServicePage from './pages/CreateServicePage';
import ChangeThemeColorPage from './pages/ChangeThemeColorPage';
import EditEmailPage from './pages/EditEmailPage';
import DeleteEmailPage from './pages/DeleteEmailPage';
import EditContactRequestPage from './pages/EditContactRequestPage';
import DeleteContactRequestPage from './pages/DeleteContactRequestPage';

/**
 * The main application component.
 *
 * @param {object} props - The props for the component.
 * @param {function} props.updateTheme - Function to update the theme.
 * @param {object} props.currentTheme - The current theme object.
 * @returns {JSX.Element} The rendered application component.
 */
function App({ updateTheme, currentTheme }) {
  const { dispatch } = useThemeColors();
  const [loading, setLoading] = useState(true);

  /**
   * Fetches the theme data from the server.
   */
  const fetchTheme = useCallback(async () => {
    try {
      const response = await fetch('https://onedv613-restful-api.onrender.com/api/v1/theme', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const themeData = await response.json();
        const newTheme = createTheme(themeData);
        dispatch({ type: 'SET_THEME', payload: themeData });
        updateTheme(newTheme);
      } else {
        setLoading(false);
        throw new Error('Failed to fetch theme');
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error fetching theme:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [dispatch, updateTheme]);

  useEffect(() => {
    fetchTheme();
  }, [fetchTheme]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <div className="container">
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/editAppointment/:id" element={<EditAppointmentPage />} />
          <Route path="/deleteAppointment/:id" element={<DeleteAppointmentPage />} />
          <Route path="/editService/:id" element={<EditServicePage />} />
          <Route path="/deleteService/:id" element={<DeleteServicePage />} />
          <Route path="/createService" element={<CreateServicePage />} />
          <Route path="/changeThemeColor" element={<ChangeThemeColorPage updateTheme={updateTheme} currentTheme={currentTheme} />} />
          <Route path="/editEmail/:id" element={<EditEmailPage />} />
          <Route path="/deleteEmail/:id" element={<DeleteEmailPage />} />
          <Route path="/editContactRequest/:id" element={<EditContactRequestPage />} />
          <Route path="/deleteContactRequest/:id" element={<DeleteContactRequestPage />} />
        </Routes>
        <FooterTwo />
      </div>
    </Router>
  );
}

App.propTypes = {
  updateTheme: PropTypes.func.isRequired,
  currentTheme: PropTypes.shape.isRequired,
};

export default App;
