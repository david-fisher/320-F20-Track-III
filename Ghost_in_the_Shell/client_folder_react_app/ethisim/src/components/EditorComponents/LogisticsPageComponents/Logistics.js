import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Author from './Author';
import { isBrowser } from 'react-device-detect';
import { Button, TextField, Typography, Container } from '@material-ui/core';
import axios from 'axios';
import { ContactsOutlined } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    textfields: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    buttons: {
        '& > *': {
            margin: theme.spacing(1),
            marginBottom: theme.spacing(1),
            width: '100%',
            textTransform: 'unset',
        },
    },
    authorButtons: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        textTransform: 'unset',
    },
    subdiv: {
        marginTop: theme.spacing(1),
        width: '750px',
        '@media (max-width: 1100px)': {
            width: '100%',
        },
    },
}));

export default function Logistics() {
    const classes = useStyles();
    //temporary until backend implements id's
    const [id, setId] = useState(17);
    const [authors, setAuthor] = useState([<Author key={id} />]);
    const [title,setTitle] = useState('');
    const [course,setCourse] = useState('');
    const [shouldFetch, setShouldFetch] = useState(0);

    const addAuthor = (event) => {
        setAuthor(authors.concat(<Author key={id + 1} />));
        setId(id + 1);
        event.preventDefault();
    };




  const [NewScenario, setEdit] = useState({
        SCENARIO: 0,
        VERSION: 0,
        NAME: "" , 
        PUBLIC: false,
        NUM_CONVERSATION: 0,
        PROFESSOR: 0,
        IS_FINISHED: false, 
        DATE_CREATED: " ",
        COURSES: [],
    
});


let getData = function get() {
 const res = axios.get('http://localhost:8000/logistics?scenario_id=' + id).then(function (response) {
  //console.log(response.data);
  NewScenario.SCENARIO = response.data.SCENARIO;
  NewScenario.VERSION= response.data.VERSION;
  NewScenario.NAME = response.data.NAME;
  NewScenario.PUBLIC = response.data.PUBLIC;
  NewScenario.NUM_CONVERSATION = response.data.NUM_CONVERSATION;
  NewScenario.PROFESSOR = response.data.PROFESSOR;
  NewScenario.IS_FINISHED = response.data.IS_FINISHED;
  NewScenario.DATE_CREATED = response.data.DATA_CREATED;
  NewScenario.COURSES = response.data.COURSES;
  setEdit(NewScenario);
  console.log("doggy");
  console.log(NewScenario);
  console.log(NewScenario.NAME);
});
}

useEffect(getData, [shouldFetch]);

const handleSave = () => {
    console.log("Sending Put");
    console.log( NewScenario);
    axios.put(`http://localhost:8000/logistics?scenario_id=` + id,  NewScenario )
    .then(res => {
      console.log(res.data);
    })

}

const handleOnChange = event => {
    console.log("changed name");
    NewScenario.NAME = event.target.value 
    setEdit(NewScenario);
  };

  

  



    //default if it's a browser
    var body = (
        <Container component="main">
            <Typography align="center" variant="h2">
                Logistics
            </Typography>
            <form className={classes.textfields} noValidate autoComplete="off">
                Simulation Title
                <TextField id="Simulation Title" value= {title} label="" onChange= {handleOnChange} />
                Course Name
                <TextField id="Course Name" value= {course} label=""  />
                Authors
            </form>
            {authors}
            <div className={classes.subdiv}>
                <form className={classes.buttons} noValidate autoComplete="off">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addAuthor}
                    >
                        Add Author
                    </Button>
                    <Button variant="contained" color="primary">
                        Save Authors
                    </Button>
                    <Button variant="contained" color="primary">
                        Put
                    </Button>
                </form>
            </div>
            <Typography align="left" variant="h6">
                Scenario ID: {id}
            </Typography>
            <Typography align="left" variant="h6">
                Shareable Link: wwww.ethisim.com
            </Typography>
            <div className={classes.subdiv}>
                <form className={classes.buttons} noValidate autoComplete="off">
                    <Button variant="contained">View Student Responses</Button>
                    <Button variant="contained" color="primary">
                        Delete Scenario
                    </Button>
                    <Button variant="contained" color="primary">
                        View Version History
                    </Button>
                </form>
            </div>
        </Container>
    );

    //convert this to "isMobile" later; using "isBrowser" for testing purposes
    if (isBrowser) {
        
        body = (
            <Container component="main">
                <Typography align="center" variant="h2">
                    Logistics
                </Typography>
                
                <form
                    className={classes.textfields}
                    noValidate
                    autoComplete="off"
                   
                >
                    Simulation Title
                    <TextField id="Simulation Title" value= {NewScenario.NAME} label="" onChange= {handleOnChange} />
                Course Name
                <TextField id="Course Name" value= {course} label="" />
                Authors
                </form>
                {authors}
                <div className={classes.subdiv}>
                    <form
                        className={classes.buttons}
                        noValidate
                        autoComplete="off"
                    >
                        
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addAuthor}
                        >
                            Add Author
                        </Button>
                        <Button variant="contained" color="primary">
                            Save Authors
                        </Button>
                    </form>
                    
                </div>
                <Typography align="left" variant="h6">
                    Scenario ID: {id}
                </Typography>
                
                <Typography align="left" variant="h6">
                    Shareable Link: wwww.ethisim.com
                </Typography>
                <div className={classes.subdiv}>
                    
                    <form
                        className={classes.buttons}
                        noValidate
                        autoComplete="off"
                    >
                        <Button variant="contained">
                            View Student Responses
                        </Button>
                        <Button variant="contained" color="primary">
                            View Version History
                        </Button>
                        <Button variant="contained" color="primary"  onClick={handleSave}>
                        SAVE
                    </Button>
                    </form>
                </div>
            </Container>
        );
    }

    return body;
}
