import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Avatar,
  Grid,
  TextField,
} from '@material-ui/core';
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import htmlToText from 'html-to-text';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  avatar: {
    margin: theme.spacing(2),
  },
  avatarSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (max-width:1100px)': { 
      width: '100%',
      flexBasis: '0%',
      minWidth: '100%',
      marginBottom: theme.spacing(1),
    }
  },
  informationSide: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '@media (max-width:1100px)': { 
      flexBasis: '100%',
      width: '100%',
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  },
  button: {
    textTransform: 'unset',
    '@media (max-width:1100px)': { 
    }
  },
}));

export default function StakeHoldeListNode({id,name}){
  const classes = useStyles();

  let handleChangeName = (event) => {
    console.log(event.target.value);
  }

  let handleChangeBiography = (content) => {
    //TODO Implement
    console.log(content);
    console.log(htmlToText.fromString(content));
  };

  let handleChangeConversationEntry = (content) => {
    //TODO Implement
    console.log(content);
    console.log(htmlToText.fromString(content));
  };

  return(

    <Grid
      className={classes.root}
      container
      direction="row"
      justify = "flex-start"
    >

      <Grid className={classes.avatarSide} item xs={3}>
        <Avatar
          className={classes.avatar}
          alt={`${id}`}
          src={`/static/images/avatar/${id}.jpg`}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Point Selection
        </Button>
      </Grid>

      <Grid className={classes.informationSide} item xs={9}>
        <Typography variant="h6">
          Name:
        </Typography>
        <TextField 
          variant="outlined"
          margin="normal"
          fullWidth
          id="Name" 
          label="Name of stakeholder"
          onChange={handleChangeName}
          name="Name"
        />
        <Typography variant="h6">
          Bio:
        </Typography>
        <SunEditor
        setOptions={{
          width:'100%',
          height: 150,
          placeholder: "Enter in Biography of component...",
          buttonList: [
            ['font', 'fontSize', 'formatBlock'],
            ['paragraphStyle', 'blockquote'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['fontColor', 'hiliteColor', 'textStyle'],
            '/', // Line break
            ['undo', 'redo'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['table', 'link', 'image', 'video', 'audio'], 
            ['fullScreen', 'showBlocks', 'codeView'],
            ['preview',],
            // (min-width: 1200px)
            ['%1200', [
              ['undo', 'redo'],
              [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
              ['bold', 'underline', 'italic', 'strike'],
              [':t-More Text-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              ['outdent', 'indent'],
              [':e-More Line-default.more_horizontal', 'align', 'horizontalRule', 'list', 'lineHeight'],
              ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview'],
              ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio'],
            ]],
            // (min-width: 875px)
            ['%875', [
              ['undo', 'redo'],
              [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
              [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
              [':e-More Line-default.more_horizontal', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight'],
              [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio'],
              ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview']
            ]],
          ],   
        }}
        onChange={handleChangeBiography}
      />
      <Typography variant="h6">
        Conversation Entry:
      </Typography>
      <SunEditor
        setOptions={{
          width:'100%',
          height: 300,
          placeholder: "Conversation Entry",
          buttonList: [
            ['font', 'fontSize', 'formatBlock'],
            ['paragraphStyle', 'blockquote'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['fontColor', 'hiliteColor', 'textStyle'],
            '/', // Line break
            ['undo', 'redo'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['table', 'link', 'image', 'video', 'audio'], 
            ['fullScreen', 'showBlocks', 'codeView'],
            ['preview',],
            // (min-width: 1200px)
            ['%1200', [
              ['undo', 'redo'],
              [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
              ['bold', 'underline', 'italic', 'strike'],
              [':t-More Text-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              ['outdent', 'indent'],
              [':e-More Line-default.more_horizontal', 'align', 'horizontalRule', 'list', 'lineHeight'],
              ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview'],
              ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio'],
            ]],
            // (min-width: 875px)
            ['%875', [
              ['undo', 'redo'],
              [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
              [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
              [':e-More Line-default.more_horizontal', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight'],
              [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio'],
              ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview']
            ]],
          ],   
        }}
        onChange={handleChangeConversationEntry}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
      >
        Save
      </Button>
    </Grid>

    </Grid>
  )
}
