import React,{useState,useEffect, useCallback} from 'react'
import '../../styles/clock.css'

const Clock = () => {

    const [days, setDays] = useState()
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()

    const countDown = useCallback(() => {
    const destination = new Date('Septembar 30, 2023').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = destination - now;

      if (difference <= 0) {
        clearInterval(interval);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    }, 1000);
    return interval; // Return the interval ID
  }, []);

    useEffect(() => {
        const intervalId = countDown();
        return () => clearInterval(intervalId);
    }, [countDown]);

  return <div className="clock_wrapper d-flex align-items-center gap-3">
    <div className="clock_data d-flex align-items-center gap-3">
        <div className='text-center'>
            <h1 className='text-white fs-3 mb-2'>{days}</h1>
            <h5 className='text-white fs-6'>Days</h5>
        </div>
        <span className='text-white fs-3'>:</span>
    </div>

    <div className="clock_data d-flex align-items-center gap-3">
        <div className='text-center'>
            <h1 className='text-white fs-3 mb-2'>{hours}</h1>
            <h5 className='text-white fs-6'>Hours</h5>
        </div>
        <span className='text-white fs-3'>:</span>
    </div>

    <div className="clock_data d-flex align-items-center gap-3">
        <div className='text-center'>
            <h1 className='text-white fs-3 mb-2'>{minutes}</h1>
            <h5 className='text-white fs-6'>Minutes</h5>
        </div>
        <span className='text-white fs-3'>:</span>
    </div>

    <div className="clock_data d-flex align-items-center gap-3">
        <div className='text-center'>
            <h1 className='text-white fs-3 mb-2'>{seconds}</h1>
            <h5 className='text-white fs-6'>Seconds</h5>
        </div>
    </div>
  </div>
}

export default Clock