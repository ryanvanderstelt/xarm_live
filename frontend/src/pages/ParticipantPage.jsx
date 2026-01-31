import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ChevronUp, ChevronDown, RotateCw, RotateCcw, Lock, Unlock, CheckCircle2 } from 'lucide-react';

const GridButton = ({ icon, label, active, locked, onClick }) => (
  <button
    onClick={onClick}
    disabled={!!locked}
    className={`flex flex-col gap-1 p-3 rounded-xl font-mono font-bold transition-all border
      ${locked ? 'bg-zinc-700 border-zinc-600 text-zinc-400 cursor-default' :
        active ? 'bg-cyan-600 border-cyan-500 text-white scale-105' : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'}`}
  >
    <span className="flex justify-center">{icon}</span>
    <span className="text-xs">{label}</span>
  </button>
);

const ParticipantPage = () => {
  const [timer, setTimer] = useState(10);
  const [pendingVote, setPendingVote] = useState(null); // Selected but not submitted
  const [lockedVote, setLockedVote] = useState(null);   // Finalized vote for this round

  const handleSelect = (action) => {
    if (!lockedVote) {
      setPendingVote(action);
    }
  };

  const handleLockIn = () => {
    if (pendingVote) {
      setLockedVote(pendingVote);
      console.log("LOCKING IN VOTE:", pendingVote);
      // TODO: socket.send(JSON.stringify({ type: 'vote', action: pendingVote }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row items-center justify-center p-4 gap-8">
      
      {/* VIDEO SECTION */}
      <div className="w-full lg:flex-1 max-w-2xl">
        <div className="relative aspect-video bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-center overflow-hidden shadow-2xl">
          <span className="text-zinc-700 italic">Live Feed</span>
          <div className="absolute top-4 right-4 bg-red-600 px-4 py-1 rounded-lg font-mono font-bold text-xl animate-pulse">
            00:{timer < 10 ? `0${timer}` : timer}
          </div>
        </div>
      </div>

      {/* CONTROLS SECTION */}
      <div className="w-full max-w-sm flex flex-col gap-6">
        
        {/* DIRECTIONAL GRID */}
        <div className="grid grid-cols-3 gap-3">
          <div />
          <GridButton icon={<ArrowUp />} label="+X" active={pendingVote === '+X'} onClick={() => handleSelect('+X')} locked={lockedVote === '+X'} />
          <div />

          <GridButton icon={<ArrowLeft />} label="-Y" active={pendingVote === '-Y'} onClick={() => handleSelect('-Y')} locked={lockedVote === '-Y'} />
          
          {/* FIXED Z-AXIS COLUMN */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => handleSelect('+Z')}
              className={`flex-1 rounded-xl flex flex-col items-center justify-center transition-all border ${pendingVote === '+Z' ? 'bg-indigo-600 border-indigo-400' : 'bg-zinc-800 border-zinc-700'}`}
            >
              <ChevronUp size={20} /> <span className="text-[10px] font-bold">+Z</span>
            </button>
            <button 
              onClick={() => handleSelect('-Z')}
              className={`flex-1 rounded-xl flex flex-col items-center justify-center transition-all border ${pendingVote === '-Z' ? 'bg-indigo-600 border-indigo-400' : 'bg-zinc-800 border-zinc-700'}`}
            >
              <ChevronDown size={20} /> <span className="text-[10px] font-bold">-Z</span>
            </button>
          </div>

          <GridButton icon={<ArrowRight />} label="+Y" active={pendingVote === '+Y'} onClick={() => handleSelect('+Y')} locked={lockedVote === '+Y'} />
          
          <div />
          <GridButton icon={<ArrowDown />} label="-X" active={pendingVote === '-X'} onClick={() => handleSelect('-X')} locked={lockedVote === '-X'} />
          <div />
        </div>

        {/* LOCK-IN SUBMIT BUTTON */}
        <button 
          onClick={handleLockIn}
          disabled={!pendingVote || !!lockedVote}
          className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all
            ${lockedVote ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 
              pendingVote ? 'bg-cyan-500 text-black scale-105 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-zinc-800 text-zinc-600 opacity-50'}`}
        >
          {lockedVote ? <><CheckCircle2 /> VOTE SUBMITTED</> : "LOCK IN ACTION"}
        </button>

        {/* OPEN/CLOSE TOGGLES */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSelect('OPEN')}
            className="flex items-center justify-center gap-2 p-3 rounded-xl font-bold bg-emerald-600 text-white hover:opacity-90 transition-opacity"
          >
            <Unlock size={20} /> OPEN
          </button>
          <button
            onClick={() => handleSelect('CLOSE')}
            className="flex items-center justify-center gap-2 p-3 rounded-xl font-bold bg-rose-600 text-white hover:opacity-90 transition-opacity"
          >
            <Lock size={20} /> CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantPage;