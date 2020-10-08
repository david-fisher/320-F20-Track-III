import React, {useState} from 'react';
import Introduction from '../Introduction';
import Title from '../Title';
import {
  Button,
  TextField,
  Typography,
  Container,
  Link,
  Grid,
} from '@material-ui/core';
import QuestionList from '../questionList'



export default function MiddleReflection() {
  const [questions,setQuestions] = useState([

  ])
  const [count,setCount] = useState(1)
  const [currQuestion,setCurrQuestion] = useState("")

  const handleTextFieldChange = hq =>{
    setCurrQuestion(hq.target.value)
  }

  function handleAdd(){
    setCount(count+1)
    const addQuestion = questions.concat({id: count, question:currQuestion})
    setQuestions(addQuestion)
    setCurrQuestion("")
  }
  return (
    <div>
      <Typography align="center" variant="h2">
        Reflections
      </Typography>
      <Title />
      <Introduction />
      <QuestionList questions={questions}/>
      <TextField value={currQuestion} onChange={handleTextFieldChange}></TextField>
      <Button variant="contained" onClick={handleAdd}>add Question</Button>
    </div>
  );
}
