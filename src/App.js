import React,{ useState } from 'react'
import './App.css'

const stageOrder = ['backlog','todo','ongoing','done']

const App = () => {
  // set task array for each stage
  const [backLogTask, setBackLogTask] = useState([])
  const [todoTask, setTodoTask] = useState([])
  const [ongoingTask, setOngoingTask] = useState([])
  const [doneTask, setDoneTask] = useState([])

  // set unique id for each card in the board
  const [id, setId] = useState(0)
  // for input bar
  const [taskName, setTaskName] = useState()


  const removeCard = ({id,array,stage}) => {
    if (stage===stageOrder[0]) {
      setBackLogTask(array.filter(item=>item['id']!==id))
    } else if (stage===stageOrder[1]) {
      setTodoTask(array.filter(item=>item['id']!==id))
    } else if (stage===stageOrder[2]) {
      setOngoingTask(array.filter(item=>item['id']!==id))
    } else if (stage===stageOrder[3]) {
      setDoneTask(array.filter(item=>item['id']!==id))
    }
  }


  const moveCardLeft = ({id,name,array,stage}) => {
    if (stage===stageOrder[1]) {
      removeCard({id,array,stage})
      setBackLogTask((task)=>[...task,{'id':id,'name':name,'stage':stageOrder[0]}])
    } else if (stage===stageOrder[2]) {
      removeCard({id,array,stage})
      setTodoTask((task)=>[...task,{'id':id,'name':name,'stage':stageOrder[1]}])
    } else if (stage===stageOrder[3]) {
      removeCard({id,array,stage})
      setOngoingTask((task)=>[...task,{'id':id,'name':name,'stage':stageOrder[2]}])
    } 
  }


  const moveCardRight = ({id,name,array,stage}) => {
    if (stage===stageOrder[0]) {
      removeCard({id,array,stage}) 
      setTodoTask((task)=>[...task,{'id':id,'name':name,'stage':stageOrder[1]}])
    } else if (stage===stageOrder[1]) {
      removeCard({id,array,stage})
      setOngoingTask((task)=>[...task,{'id':id,'name':name,'stage':stageOrder[2]}])
    } else if (stage===stageOrder[2]) {
      removeCard({id,array,stage})
      setDoneTask((task)=>[...task,{'id':id,'name':name,'stage':stageOrder[3]}])
    } 
  }


  const Card = ({name,id,array,stage}) => {
    return  (
      <>
      <div className="card">
        <div className="left-section">
          {name}
        </div>
        <div className="right-section">
          {(stage!==stageOrder[0])&&
            <button onClick={()=>moveCardLeft({id,name,array,stage})}>
            <i className='fas'>{'<'}</i></button>
          }
          {(stage!==stageOrder[3])&&
            <button onClick={()=>moveCardRight({id,name,array,stage})}>
            <i className='fas'>{'>'}</i></button>
           }
          <button onClick={()=>removeCard({id,array,stage})}><i className="fa">&#xf014;</i></button>
        </div>
      </div>
      </>
    )
  }

  

  return (
    <>
    <div className="site-wrapper">
        <h1>Kaban Board</h1>


      <div className="main-content">
        <div className="new-task">
          <input autoComplete='off' id='input' maxLength='50' type="text" placeholder="Enter new task name" onChange={(e)=>setTaskName(e.target.value)}/>
          <button onClick={()=>{
            taskName&&
            setBackLogTask((backLogTask)=>[...backLogTask,{'id':id,'name':taskName,'stage':stageOrder[0]}])
            setId((id)=>id+1)
            document.getElementById('input').value=''
          }
          }>Create Task</button>
        </div>

       {}


        <div className="stages">
          <div id='backlog' className="stage">
            <h2>Backlog</h2>
            {backLogTask.map((item,index,array)=>(
              item &&
              <Card key={index} name={item.name} id={item.id} array={array} stage={item.stage} />
            ))}

          </div>

          <div id='todo' className="stage">
            <h2>To Do</h2>
            {todoTask.map((item,index,array)=>(
              item &&
              <Card key={index} name={item.name} id={item.id} array={array} stage={item.stage} />
            ))}

          </div>


          <div id='ongoing' className="stage">
            <h2>Ongoing</h2>
            {ongoingTask.map((item,index,array)=>(
              item &&
              <Card key={index} name={item.name} id={item.id} array={array} stage={item.stage} />
            ))}

          </div>

          <div id='done' className="stage">
            <h2>Done</h2>
            {doneTask.map((item,index,array)=>(
              item &&
              <Card key={index} name={item.name} id={item.id} array={array} stage={item.stage} />
            ))}

          </div>

        </div>
      </div>


    </div>
    
    
    </>

  ) 
};



export default App
