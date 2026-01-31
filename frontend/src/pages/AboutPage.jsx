const AboutPage = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white pb-32">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              ABOUT US
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Our Mission</h2>
              <p className="text-zinc-300 leading-relaxed">
                We're building the future of collaborative robotics, enabling real-time control and interaction
                with robotic systems through intuitive interfaces and cutting-edge technology.
              </p>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Our Vision</h2>
              <p className="text-zinc-300 leading-relaxed">
                To democratize robotics control, making advanced robotic manipulation accessible to everyone
                through web-based interfaces and real-time feedback systems.
              </p>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all md:col-span-2">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Technology Stack</h2>
              <div className="flex flex-wrap gap-3">
                {['React', 'FastAPI', 'OpenCV', 'WebSockets', 'Tailwind CSS', 'Python'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 font-mono text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div className="bg-zinc-900/50 backdrop-blur-xl border-2 border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">OUR TEAM</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Robots Team */}
              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono text-center">ROBOTS TEAM</h3>
                <div className="grid grid-cols-3 gap-4">
                  {robotsTeam.map((member, index) => (
                    <div
                      key={index}
                      className="aspect-square border-2 border-cyan-500/30 bg-zinc-800/50 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-3 hover:border-cyan-500 hover:bg-cyan-500/10 hover:scale-105 transition-all cursor-pointer group"
                      style={{
                        boxShadow: 'inset 0 0 10px rgba(34, 211, 238, 0.1)',
                      }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-2 group-hover:scale-110 transition-transform"></div>
                      <span className="text-xs text-cyan-400 font-mono font-bold">{member.name}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">{member.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Web Dev Team */}
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4 font-mono text-center">WEB DEV TEAM</h3>
                <div className="grid grid-cols-4 gap-3">
                  {webDevTeam.map((member, index) => (
                    <div
                      key={index}
                      className="aspect-square border-2 border-purple-500/30 bg-zinc-800/50 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-2 hover:border-purple-500 hover:bg-purple-500/10 hover:scale-105 transition-all cursor-pointer group"
                      style={{
                        boxShadow: 'inset 0 0 10px rgba(168, 85, 247, 0.1)',
                      }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-2 group-hover:scale-110 transition-transform"></div>
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
    </div>
  );
};

export default AboutPage;
