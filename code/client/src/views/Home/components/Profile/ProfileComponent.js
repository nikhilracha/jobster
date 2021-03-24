import React from 'react';
import PropTypes from 'prop-types';
import { compose } from "recompose";
import { connect } from "react-redux";
import {
  Avatar,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  makeStyles
} from '@material-ui/core';
import { Formik, ErrorMessage } from 'formik';
import axios from "axios";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';

import { asyncTokenUpdate } from '../../../../actions/authActions'

import { ProfileInfoSchema } from '../../../../validation/Validations';

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

const ProfileComponent = (props, { className, ...rest }) => {
  const classes = useStyles();

  const [edit, setEdit] = React.useState(true);

  const onEdit = () => {
    setEdit(!edit)
  }


  console.log("Props from parent", props)

  const user = props.user

  return (
    <Formik
      enableReinitialize
      validationSchema={ProfileInfoSchema}
      initialValues={{
        u_ID: user.id,
        u_profpic: user.u_profpic,
        u_firstname: user.u_firstname,
        u_lastname: user.u_lastname,
        u_email: user.u_email,
        u_phone: user.u_phone,
        u_street: user.u_street,
        u_city: user.u_city,
        u_state: user.u_state,
        u_dob: user.u_dob,
        u_zip: user.u_zip
      }}
      onSubmit={(values, actions) => {

        values.u_ID = props.auth.user.id;
        console.log("props in submit", values)


        axios({
          method: "post",
          url: "http://localhost:5000/api/update-profile",
          data: values,
        })
          .then(function (response) {
            //handle success
            console.log(response);
            if (response.data.success) {
              props.asyncTokenUpdate({ email: values.u_email })
                .then(res => {
                  console.log("response", res);
                  if (res.error) {
                    console.log("error in updating token", res.error)
                  }
                  else {
                    //history.push('/profile')
                    console.log("Updated the token")
                    setEdit(!edit)
                  }
                })
            }

          })
          .catch(function (error) {
            //handle error
            console.log(error);
          });

      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        /* and other goodies */
      }) => (
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Card
              className={classes.root}
              {...rest}
            >
              <CardHeader
                title="Profile"
                action={
                  <>
                    {edit ? <></> : <IconButton type="submit" aria-label="edit">
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
                    src={user.u_profpic}
                  />
                  <Divider orientation="vertical" flexItem variant="middle" />
                  <Box
                    // alignItems="left"
                    display="flex"
                    flexDirection="column"
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={6} lg={6} >
                        {/* Name */}
                        <TextField
                          id="u_firstname"
                          name="u_firstname"
                          label=""
                          value={values.u_firstname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={edit}
                          fullWidth={true}
                        />
                      </Grid>
                      <Grid item xs={6} md={6} lg={6} >
                        {/* Name */}
                        <TextField
                          id="u_lastname"
                          name="u_lastname"
                          label=""
                          value={values.u_lastname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={edit}
                          fullWidth={true}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12} lg={12} >
                        {/* Name */}
                        <TextField
                          id="u_email"
                          name="u_email"
                          label=""
                          value={values.u_email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={true}
                          fullWidth={true}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12} lg={12} >
                        {/* Name */}
                        <TextField
                          id="u_phone"
                          name="u_phone"
                          label=""
                          value={values.u_phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={edit}
                          fullWidth={true}
                        />
                        <ErrorMessage name="u_phone" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12} lg={12} >
                        {/* Name */}
                        <TextField
                          id="u_dob"
                          name="u_dob"
                          label=""
                          value={user.u_dob === undefined ? "" : user.u_dob.split('T')[0]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={true}
                          fullWidth={true}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={6} lg={6} >
                        {/* Name */}
                        <TextField
                          id="u_street"
                          name="u_street"
                          label=""
                          value={values.u_street}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={edit}
                          fullWidth={true}
                        />
                      </Grid>
                      <Grid item xs={6} md={6} lg={6} >
                        {/* Name */}
                        <TextField
                          id="u_city"
                          name="u_city"
                          label=""
                          value={values.u_city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={edit}
                          fullWidth={true}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={6} lg={6} >
                        {/* Name */}
                        <TextField
                          id="u_state"
                          name="u_state"
                          label=""
                          value={values.u_state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={edit}
                          fullWidth={true}
                        />
                      </Grid>
                      <Grid item xs={6} md={6} lg={6} >
                        {/* Name */}
                        <TextField
                          id="u_zip"
                          name="u_zip"
                          label=""
                          value={values.u_zip}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={edit}
                          fullWidth={true}
                        />
                        <ErrorMessage name="u_zip" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </CardContent>
              <Divider />
            </Card>
          </form>
        )}
    </Formik>
  );
};

ProfileComponent.propTypes = {
  className: PropTypes.string,
  asyncTokenUpdate: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default compose(connect(mapStateToProps, { asyncTokenUpdate }, null))(ProfileComponent);
