import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import BottomNav from './components/BottomNav';
import ParticipantPage from './pages/ParticipantPage';
import { WebSocketProvider } from './context/WebSocketContext';

function App() {
  return (
    <WebSocketProvider url="ws://localhost:8000/viewer">
        <CustomCursor />
        <ParticipantPage />
    </WebSocketProvider >
  );
}

export default App;
