import React from 'react';
import EmailBlock from '../components/EmailBlock';
import HeroBanner from '../components/HeroBanner';
import SwipeableTextMobileStepper from '../components/SwipeableTextMobileStepper';
import TextQuote from '../components/TextQuote';

/**
 * Represents the StartPage component displaying introductory content.
 *
 * @component
 * @returns {JSX.Element} The rendered StartPage component.
 */
function StartPage() {
  return (
    <div>
      <HeroBanner />
      <TextQuote text="Your health is our priority. Book your appointment today and experience personalized care at HealthPlus Clinic." />
      <SwipeableTextMobileStepper />
      <EmailBlock />
    </div>
  );
}

export default StartPage;
