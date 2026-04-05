import { useContext, useEffect, useState } from 'react'
import './App.css'
import QuestionCard from './components/QuestionCard'
import { MarksContext } from './context/MarksObtained'
import { Link } from 'react-router-dom'

function App(props) {
  
  const {marks}=useContext(MarksContext)

  {/* For sound starts */}

  const [sound_check,sound_check_toggle]=useState(true)
  
  useEffect(()=>{
    const storedSoundPreference=localStorage.getItem('sound')
    if (storedSoundPreference !== null) {
      sound_check_toggle(localStorage.getItem('sound'))
      sound_check_toggle( (storedSoundPreference === 'true') )
    }
    else{
      sound_check_toggle(true)
    }
  }, [sound_check])
  
  function setSoundLocalStorage(val) {
    localStorage.setItem('sound',val)
    console.log('sound:', localStorage.getItem('sound'));
  }
  
  function sound_toogle() {
    sound_check_toggle(val=>
      {
        const newval=!val
        setSoundLocalStorage(newval)
        return newval;
      } )
  }

  {/* For sound ends */}
    
  return(
    <div id='App'>

      <Link to={'/'}>
      <h2>BACK TO HOME</h2>
      </Link>
      <div>
        <button onClick={
          sound_toogle
        }>
          SOUND: {sound_check?'ON':'OFF'}
        </button>
      </div>

        <div style={{position:'sticky',top:'0px',fontSize:'2rem',background:'Blue',paddingBlock:'1rem'}}>
        MARKS OBTAINED: {marks}/10
        </div>

      {props.set.map(
          (question)=>{
            return (

              < QuestionCard 

                key={question.question_id}
                question_id={question.question_id}
                question_text={question.question_text}
                question_options={question.question_options}
                question_correct_answer={question.correct_answer}

                sound_allowance={sound_check}
              />
            
            )
          }
        )}

    </div>
  )
}

export default App
