import { RotatingTomato } from "@/components/tomato/RotatingTomato"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

enum TimerType {
    WORK = 'work',
    REST = 'rest'
}

export const Timer = () => {
    const DEFAULTTIME = 1500
    const DEFAULTRESTTIME = 300

    const navigate = useNavigate()
    const [timeLeft, setTimeLeft] = useState(DEFAULTTIME)
    const [hasStarted, setHasStarted] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const [timerType, setTimerType] = useState<TimerType>(TimerType.REST)
    const [timesUp, setTimesUp] = useState(false)

    function startTimer() {
        if (isRunning) {
            stopTimer()
        }
        setTimerType(TimerType.WORK)
        setIsRunning(true)
        setHasStarted(true)
        setTimeLeft(DEFAULTTIME)
        setTimesUp(false)
    }

    function stopTimer() {
        setIsRunning(false)
    }

    function resumeTimer() {
        setIsRunning(true)
    }

    function isTimerButtonDisabled(componentTimerType: TimerType) {
        return (
            isRunning && timerType !== componentTimerType
        ) || (
            timesUp && timerType === componentTimerType
        )
    }

    function startRest() {
        if (isRunning) {
            stopTimer()
        }
        setTimerType(TimerType.REST)
        setIsRunning(true)
        setHasStarted(true)
        setTimeLeft(DEFAULTRESTTIME)
        setTimesUp(false)
    }

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev === 0) {
                        clearInterval(interval)
                        setIsRunning(false)
                        setTimesUp(true)
                        return 0
                    }
                    return prev - 1
                })
            }
            , 1000)
            return () => clearInterval(interval)
        }
    }, [isRunning])
    
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
          <div className="flex items-center justify-center">
            <RotatingTomato />
          </div>
          <div>
            {/* Timer */}
            { timesUp ?
            <p className="text-4xl">
                {timerType === TimerType.WORK ? 'Take a break!' : 'Back to work!'}
            </p>
            :
            <p className="text-4xl">
                {(Math.floor(timeLeft/60))}:{(timeLeft % 60).toString().padStart(2, '0')}
            </p>
            }
          </div>
          <div className='card'>
            <div 
            className="flex items-center justify-center flex-row gap-2 absolute bottom-20 right-0 left-0"
            >
                <button 
                  className={`btn`}
                  disabled={isTimerButtonDisabled(TimerType.WORK)} 
                  onClick={startTimer}
                >
                    {timerType === TimerType.WORK && isRunning ? 'Restart' : 'Work'}
                </button>
                <button 
                  className={`btn`} 
                  disabled={!hasStarted || timesUp} 
                  onClick={isRunning ? stopTimer : resumeTimer}
                >
                    {isRunning || timesUp ? 'Pause' : 'Resume'}
                </button>
                <button 
                  className={`btn`} 
                  onClick={startRest}
                  disabled={isTimerButtonDisabled(TimerType.REST)}
                >
                   {timerType === TimerType.REST && isRunning ? 'Restart' : 'Rest'}
                </button>
            </div>
          </div>
        </div>
      )
}
