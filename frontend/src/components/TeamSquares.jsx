const TeamSquares = () => {
  const robotsTeam = [
    { name: 'Robot 1', role: 'Robotics' },
    { name: 'Robot 2', role: 'Robotics' },
    { name: 'Robot 3', role: 'Robotics' },
  ];

  const webDevTeam = [
    { name: 'Dev 1', role: 'Web Dev' },
    { name: 'Dev 2', role: 'Web Dev' },
    { name: 'Dev 3', role: 'Web Dev' },
    { name: 'Dev 4', role: 'Web Dev' },
  ];

  return (
    <div className="fixed bottom-24 left-0 right-0 z-30 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-zinc-900/80 backdrop-blur-xl border-2 border-cyan-500/20 rounded-2xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Robots Team */}
            <div>
              <h3 className="text-cyan-400 font-bold text-sm mb-3 font-mono">ROBOTS TEAM</h3>
              <div className="grid grid-cols-3 gap-3">
                {robotsTeam.map((member, index) => (
                  <div
                    key={index}
                    className="aspect-square border-2 border-cyan-500/30 bg-zinc-800/50 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center p-2 hover:border-cyan-500 hover:bg-cyan-500/10 hover:scale-105 transition-all cursor-pointer group"
                    style={{
                      boxShadow: 'inset 0 0 10px rgba(34, 211, 238, 0.1)',
                    }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-2 group-hover:scale-110 transition-transform"></div>
                    <span className="text-[10px] text-cyan-400 font-mono font-bold">{member.name}</span>
                    <span className="text-[8px] text-zinc-500 font-mono">{member.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Web Dev Team */}
            <div>
              <h3 className="text-cyan-400 font-bold text-sm mb-3 font-mono">WEB DEV TEAM</h3>
              <div className="grid grid-cols-4 gap-2">
                {webDevTeam.map((member, index) => (
                  <div
                    key={index}
                    className="aspect-square border-2 border-purple-500/30 bg-zinc-800/50 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center p-2 hover:border-purple-500 hover:bg-purple-500/10 hover:scale-105 transition-all cursor-pointer group"
                    style={{
                      boxShadow: 'inset 0 0 10px rgba(168, 85, 247, 0.1)',
                    }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-2 group-hover:scale-110 transition-transform"></div>
                    <span className="text-[10px] text-purple-400 font-mono font-bold">{member.name}</span>
                    <span className="text-[8px] text-zinc-500 font-mono">{member.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSquares;
