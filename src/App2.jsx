import { useEffect, useState } from "react"

function App2() {

    const [tasks, task_updater]=useState([])
    const [input_task_value,input_task_value_updater]=useState('')
    let tasks_list_array=[]
    let tasks_list=[]
    function add_task() {
        
    }

    const task_logger=useEffect(
                        ()=>{
                            if (localStorage.getItem('tasks_list')) {
                                console.log(localStorage.getItem('tasks_list'));
                                tasks_list_array=JSON.parse(localStorage.getItem('tasks_list'))
                                tasks_list=[...JSON.parse(localStorage.getItem('tasks_list')),tasks]
                                localStorage.setItem('tasks_list',JSON.stringify(tasks_list))
                            }
                        },
                        [tasks]
                    )

    return(
        <div id="App2" style={{'border':'2px solid green','paddingBlock':'1rem'}}>
            <input id="add_task_input" type="text" value={input_task_value}
            onChange={(e)=>{
                input_task_value_updater(e.target.value)
                
            }} />

            <button onClick={
                ()=>{
                    task_updater(t=>[...t, input_task_value])
                    input_task_value_updater('')
                }
            }>ADD TASK</button>

            {localStorage.getItem('tasks_list') &&<div id="tasks_main_div">
                {tasks_list.map((task,index)=>{
                return(
                    <div key={index}>
                        {`${index+1} ${task}`}
                    </div>
                )
                })
                }
            </div>}
        </div>
    )
}

export default App2