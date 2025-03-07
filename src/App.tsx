import { PomodoroTimer } from "./components/Pomodoro-timer";

function App() {
  return (
    <>
      <div className="container">
        <PomodoroTimer
          pomodoroTimer={1500}
          shortRestTime={5}
          longRestTime={5}
          cycles={4}
        />
      </div>
    </>
  );
}

export default App;
