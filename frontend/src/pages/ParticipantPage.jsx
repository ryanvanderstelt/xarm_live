import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChevronUp, ChevronDown, Lock, Unlock, CheckCircle2, TrendingUp } from 'lucide-react';
import VideoStream from '../components/VideoStream';
import { useWebSocket } from '../context/WebSocketContext';

const ActionButton = ({ label, active, onClick, voteCount }) => (
  <button
    onClick={onClick}
    className={`relative flex flex-col items-center justify-center gap-2 p-6 rounded-2xl font-mono font-bold transition-all border-2 group
      ${active
        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400 text-white scale-105 shadow-[0_0_30px_rgba(34,211,238,0.6)]'
        : 'bg-zinc-900/80 border-cyan-500/30 text-cyan-300 hover:border-cyan-500 hover:bg-zinc-800/80 hover:scale-105 backdrop-blur-sm'
      }`}
    style={{
      boxShadow: active ? '0 0 40px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.1)' : undefined,
    }}
  >
    <span className="text-sm">{label}</span>
    {voteCount > 0 && (
      <div className="absolute -top-2 -right-2 bg-cyan-500 text-black text-xs font-black px-2.5 py-1 rounded-full border-2 border-cyan-300">
        {voteCount}
      </div>
    )}
  </button>
);

const ParticipantPage = () => {
  const [timer, setTimer] = useState(10);
  const [pendingVote, setPendingVote] = useState(null);
  const [lockedVote, setLockedVote] = useState(null);
  const [viewerCount, setViewerCount] = useState(0);
  const [voteCounts, setVoteCounts] = useState({
    'swivel': 0,
    'swivel_cc': 0,
    'elbow_1_open': 0,
    'elbow_1_close': 0,
    'elbow_2_open': 0,
    'elbow_2_close': 0,
    'elbow_3_open': 0,
    'elbow_3_close': 0,
    'gripper_open': 0,
    'gripper_close': 0
  });

  // WebSocket handler to update vote counts and viewer count
  const updateVoteCounts = (data) => {
    console.log('Received vote data:', data);

    // Update viewer count if present
    if ('viewer_count' in data) {
      setViewerCount(data.viewer_count);
    }

    // Update vote counts
    setVoteCounts(prevCounts => {
      const newCounts = { ...prevCounts };
      // Update any vote counts that are present in the incoming data
      Object.keys(newCounts).forEach(key => {
        if (key in data) {
          newCounts[key] = data[key];
        }
      });
      return newCounts;
    });
  };

  // Set up WebSocket connection with handlers for all vote types
  const handlers = {
    'swivel': updateVoteCounts,
    'swivel_cc': updateVoteCounts,
    'elbow_1_open': updateVoteCounts,
    'elbow_1_close': updateVoteCounts,
    'elbow_2_open': updateVoteCounts,
    'elbow_2_close': updateVoteCounts,
    'elbow_3_open': updateVoteCounts,
    'elbow_3_close': updateVoteCounts,
    'gripper_open': updateVoteCounts,
    'gripper_close': updateVoteCounts,
    'viewer_count': updateVoteCounts
  };

  const { ws, isConnected } = useWebSocket(handlers);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          // Timer hit zero - unlock voting but keep vote counts
          setLockedVote(null);
          setPendingVote(null);
          return 10; // Reset timer to 10
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (action) => {
    // Allow selecting even if locked - for the next round
    setPendingVote(action);
  };

  const handleLockIn = () => {
    if (pendingVote && !lockedVote) {
      setLockedVote(pendingVote);
      setVoteCounts((prev) => ({
        ...prev,
        [pendingVote]: prev[pendingVote] + 1,
      }));

      // Send vote to backend via WebSocket
      if (ws && ws.readyState === WebSocket.OPEN) {
        const voteMessage = JSON.stringify({ vote: pendingVote });
        ws.send(voteMessage);
        console.log("SENT VOTE TO BACKEND:", voteMessage);
      } else {
        console.warn("WebSocket not connected, could not send vote");
      }
    }
  };

  const actions = [
    ['swivel', 'elbow_1_open', 'elbow_2_open', 'elbow_3_open', 'gripper_open'],
    ['swivel_cc', 'elbow_1_close', 'elbow_2_close', 'elbow_3_close', 'gripper_close']
  ];

  // Flatten actions in order to match button layout
  const orderedActions = [...actions[0], ...actions[1]];

  // Calculate total votes
  const totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);

  // Get percentage for a vote count
  const getPercentage = (count) => {
    if (totalVotes === 0) return 0;
    return ((count / totalVotes) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white pb-32">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-cyan-400">
            Joint Venture
          </h1>
          <p className="text-sm text-zinc-500 mb-4">
            by Ryan Vander Stelt, Cleiver Ivan Ruiz Martinez, Lin Zhang, Kevin Juarez, Ayush Kamath, and Steven Ruiz Martinez
          </p>
        </div>

        {/* VIDEO SECTION */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="relative aspect-[4/3] w-[80%] bg-gradient-to-br from-zinc-900 to-black rounded-3xl border-2 border-cyan-500/30 overflow-hidden shadow-2xl group hover:border-cyan-500/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <VideoStream className="w-full h-full object-contain" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-zinc-600 italic text-xl" style={{ display: 'none' }}>
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                  Connecting to video feed...
                </div>
              </div>
            </div>
          </div>
          {/* Lowkey info display below video */}
          <div className="flex justify-between items-center mt-3 text-sm text-zinc-500 max-w-[80%] mx-auto">
            <div className="flex items-center gap-2">
              <span>👥 {viewerCount} viewers</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Next action in {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* CONTROLS SECTION */}
        <div className="space-y-6">
          {/* Action Buttons - Row 1 */}
          <div className="grid grid-cols-5 gap-4">
            {actions[0].map((action) => (
              <ActionButton
                key={action}
                label={action.replace(/_/g, ' ').toUpperCase()}
                active={pendingVote === action}
                onClick={() => handleSelect(action)}
                voteCount={voteCounts[action]}
              />
            ))}
          </div>

          {/* Action Buttons - Row 2 */}
          <div className="grid grid-cols-5 gap-4">
            {actions[1].map((action) => (
              <ActionButton
                key={action}
                label={action.replace(/_/g, ' ').toUpperCase()}
                active={pendingVote === action}
                onClick={() => handleSelect(action)}
                voteCount={voteCounts[action]}
              />
            ))}
          </div>

          {/* LOCK-IN SUBMIT BUTTON */}
          <button
            onClick={handleLockIn}
            disabled={!pendingVote || !!lockedVote}
            className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all border-2 ${lockedVote
                ? 'bg-zinc-800/50 border-zinc-700 text-zinc-500 cursor-not-allowed'
                : pendingVote
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white scale-105 shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:shadow-[0_0_60px_rgba(34,211,238,0.8)]'
                  : 'bg-zinc-800/50 border-zinc-700 text-zinc-600 opacity-50'
              }`}
          >
            {lockedVote ? (
              <>
                <CheckCircle2 size={24} />
                <span>VOTE SUBMITTED</span>
              </>
            ) : (
              <span>LOCK IN ACTION</span>
            )}
          </button>

          {/* Vote Counts Section */}
          <div className="bg-zinc-900/50 backdrop-blur-xl border-2 border-cyan-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-cyan-400" size={20} />
              <h2 className="text-xl font-bold text-cyan-400">VOTE COUNTS</h2>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {orderedActions.map((action) => (
                <div
                  key={action}
                  className="bg-zinc-800/50 border border-cyan-500/20 rounded-lg p-3 text-center hover:border-cyan-500/50 transition-all"
                >
                  <div className="text-xs text-zinc-400 mb-1 break-words">{action.replace(/_/g, ' ')}</div>
                  <div className="flex items-baseline justify-center gap-1">
                    <div className="text-2xl font-black text-cyan-400">{voteCounts[action]}</div>
                    <div className="text-xs text-cyan-500/70">({getPercentage(voteCounts[action])}%)</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantPage;