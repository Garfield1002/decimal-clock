import { useEffect, useState } from "react";
import Clock from "./Clock";

function App() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Get the number of seconds since midnight
      const now = new Date();
      const milliseconds = now.getMilliseconds();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();
      const time = hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
      setTime(time);
    }, 100);

    return () => clearInterval(interval);
  }, [setTime]);

  return (
    <div className="flex md:flex-row flex-col justify-center items-center h-screen bg-gray-500">
      <Clock time={time} />
      <div className="flex flex-col">
        <h1 className="text-white md:text-8xl text-4xl font-bold">
          Decimal Clock
        </h1>
        <h2 className="text-white md:text-2xl text-xl font-bold">
          Inspired by Carsten Höller
        </h2>
      </div>
    </div>
  );
}

export default App;
