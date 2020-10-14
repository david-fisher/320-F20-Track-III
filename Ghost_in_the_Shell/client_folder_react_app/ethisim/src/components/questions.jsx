import React, { Component } from "react";
import QuestionField from "./question";
import Button from "@material-ui/core/Button";
import "./questions.css";

class QuestionFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionCur: {
        key: " ",
        id: 0,
      },
    };
    this.addItem = this.addItem.bind(this);
  }

  handleDelete = (questionID) => {
    const questions = this.state.questions.filter((q) => q.id !== questionID);
    this.setState({ questions });
  };

  addItem(e) {
    e.preventDefault();
    const newQuestion = this.state.questionCur;
    const newQuestions = [...this.state.questions, newQuestion];

    this.setState({
      questions: newQuestions,
      questionCur: {
        key: " ",
        id: this.state.questionCur.id + 1,
      },
    });
  }

  render() {
    return (
      <div className="questions">
        <Button
          id="button"
          onClick={this.addItem}
          variant="contained"
          color="primary"
        >
          Add Question
        </Button>

        <form id="form">
          {this.state.questions.map((question) => (
            <QuestionField
              key={question.id}
              onDelete={this.handleDelete}
              question={question}
            />
          ))}
        </form>
      </div>
    );
  }
}

export default QuestionFields;

