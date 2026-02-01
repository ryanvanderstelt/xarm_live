import React, { useState } from 'react';
import { useWebSocket } from '../context/WebSocketContext';

const VideoStream = () => {
  const [frame, setFrame] = useState('');
  const [metadata, setMetadata] = useState({ time: '' });

  const { isConnected } = useWebSocket({
    'image': (data) => {
      setFrame(data.image);
    }
  });

  console.log('VideoStream - isConnected:', isConnected, 'frame length:', frame.length); // DEBUG

  return (
    <div style={{ textAlign: 'center' }}>
      {frame ? (
        <img
          src={`data:image/jpeg;base64,${frame}`}
          alt="Live Stream"
          style={{ width: '900px', borderRadius: '8px' }}
        />
      ) : (
        <p>{isConnected ? 'Waiting for stream...' : 'Connecting to stream...'}</p>
      )}
    </div>
  );
};

export default VideoStream;