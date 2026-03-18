import React, { useEffect } from 'react';
import TourNavbar from '../components/TOURS/NAVBAR/TourNavbar';
import ToursPosada from '../components/TOURS/CONTENEDORES/ToursPosada';
import ToursIsla from '../components/TOURS/CONTENEDORES/ToursIsla';

function Tours() {
  // Ensure the page scrolls to top when loaded (unless there's a hash in the URL)


  return (
    <div>
      <TourNavbar />
      <ToursPosada />
      <ToursIsla />
    </div>
  );
}

export default Tours;