import * as React from 'react';
import {useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {container,Paper} from '@mui/material';
import Button from '@mui/material/Button';


export default function Student() {
    const paperstyle = {padding:'50px 20px',width :600,margin:"20px auto"}
    const[name,setName]=React.useState('') 
    const[address,setAddress]=React.useState('')
    const[students,setStudents]=useState([])
    

    const handleClick=(e)=>{
    e.preventDefault()
    const student={name,address}
    console.log(student)
    fetch("http://localhost:8080/student/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)
    }).then(()=>{
        console.log("New Student Added")
    })
    
}

React.useEffect(()=>{
    fetch("http://localhost:8080/student/getAll")
    .then(res=>res.json())
    .then((result)=>{
        setStudents(result);
    }
)
},[])


  return (
    <container>
    <Paper elevation ={3} style ={paperstyle}>
        <h1 style ={{color:"blue"}}><u>Add Student</u></h1>
    <Box
      component="form"
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student Name" variant="outlined" margin ="normal" fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Student Address" variant="outlined" margin ="normal" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
      <Button variant="contained" color="success" onClick={handleClick}>
        Submit
      </Button>
        </Box>
  
        </Paper>
        <h1>Students</h1>

        <Paper elevation={3} style={paperstyle}>

            {students.map(student=>(
                <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} KEY={student.id}>
                ID:{student.id}<br/>    
                Name:{student.name}<br/>
                Address:{student.address}

                </Paper>
          ))
    
    }


        </Paper>




         </container>
  );
  
}
