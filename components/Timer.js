import { useState, useEffect } from "react";
import Styles from '../styles/Utils.module.css'
const Timer = ({ duration, onTimeOut }) => {
    const [secondsLeft, setSecondsLeft] = useState(duration)

    useEffect(() => {
        const timerId = setInterval(() => {
            setSecondsLeft(secondsLeft -1)
        }, 1000)
        return () => clearInterval(timerId)
    }, [secondsLeft])

    useEffect(() => {
        if(secondsLeft === 0) {
            onTimeOut()
        }
    },[secondsLeft, onTimeOut])

    return(
        <div className={Styles.timer}>
            <p className={Styles.timerText}>Time Left: {secondsLeft} seconds</p>
        </div>

    )
}

export default Timer