const AboutProjectPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white pb-24">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              ABOUT THE PROJECT
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all">
              <h2 className="text-3xl font-bold text-cyan-400 mb-4">XArm Live Control System</h2>
              <p className="text-zinc-300 leading-relaxed text-lg mb-4">
                A real-time web-based control interface for robotic arm manipulation. This project enables
                users to control robotic movements through an intuitive voting system with live video feedback.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Features</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">▹</span>
                    <span>Real-time video streaming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">▹</span>
                    <span>Directional control (X, Y, Z axes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">▹</span>
                    <span>Vote-based action system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">▹</span>
                    <span>Live action tracking</span>
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">How It Works</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">▹</span>
                    <span>Select a directional action</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">▹</span>
                    <span>Lock in your vote</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">▹</span>
                    <span>Watch live video feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">▹</span>
                    <span>Track vote counts per action</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Architecture</h3>
              <p className="text-zinc-300 leading-relaxed">
                Built with a FastAPI backend for video streaming and control logic, and a React frontend
                with Tailwind CSS for a modern, responsive user interface. The system uses OpenCV for
                camera capture and real-time video processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProjectPage;
