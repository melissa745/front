import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import  Home  from './pages/Home_pages';
import EventForm from './pages/EventForm';
import VerEventos from './pages/VerEventos';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/eventos/registrar" element={<EventForm/>} />
          <Route path="/eventos" element={<VerEventos/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
