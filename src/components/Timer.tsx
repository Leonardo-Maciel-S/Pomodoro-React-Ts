import { secondesToMinute } from "./utils/seconds-to-minute";

interface TimerProps {
  mainTime: number;
}

export function Timer({ mainTime }: TimerProps) {
  return <div className="timer">{secondesToMinute(mainTime)}</div>;
}
