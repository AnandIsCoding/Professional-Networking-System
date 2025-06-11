import React, { useEffect } from 'react';
import PublicNavbar from './Components/NavbarV1/PublicNavbar';
import LandingPage from './Pages/LandingPage';
import Footer from './Components/Footer';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';

function App() {
  useEffect(() => {
    const disableContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      const isF12 = e.key === 'F12';
      const isBlockedCombo =
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'U');

      if (!isF12 && isBlockedCombo) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', disableContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='select-none'>
      <PublicNavbar />
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </div>
  );
}

export default App;
