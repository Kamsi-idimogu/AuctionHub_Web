import { useState, useEffect } from "react";

interface AuctionCountdownProps {
  endTime: string;
  className?: string;
  style?: React.CSSProperties;
}

const AuctionCountdown = ({ endTime, className, style }: AuctionCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const endTimeInt = Number(endTime);
      const distance = endTimeInt - now;

      // If the countdown is over, stop the timer
      if (distance < 0) {
        setTimeLeft("00:00:00");
        return;
      }

      // Calculate hours, minutes and seconds remaining
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Format time string
      const timeStr = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      setTimeLeft(timeStr);
    };

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <span className={className} style={style}>
      {timeLeft}
    </span>
  );
};

export default AuctionCountdown;
