import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  makeStyles
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';


const user = {
  u_firstname: 'Nikhil',
  u_lastname: 'Racha',
  u_email: 'racha@gmail.com',
  u_phone: '9921239939',
  u_dob: '2021-12-2',
  u_street: 'Fairview',
  u_city: 'Jersey City',
  u_state: 'New Jersey',
  u_zip: '09003'
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8)
  },
  avatar: {
    height: 120,
    width: 120,
    marginRight: 10
  }
}));

const ProfileComponent = ({ className, ...rest }) => {
  const classes = useStyles();

  const [edit, setEdit] = React.useState(true);

  const onEdit = () => {
    setEdit(!edit)
  }
  const onSave = () => {
    setEdit(!edit)
  }

  return (
    <Card
      className={classes.root}
      {...rest}
    >
      <CardHeader
        title="Profile"
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
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Divider orientation="vertical" flexItem variant="middle" />
          <Box
            // alignItems="left"
            display="flex"
            flexDirection="column"
          >
            {/* Name */}
            <TextField id="Name" label="" value={`${user.u_firstname}, ${user.u_lastname}`} disabled={edit} />
            {/* Email */}
            <TextField id="email" label="" value={user.u_email} disabled={edit} />
            {/* phone no */}
            <TextField id="phone" label="" value={user.u_phone} disabled={edit} />
            {/*age*/}
            <TextField id="age" label="" value={user.u_dob} disabled={edit} />
            {/* adress */}
            <TextField id="address" label="" value={`${user.u_street}, ${user.u_city}`} disabled={edit} />
            <TextField id="address2" label="" value={`${user.u_state}, ${user.u_zip}`} disabled={edit} />

          </Box>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

ProfileComponent.propTypes = {
  className: PropTypes.string
};

export default ProfileComponent;
