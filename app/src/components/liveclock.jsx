import React, { useState, useEffect } from 'react';

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const secondsDeg = (time.getSeconds() / 60) * 360;
  const minutesDeg = (time.getMinutes() / 60) * 360 + (time.getSeconds() / 60) * 6;
  const hoursDeg = ((time.getHours() % 12) / 12) * 360 + (time.getMinutes() / 60) * 30;

  const getNumberPosition = (index) => {
    const angle = (index - 3) * 30;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * 180;
    const y = Math.sin(radian) * 180;
    return { x, y };
  };

  const getMinuteMarkerPosition = (index) => {
    const angle = index * 6;
    const radian = (angle * Math.PI) / 180;
    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -200px)`,
      width: index % 5 === 0 ? '3px' : '1.5px',
      height: index % 5 === 0 ? '14px' : '6px',
      backgroundColor: index % 5 === 0 ? 'black' : 'gray',
      borderRadius: '1px',
    };
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="relative w-105 h-105 border-8 border-white rounded-full bg-white shadow-2xl flex justify-center items-center">
        <div
          className="absolute bg-black w-3 h-30 transform origin-bottom left-1/2 top-1/2 rounded-lg shadow-lg"
          style={{ transform: `translate(-50%, -100%) rotate(${hoursDeg}deg)` }}
        ></div>
        <div
          className="absolute bg-gray-700 w-2 h-49 transform origin-bottom left-1/2 top-1/2 rounded-lg shadow-lg"
          style={{ transform: `translate(-50%, -100%) rotate(${minutesDeg}deg)` }}
        ></div>
        <div
          className="absolute bg-red-500 w-1 h-52 transform origin-bottom left-1/2 top-1/2 rounded-full shadow-lg"
          style={{ transform: `translate(-50%, -100%) rotate(${secondsDeg}deg)` }}
        ></div>
        <div className="absolute w-6 h-6 bg-black rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md"></div>
        {[...Array(12)].map((_, i) => {
          const { x, y } = getNumberPosition(i + 1);
          return (
            <div
              key={i}
              className="absolute text-4x4 font-extrabold text-gray-900 flex justify-center items-center"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                width: '50px',
                height: '50px',
                textAlign: 'center',
                lineHeight: '50px',
              }}
            >
              {i + 1}
            </div>
          );
        })}
        {[...Array(60)].map((_, i) => (
          <div key={i} style={getMinuteMarkerPosition(i)}></div>
        ))}
      </div>
    </div>
  );
};

export default LiveClock;
