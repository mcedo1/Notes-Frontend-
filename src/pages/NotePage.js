import React,{useEffect, useState,useRef} from 'react'
// import notes from '../assets/data'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'


const NotePage = ({history}) => {
  const {id}=useParams()
  // let note =notes.find(note => note.id === Number(id))
  let navigate = useNavigate()
  let noteIdRef=useRef(id)
  console.log(noteIdRef)
  let [note,setNotes]=useState(1)
 


  useEffect(()=>{
    noteIdRef.current=id;
    getNotes()
  },[id])

  let getNotes= async () =>{
    if(noteIdRef.current==='new') return 
    let response=await fetch(`http://localhost:8000/notes/${id}`)
    let data=await response.json()
    setNotes(data)
  }

  let createNote= async()=>{
  await fetch(`http://localhost:8000/notes/`,{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({...note,'updated':new Date()})
  })
  
}
  let updateNote= async()=>{
  await fetch(`http://localhost:8000/notes/${id}`,{
    method:'PUT',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({...note,'updated':new Date()})
  })
  
}

  let deleteNote = async ()=>{
    await fetch(`http://localhost:8000/notes/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(note) 
    })
    navigate('/')
  }

  let handleSubmit= async ()=>{
    if(noteIdRef.current !== 'new' && !note.body){
      deleteNote()
    }else if(noteIdRef.current!=='new'){
      updateNote()
    }else if(noteIdRef.current==='new' && note!==null){
      createNote()
    }

  
    navigate('/')

  }




  return (  
    <div className='note'>
      <div className='note-header'>

        <h3>
          <Link to="/">
              <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        
        {noteIdRef.current !=='new' ? (
          <button onClick={deleteNote}>Delete</button>
        ):(
          <button onClick={handleSubmit}>Done</button>
          
        
        )}

        </div>
        
      
      <textarea onChange={(e)=> {setNotes({...note,'body':e.target.value})}} value={note?.body}/>
    </div>
  )
}

export default NotePage
