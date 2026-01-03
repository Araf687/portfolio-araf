import { useEffect, useState } from "react";

// --------------------
// AnimatedCounter Component
// --------------------
interface AnimatedCounterProps {
  end: number;
  duration?: number; // in seconds
  suffix?: string;
}

const AnimatedCounter = ({ end, duration = 1, suffix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60); // assuming 60 frames per second
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 1000 / 60); // 60fps

    return () => clearInterval(interval);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};
export default AnimatedCounter;