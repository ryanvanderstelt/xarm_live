import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import BottomNav from './components/BottomNav';
import ParticipantPage from './pages/ParticipantPage';
import AboutPage from './pages/AboutPage';
import AboutProjectPage from './pages/AboutProjectPage';
import { WebSocketProvider } from './context/WebSocketContext';

function App() {
  return (
    <WebSocketProvider url="ws://localhost:8000/viewer">
      <Router>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<ParticipantPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about-project" element={<AboutProjectPage />} />
        </Routes>
        <BottomNav />
      </Router>
    </WebSocketProvider >
  );
}

export default App;
