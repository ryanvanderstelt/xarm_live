import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import BottomNav from './components/BottomNav';
import ParticipantPage from './pages/ParticipantPage';
import AboutPage from './pages/AboutPage';
import AboutProjectPage from './pages/AboutProjectPage';

function App() {
  return (
    <Router>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<ParticipantPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about-project" element={<AboutProjectPage />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
