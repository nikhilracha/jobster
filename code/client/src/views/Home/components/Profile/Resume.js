import React from 'react';
import PropTypes from 'prop-types';


import {
  Box,
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


const useStyles = makeStyles((theme) => ({

}));

const Resume = ({ className, ...rest }) => {
  const classes = useStyles();

  const [edit, setEdit] = React.useState(true);

  const onEdit = () => {
    setEdit(!edit)
  }
  const onSave = () => {
    setEdit(!edit)
  }

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
            {edit ? <></> : <IconButton onClick={onSave} aria-label="edit">
              <SaveIcon />
            </IconButton>}
            {edit ? <IconButton onClick={onEdit} aria-label="edit">
              <EditIcon />
            </IconButton> : <IconButton onClick={onEdit} aria-label="edit">
                <ClearIcon />
              </IconButton>}
          </>
        }
      />
      <Divider />
      <CardContent>
        <embed src={user.u_resume} width="500" height="375"></embed>
      </CardContent>
      <Divider />
    </Card>
  );
};

Resume.propTypes = {
  className: PropTypes.string
};

export default Resume;
