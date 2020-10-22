import React, { useState } from "react";
import QuestionField from "./question";
import Button from "@material-ui/core/Button";
import "./questions.css";

function QuestionFields()  {
   const[questions, setQuestions] = useState([]);

   const [question, setEdit] = useState({
    id: Math.floor(Math.random() * 10000),
  });



  const removeQuestion = (questionID) => {
    console.log(questionID);
    const leftQuestions = questions.filter((q) => q.id !== questionID);
    setQuestions(leftQuestions);
  };

  const addQuestion = (e) => {
    
    const newQuestions = [...questions, question];
    setQuestions(newQuestions);
    console.log(...questions);
    setEdit( {id: Math.floor(Math.random() * 10000) } );

  }

  function updateIItem(iItemID, iItemBody) {
    //TODO
    //functional code to save items to backend
  }

  return (
      <div className="questions">
        <Button
          id="button"
          onClick={addQuestion}
          variant="contained"
          color="primary"
        >
          Add Question
        </Button>

        <form id="form">
        {questions.map((question) => (
            <QuestionField
              key= {question.id}
              removeQuestion= {removeQuestion}
              question = {question}
            />
        ))}
        </form>
      </div>
    );
  }


export default QuestionFields;
