import { useEffect, useRef } from 'react';
import './App.css';

function Webcam() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Set the video source to the backend video feed
    if (videoRef.current) {
      videoRef.current.src = 'http://localhost:8000/video_feed';
    }
  }, []);

  return (
    <div className="webcam-container">
      <h2>Live Video Feed</h2>
      <div className="video-wrapper">
        <img 
          ref={videoRef}
          src="http://localhost:8000/video_feed"
          alt="Video Feed"
          style={{
            width: '100%',
            maxWidth: '800px',
            height: 'auto',
            border: '2px solid #333',
            borderRadius: '8px'
          }}
        />
      </div>
    </div>
  );
}

export default Webcam;
