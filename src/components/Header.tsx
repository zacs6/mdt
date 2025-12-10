import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-[8vh] w-screen bg-neutral-800 border-b-2 border-neutral-700 justify-between items-center px-8">
      <h1 className="text-2xl">MDT</h1>
      <h1 className="text-xl">
        {time}
        <br />
        {new Date().toLocaleDateString()}
      </h1>
    </div>
  );
}
