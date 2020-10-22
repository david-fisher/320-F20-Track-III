import React from 'react'
import {Menu,Select,MenuItem,Grid,Button,TextField,Typography,makeStyles} from '@material-ui/core';
import EditedSunEditor from "../components/EditedSunEditor"

const useStyles = makeStyles(theme =>({
  menuButton:{
    margin: theme.spacing(2)
  },
  addButton:{
    margin: theme.spacing(2),
    float: "right"
  },
  selectMenu:{
    minWidth: 200,
    magin: theme.spacing(5),
  }
}))

export default function AddNewScenarioPageDialogBody({addPage, setOpenPopup}){
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [pageType, setPageType] = React.useState("Event");
    const [pageName, setPageName] = React.useState("Event");

    const handleClick = (event) =>{
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleChange = (event) => {
      setPageType(event.target.value);
      //console.log(pageType)
    }

    const createNewPage = () => {
        console.log(pageType)
        console.log(pageName)
        addPage(13,pageName,pageType)
        setOpenPopup(false)
        setPageType("Generic")
        setPageName("Generic")
    }

    return(
      <div>
       <Grid container
       direction="row"
       justify = "flex-start">
          <Grid item xs={4}>
             <Typography variant="h6">Page Type</Typography>
            <Select
              className={classes.selectMenu}
              id="Scenario-Page-Type-Menu"
              labelId="Scenario-Page-Type-Menu"
              value={pageType}
              onChange={handleChange}
            >
              <MenuItem value={"Generic"} onClick={handleClose}>Generic Component</MenuItem>
              <MenuItem value={"Action"} onClick={handleClose}>Action Component</MenuItem>
              <MenuItem value={"Reflection"} onClick={handleClose}>Reflection Component</MenuItem>

            </Select>

          </Grid>
          <Grid item xs={8}>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="New Scenario Page Name"
            label="Scenario Page Name"
            id="scenariopageAdder"
            onChange={(e)=>setPageName(e.target.value)}
            ></TextField>
            <EditedSunEditor></EditedSunEditor>

            <Button className={classes.addButton} variant="contained" color="primary" onClick={createNewPage}>Add Scenario Page</Button>
          </Grid>
       </Grid>
      </div>
    )
}
