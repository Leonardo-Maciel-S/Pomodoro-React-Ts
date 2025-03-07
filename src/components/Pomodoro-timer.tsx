import { useCallback, useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { Button } from "./Button";
import { Timer } from "./Timer";
import bellStart from "../sounds/bell-start.mp3";
import bellFinish from "../sounds/bell-finish.mp3";
import { secondesToTime } from "./utils/seconds-to-time";

const audioStart = new Audio(bellStart);
const audioFinish = new Audio(bellFinish);

type PomodoroTimerProps = {
  pomodoroTimer: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
};

export function PomodoroTimer({
  pomodoroTimer,
  shortRestTime,
  longRestTime,
  cycles,
}: PomodoroTimerProps) {
  const [mainTime, setMainTime] = useState<number>(pomodoroTimer);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);

  const newArray = new Array(cycles - 1).fill(true);
  const [qtdCycles, setQtdCycles] = useState(newArray);

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null
  );

  const configureWorking = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(pomodoroTimer);
    audioStart.play();
  }, [setTimeCounting, setResting, setWorking, setMainTime, pomodoroTimer]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      audioFinish.play();

      if (long) {
        setMainTime(longRestTime);
      } else {
        setMainTime(shortRestTime);
      }
    },
    [
      setTimeCounting,
      setResting,
      setWorking,
      setMainTime,
      longRestTime,
      shortRestTime,
    ]
  );

  const pauseTimer = () => {
    setTimeCounting(!timeCounting);
  };

  useEffect(() => {
    if (working) document.body.classList.add("working");
    if (resting) document.body.classList.remove("working");

    if (mainTime > 0) return;

    if (working && qtdCycles.length > 0) {
      configureRest(false);
      qtdCycles.pop();
    } else if (working && qtdCycles.length <= 0) {
      configureRest(true);
      setQtdCycles(newArray);
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWorking();
  }, [
    working,
    resting,
    mainTime,
    setNumberOfPomodoros,
    setCompletedCycles,
    setQtdCycles,
    completedCycles,
    configureWorking,
    newArray,
    numberOfPomodoros,
    configureRest,
    qtdCycles,
  ]);

  return (
    <div className="pomodoro">
      <h2>Você está: {working ? "Trabalhando" : "Descansando"}</h2>

      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button onClick={configureWorking}>Work</Button>
        <Button
          className={!working && !resting ? "hidden" : ""}
          onClick={pauseTimer}
        >
          {timeCounting ? "Pause" : "Start"}
        </Button>
        <Button onClick={() => configureRest(false)}>Rest</Button>
      </div>

      <div className="details">
        <p>Ciclos completos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondesToTime(fullWorkingTime)}</p>
        <p>Pomodoros concluído: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
