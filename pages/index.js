import Styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import shuffle from 'lodash'
import Timer from '@/components/Timer'

function Main({ questionData }){
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [shuffledAnswers, setShuffledAnswers] = useState([])
  const question = questionData[currentQuestion]
  const [score, setScore] = useState(0) 
  const [showScore, setShowScore] = useState(false)
  const router = useRouter()
  const DURATION = 10
  
  const handleTimeout = () => {
    setShowScore(true)
  }

  const handleAnswer = (isCorrect) => {
    if(currentQuestion < questionData.length - 1){
      setCurrentQuestion(currentQuestion + 1);
    } else{
      setShowScore(true)
    }
    if(isCorrect){
      setScore(score + 1)
      console.info("benar!")
    }
  }

  useEffect(() => {
    const answers = shuffle([...question.incorrect_answers, question.correct_answer])
    const finalAnswers = answers.value()
    setShuffledAnswers(finalAnswers)
  },[question])
 
  if(showScore){
    return(
      <Container className={Styles.main}>
          <div style={{
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div>
              <p className={Styles.scoreText}>You have Scored : {score}</p>
            </div>
              <Button className={Styles.buttonAJG} onClick={() => window.location.reload()}>Reset quiz</Button>
          </div>

      </Container>
    )
  }
  return(
      <Container className={Styles.main}>
            <Timer duration={DURATION} onTimeOut={handleTimeout} />
            <div style={{display: 'flex'}}>
              <div className={Styles.question} style={{display:'flex', justifyContent:'center',alignItems: 'center'}}> 
                    <p>{question.question.replace(/&quot;|&#039;|&amp;/g,"\"")}</p>
              </div>
                  <div>
                      <Stack gap={2}>
                       {shuffledAnswers.map((answer) => (
                        <Button key={answer} className={Styles.buttonAJG}
                        onClick={() => handleAnswer(answer === question.correct_answer)}>
                          {answer.replace(/&quot;|&#039;|&amp;/g,"\"")}
                        </Button>
                       ))}
                      </Stack>
                  </div>
              
            </div>
      </Container>
  )
}

export default Main

export async function getStaticProps(){
  const response = await axios.
  get('https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple')
  
  return{
    props:{
      questionData: response.data.results,
    },
  }
}