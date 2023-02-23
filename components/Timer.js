import { useState, useEffect, useRef } from "react";
import Styles from '../styles/Utils.module.css'
const Timer = ({ duration, onTimeOut }) => {
    const [secondsLeft, setSecondsLeft] = useState(duration)
    const intervalRef = useRef(null)

    useEffect(() => {
         intervalRef.current = setInterval(() => {
            setSecondsLeft(secondsLeft => {
                if(secondsLeft === 1){
                    clearInterval(intervalRef.current)
                    onTimeOut();
                }
                return secondsLeft - 1;
            })
        }, 1000)

        return () => clearInterval(intervalRef.current)
    }, [duration, onTimeOut])

    return(
        <div className={Styles.timer}>
            <p className={Styles.timerText}>Time Left: {secondsLeft} seconds</p>
        </div>

    )
}

export default Timer