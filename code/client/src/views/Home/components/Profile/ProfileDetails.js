import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardContent,
  Divider,
  CardHeader,
  makeStyles,
  Box,
  IconButton,
  TextField,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8)
  }
}));

const ProfileDetails = (props, { className, ...rest }) => {

  const classes = useStyles();


  const [edit, setEdit] = React.useState(true);

  const onEdit = () => {
    setEdit(!edit)
  }
  const onSave = () => {
    setEdit(!edit)
  }



  const user = props.user;
  console.log("USer", props)
  return (
    <Card
      className={classes.root}
      {...rest}
    >
      <CardHeader
        title="Education"
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
          <Box
            // alignItems="left"
            display="flex"
            flexDirection="column"
          >
            <Grid container spacing={3}>
              <Grid item xs={6} md={6} lg={6} >
                {/* undergrad */}
                <TextField id="undergrad" label="Undergraduate" value={`${user.u_undergrad}`} disabled={edit} fullWidth={true} />
              </Grid>
              <Grid item xs={6} md={6} lg={6} >
                {/* undergrad_gpa */}
                <TextField id="undergrad_gpa" label="Undergraduate GPA" value={user.u_undergrad_gpa} disabled={edit} fullWidth={true} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6} md={6} lg={6} >
                {/* undergrad */}
                <TextField id="u_grad" label="Graduate" value={`${user.u_grad}`} disabled={edit} fullWidth={true} />
              </Grid>
              <Grid item xs={6} md={6} lg={6} >
                {/* undergrad_gpa */}
                <TextField id="u_grad-gpa" label="Graduate GPA" value={user.u_grad_gpa} disabled={edit} fullWidth={true} />
              </Grid>
            </Grid>
            {/* u_major */}
            <TextField id="u_major" label="Major" value={user.u_major} disabled={edit} fullWidth={true} />
            {/*u_concentration*/}
            <TextField id="u_concentration" label="Concentration" value={user.u_concentration} disabled={edit} fullWidth={true} />
          </Box>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
