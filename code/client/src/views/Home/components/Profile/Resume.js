import React from 'react';
import PropTypes from 'prop-types';


import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  makeStyles
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const useStyles = makeStyles((theme) => ({

  input: {
    display: 'none'
  }

}));

const Resume = (props, { className, ...rest }) => {
  const classes = useStyles();

  const [edit, setEdit] = React.useState(true);

  const onEdit = () => {
    setEdit(!edit)
  }
  const onSave = () => {
    setEdit(!edit)
  }

  console.log("Resume", props)

  const user = {
    u_resume: "https://res.cloudinary.com/dxg3rmriu/image/upload/v1616183675/resume.pdf"
  }


  return (
    <Card
      className={classes.root}
      {...rest}
    >
      <CardHeader
        title="Resume"
        action={
          <>

            {props.u_resume == undefined
              ?
              <>
                <input
                  name="u_resume"
                  accept=".pdf"
                  className={classes.input}
                  id="u_resume"
                  type="file"
                  onChange={(event) => {
                    console.log("event", event)
                    //setFieldValue("u_resume", event.currentTarget.files[0]);
                  }}
                />
                <label htmlFor="u_resume">
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
              </Button>
                </label>

              </>
              :
              edit ? <><IconButton onClick={onEdit} aria-label="edit">
                <EditIcon />
              </IconButton></> : <IconButton onClick={onEdit} aria-label="edit">
                  <ClearIcon />
                </IconButton>}
          </>
        }
      />
      <Divider />
      <CardContent>
        {props.u_resume == undefined
          ?
          <>
            <p>No resume uploaded!</p>
          </>

          :
          <embed src={props.u_resume} width="500" height="375"></embed>
        }

      </CardContent>
      <Divider />
    </Card>
  );
};

Resume.propTypes = {
  className: PropTypes.string
};

export default Resume;
