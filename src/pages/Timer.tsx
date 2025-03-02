import ASCIIText from "@/components/ascii/ASCIIText"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

enum TimerType {
    WORK = 'work',
    REST = 'rest'
}

export const Timer = () => {
    const DEFAULTTIME = 2
    const DEFAULTRESTTIME = 300

    const navigate = useNavigate()
    const [timeLeft, setTimeLeft] = useState(DEFAULTTIME)
    const [hasStarted, setHasStarted] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const [timerType, setTimerType] = useState<TimerType>(TimerType.WORK)
    const [timesUp, setTimesUp] = useState(false)

    function startTimer() {
        setIsRunning(true)
        setHasStarted(true)
        setTimeLeft(DEFAULTTIME)
        setTimesUp(false)
    }

    function stopTimer() {
        setIsRunning(false)
    }

    function startRest() {
        if (isRunning) {
            stopTimer()
        }
        setTimeLeft(DEFAULTRESTTIME)
        setTimesUp(false)
        startTimer()
    }

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev === 0) {
                        clearInterval(interval)
                        setIsRunning(false)
                        return 0
                    }
                    if (prev === 1) {
                        setTimesUp(true)
                        setTimerType(timerType === TimerType.WORK ? TimerType.REST : TimerType.WORK)
                    }
                    return prev - 1
                })
            }
            , 1000)
            return () => clearInterval(interval)
        }
    }, [isRunning])
    
    return (
        <div className='flex flex-col items-center justify-center h-screen w-full'>
          <div className="flex items-center justify-center">
            {/* <RotatingTomato /> */}
            <ASCIIText
            text='🍅'
            enableWaves={true}
            textFontSize={150}
            planeBaseHeight={10}
            />
            {/* Timer */}
            {timesUp?
            <ASCIIText
            text={`${timerType === TimerType.WORK ? 'Take a break!' : 'Back to work!'}`}
            enableWaves={false}
            asciiFontSize={7}
            planeBaseHeight={5}
            textFontSize={50}
            />
            :<ASCIIText
            text={`${(Math.floor(timeLeft/60))}:${(timeLeft % 60).toString().padStart(2, '0')}`}
            enableWaves={false}
            asciiFontSize={5}
            planeBaseHeight={10}
            textFontSize={100}
            />}
          </div>
          <div className='card'>
            <div 
            className="flex items-center justify-center flex-row gap-2 absolute bottom-20 right-0 left-0"
            >
                <button 
                  className={`btn`}
                  disabled={timesUp && timerType === TimerType.WORK} 
                  onClick={startTimer}
                >
                    {timerType === TimerType.WORK && isRunning ? 'Restart' : 'Work'}
                </button>
                <button 
                  className={`btn`} 
                  disabled={!hasStarted || timesUp} 
                  onClick={isRunning ? stopTimer : startTimer}
                >
                    {isRunning || timesUp ? 'Pause' : 'Resume'}
                </button>
                <button 
                  className={`btn`} 
                  onClick={startRest}
                  disabled={timesUp && timerType === TimerType.REST}
                >
                   {timerType === TimerType.REST && isRunning ? 'Restart' : 'Rest'}
                </button>
            </div>
          </div>
        </div>
      )
}
