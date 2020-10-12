import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Introduction from '../Introduction';
import Title from '../Title';
import VersionControl from '../VersionControl';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
  submit: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}));

export default function Action(props) {
  const classes = useStyles();
  
  const { componentData } = props;
  const titleData = componentData.title;
  const introductionData = componentData.introduction;
  const [ title, setTitle ] = useState(titleData);
  const [ introduction, setIntroduction ] = useState(introductionData);

  return (
    <Container component="main">
      <Typography align="center" variant="h2">
        Action Component
      </Typography>
      <VersionControl 
        history={componentData.history} 
        setTitle={setTitle}
        setIntroduction={setIntroduction}
      />
      <Title title={title} setTitle={setTitle} />
      <Introduction 
        introduction={introduction} 
      />
      <div className={classes.container}>
        <form className={classes.form}>
          <Typography align="center" variant="h6">
            Option 1
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="option 1"
            label="Input Option 1 Text"
            name="option 1"
          />
          <Typography align="center" variant="h6">
            Option 2
          </Typography>
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="option 2"
            label="Input Option 2 Text"
            name="option 2"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Submit User Options
          </Button>
        </form>
      </div>
    </Container>
  );
}