import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseEnterElement = () => setIsHovering(true);
    const handleMouseLeaveElement = () => setIsHovering(false);

    window.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, select, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterElement);
      el.addEventListener('mouseleave', handleMouseLeaveElement);
    });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterElement);
        el.removeEventListener('mouseleave', handleMouseLeaveElement);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`w-6 h-6 rounded-full border-2 border-cyan-400 transition-all duration-300 ${
            isHovering ? 'scale-150 bg-cyan-400/20' : 'scale-100'
          }`}
          style={{
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)',
          }}
        />
      </div>
      <div
        className="fixed pointer-events-none z-[9999] transition-opacity duration-300"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`w-2 h-2 rounded-full bg-cyan-400 transition-all duration-200 ${
            isHovering ? 'scale-150' : 'scale-100'
          }`}
          style={{
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
