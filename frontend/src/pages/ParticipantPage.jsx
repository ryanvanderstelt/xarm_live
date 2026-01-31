import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ChevronUp, ChevronDown, Lock, Unlock, CheckCircle2, TrendingUp } from 'lucide-react';

const GridButton = ({ icon, label, active, locked, onClick, voteCount }) => (
  <button
    onClick={onClick}
    disabled={!!locked}
    className={`relative flex flex-col gap-1 p-4 rounded-2xl font-mono font-bold transition-all border-2 group
      ${locked 
        ? 'bg-zinc-800/50 border-zinc-700 text-zinc-500 cursor-default' 
        : active 
          ? 'bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400 text-white scale-105 shadow-[0_0_30px_rgba(34,211,238,0.6)]' 
          : 'bg-zinc-900/80 border-cyan-500/30 text-cyan-300 hover:border-cyan-500 hover:bg-zinc-800/80 hover:scale-105 backdrop-blur-sm'
      }`}
    style={{
      boxShadow: active ? '0 0 40px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.1)' : undefined,
    }}
  >
    <span className="flex justify-center">{icon}</span>
    <span className="text-xs">{label}</span>
    {voteCount > 0 && (
      <div className="absolute -top-2 -right-2 bg-cyan-500 text-black text-[10px] font-black px-2 py-1 rounded-full border-2 border-cyan-300">
        {voteCount}
      </div>
    )}
  </button>
);

const ParticipantPage = () => {
  const [timer, setTimer] = useState(10);
  const [pendingVote, setPendingVote] = useState(null);
  const [lockedVote, setLockedVote] = useState(null);
  const [voteCounts, setVoteCounts] = useState({
    '+X': 0, '-X': 0, '+Y': 0, '-Y': 0, '+Z': 0, '-Z': 0, 'OPEN': 0, 'CLOSE': 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (action) => {
    if (!lockedVote) {
      setPendingVote(action);
    }
  };

  const handleLockIn = () => {
    if (pendingVote) {
      setLockedVote(pendingVote);
      setVoteCounts((prev) => ({
        ...prev,
        [pendingVote]: prev[pendingVote] + 1,
      }));
      console.log("LOCKING IN VOTE:", pendingVote);
      // TODO: socket.send(JSON.stringify({ type: 'vote', action: pendingVote }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white pb-32">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            XARM LIVE CONTROL
          </h1>
          <div className="w-40 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-4"></div>
          <div className="flex items-center justify-center gap-4">
            <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg font-mono text-sm">
              LIVE STREAM
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* VIDEO SECTION */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-video bg-gradient-to-br from-zinc-900 to-black rounded-3xl border-2 border-cyan-500/30 overflow-hidden shadow-2xl group hover:border-cyan-500/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
              <img
                src="http://localhost:8000/video_feed"
                alt="Live Feed"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const errorDiv = e.target.nextElementSibling;
                  if (errorDiv) errorDiv.style.display = 'flex';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-zinc-600 italic text-xl" style={{ display: 'none' }}>
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                  Connecting to video feed...
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-red-500/50 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-mono text-lg font-bold">
                  {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/50">
                <p className="text-cyan-400 font-mono text-xs">
                  Every 10 secs 1 majority vote will be executed on an irl robot in the stream
                </p>
              </div>
            </div>
          </div>

          {/* CONTROLS SECTION */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Vote Counts Section */}
            <div className="bg-zinc-900/50 backdrop-blur-xl border-2 border-cyan-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-cyan-400" size={20} />
                <h2 className="text-xl font-bold text-cyan-400">VOTE COUNTS</h2>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(voteCounts).map(([action, count]) => (
                  <div
                    key={action}
                    className="bg-zinc-800/50 border border-cyan-500/20 rounded-lg p-3 text-center hover:border-cyan-500/50 transition-all"
                  >
                    <div className="text-xs text-zinc-400 mb-1">{action}</div>
                    <div className="text-2xl font-black text-cyan-400">{count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* DIRECTIONAL GRID */}
            <div className="bg-zinc-900/50 backdrop-blur-xl border-2 border-cyan-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 text-center">DIRECTIONAL CONTROL</h3>
              <div className="grid grid-cols-3 gap-3">
                <div />
                <GridButton 
                  icon={<ArrowUp size={24} />} 
                  label="+X" 
                  active={pendingVote === '+X'} 
                  onClick={() => handleSelect('+X')} 
                  locked={lockedVote === '+X'}
                  voteCount={voteCounts['+X']}
                />
                <div />

                <GridButton 
                  icon={<ArrowLeft size={24} />} 
                  label="-Y" 
                  active={pendingVote === '-Y'} 
                  onClick={() => handleSelect('-Y')} 
                  locked={lockedVote === '-Y'}
                  voteCount={voteCounts['-Y']}
                />
                
                {/* Z-AXIS COLUMN */}
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => handleSelect('+Z')}
                    className={`relative flex-1 rounded-xl flex flex-col items-center justify-center transition-all border-2 p-2 ${
                      pendingVote === '+Z' 
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]' 
                        : 'bg-zinc-800/50 border-cyan-500/30 text-cyan-300 hover:border-cyan-500 hover:bg-zinc-700/50'
                    }`}
                  >
                    <ChevronUp size={20} /> 
                    <span className="text-[10px] font-bold">+Z</span>
                    {voteCounts['+Z'] > 0 && (
                      <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] font-black px-2 py-1 rounded-full border-2 border-indigo-300">
                        {voteCounts['+Z']}
                      </span>
                    )}
                  </button>
                  <button 
                    onClick={() => handleSelect('-Z')}
                    className={`relative flex-1 rounded-xl flex flex-col items-center justify-center transition-all border-2 p-2 ${
                      pendingVote === '-Z' 
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]' 
                        : 'bg-zinc-800/50 border-cyan-500/30 text-cyan-300 hover:border-cyan-500 hover:bg-zinc-700/50'
                    }`}
                  >
                    <ChevronDown size={20} /> 
                    <span className="text-[10px] font-bold">-Z</span>
                    {voteCounts['-Z'] > 0 && (
                      <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] font-black px-2 py-1 rounded-full border-2 border-indigo-300">
                        {voteCounts['-Z']}
                      </span>
                    )}
                  </button>
                </div>

                <GridButton 
                  icon={<ArrowRight size={24} />} 
                  label="+Y" 
                  active={pendingVote === '+Y'} 
                  onClick={() => handleSelect('+Y')} 
                  locked={lockedVote === '+Y'}
                  voteCount={voteCounts['+Y']}
                />
                
                <div />
                <GridButton 
                  icon={<ArrowDown size={24} />} 
                  label="-X" 
                  active={pendingVote === '-X'} 
                  onClick={() => handleSelect('-X')} 
                  locked={lockedVote === '-X'}
                  voteCount={voteCounts['-X']}
                />
                <div />
              </div>
            </div>

            {/* LOCK-IN SUBMIT BUTTON */}
            <button 
              onClick={handleLockIn}
              disabled={!pendingVote || !!lockedVote}
              className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all border-2 ${
                lockedVote 
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

            {/* OPEN/CLOSE TOGGLES */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSelect('OPEN')}
                className={`relative flex items-center justify-center gap-3 p-4 rounded-2xl font-bold text-lg border-2 transition-all ${
                  pendingVote === 'OPEN'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 border-emerald-400 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)] scale-105'
                    : 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400 hover:bg-emerald-600/30 hover:border-emerald-400'
                }`}
              >
                <Unlock size={24} /> 
                <span>OPEN</span>
                {voteCounts['OPEN'] > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-sm font-black px-2 py-1 rounded-full border-2 border-emerald-300">
                    {voteCounts['OPEN']}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleSelect('CLOSE')}
                className={`relative flex items-center justify-center gap-3 p-4 rounded-2xl font-bold text-lg border-2 transition-all ${
                  pendingVote === 'CLOSE'
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 border-rose-400 text-white shadow-[0_0_30px_rgba(244,63,94,0.5)] scale-105'
                    : 'bg-rose-600/20 border-rose-500/50 text-rose-400 hover:bg-rose-600/30 hover:border-rose-400'
                }`}
              >
                <Lock size={24} /> 
                <span>CLOSE</span>
                {voteCounts['CLOSE'] > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-sm font-black px-2 py-1 rounded-full border-2 border-rose-300">
                    {voteCounts['CLOSE']}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantPage;
