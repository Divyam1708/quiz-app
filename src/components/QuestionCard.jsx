import {useState, useContext} from 'react';
import '../styles/questionCard.css'
import correct_option_sound from '../assets/sounds/success.mp3' 
import wrong_option_sound from '../assets/sounds/error.mp3' 
import { MarksContext } from '../context/MarksObtained';


function QuestionCard(props){
 
    const {setMarks}=useContext(MarksContext)

    const [marksStatus,setMarksStatus]=useState(null)
    const [answeredStatus,setAnsweredStatus]=useState(null)

    const correct_option_chosen_audio = new Audio(correct_option_sound)
    const wrong_option_chosen_audio=new Audio(wrong_option_sound)

    
    const [show_options_value,show_options_value_toggle]=useState(false)
    const [option_check,option_check_function]=useState(null)
    const [selected_option,selected_option_slector_function]=useState(null)
    const [per_question_marks,per_question_marks_calculator]=useState(0)
    

    function make_option_visible(){
        show_options_value_toggle(val => !val)
    }

    function check_correct_option(option) {

        if (option==props.question_correct_answer) {
            selected_option_slector_function(option)
            option_check_function('correct')
            per_question_marks_calculator(Number(1))
            if (marksStatus!=='marks_added' && !answeredStatus) {
                setMarks(prev=> prev+1)
                setMarksStatus('marks_added');
                setAnsweredStatus(true)
            }
            if (props.sound_allowance) {
                wrong_option_chosen_audio.pause()
                correct_option_chosen_audio.pause()
                correct_option_chosen_audio.play()
            }
        }
        else{
            selected_option_slector_function(null)
            option_check_function('wrong')
            per_question_marks_calculator(0)
            if (marksStatus!=='marks_substracted' && answeredStatus) {
                setMarks(prev=> prev-1)
                setMarksStatus('marks_substracted');
                setAnsweredStatus(null)
            }
            if (props.sound_allowance) {
                wrong_option_chosen_audio.pause()
                correct_option_chosen_audio.pause()
                wrong_option_chosen_audio.play()
            }
        }
    }

    return(
        <>
            <div className={`question_card ${option_check==='correct'?'correct_card':''} ${option_check==='wrong'?'wrong_card':''}`} >
                
                <div className='question_text_box'>
                    {props.question_text}
                </div>
                <div className='marks_obtained_per_question'>
                    {per_question_marks}/1
                </div>
                <button className='option_show_button'
                onClick={make_option_visible}
                >{show_options_value===true?'HIDE':'SHOW'} OPTIONS</button>



                {
                show_options_value && 
                <div className={`options_box `} >
                    {props.question_options.map((option,index)=>{
                        let buttonClass=`question_options `
                        if(selected_option===option){
                            buttonClass=buttonClass+(option===props.question_correct_answer?'correct_option_button':'wrong_option_button')
                        }
                        else if (selected_option!==option) {
                            buttonClass=`question_options `
                        }

                    return(
                    <button className={buttonClass} key={index}
                    onClick={()=>{ 
                        check_correct_option(option)
                        }}>
                        {index+1}. {option}
                    </button>)
                    })}
                </div>
                }

                {!show_options_value && <div>
                    {option_check}
                </div>}
                
            </div>
        </>
    )
}




export default QuestionCard