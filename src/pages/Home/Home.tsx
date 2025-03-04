import { useNavigate } from 'react-router'
import { RotatingTomato } from '../../components/tomato/RotatingTomato'

export function Home() {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center h-screen w-full'>
      <div>
        <RotatingTomato />
      </div>
      <div className='card text-center'>
        <h1 className='text-xl font-bold'>Pomodoro Timer</h1>
        <p className='text-lg'>A simple timer to help you focus on your tasks.</p>
        <button onClick={() => navigate('/timer')} className='btn px-32'>Start</button>
      </div>
    </div>
  )
}