import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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

function App() {
  return (
    <Router>
      <div className="container">
        <ResponsiveAppBar />
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/appointment' element={<AppointmentPage />} />
          <Route path='/about' element={<AboutUsPage />} />
          <Route path='/contact' element={<ContactUsPage />} />
          <Route path='/faq' element={<FaqPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin' element={<AdminPage />} />
        </Routes>
        <FooterTwo />
      </div>
    </Router>
  );
}

export default App;
