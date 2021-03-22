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
import { Formik, ErrorMessage } from 'formik';
import { compose } from "recompose";
import { connect } from "react-redux";
import axios from "axios";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';

import { ProfileEditSchema } from '../../../../validation/Validations';


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


  console.log("Props in ProfileDetails", props)

  const user = props.user

  return (
    <Formik
      enableReinitialize
      validationSchema={ProfileEditSchema}
      initialValues={{
        u_ID: user.id,
        u_ug: user.u_undergrad,
        u_ug_gpa: user.u_undergrad_gpa,
        u_grad: user.u_grad,
        u_grad_gpa: user.u_grad_gpa,
        u_major: user.u_major,
        u_conc: user.u_concentration
      }}
      onSubmit={(values, actions) => {

        values.u_ID = props.auth.user.id;
        console.log("props in submit", values)


        axios({
          method: "post",
          url: "http://localhost:5000/api/update-education-profile",
          data: values,
        })
          .then(function (response) {
            //handle success
            console.log(response);
            if (response.data.success) {
              console.log("Updated")
              setEdit(!edit)
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
                title="Education"
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
                  <Box
                    // alignItems="left"
                    display="flex"
                    flexDirection="column"
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={6} lg={6} >
                        {/* Name */}
                        <TextField
                          id="u_ug"
                          name="u_ug"
                          label="Undergraduate"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={values.u_ug}
                          onChange={handleChange}
                          disabled={edit}
                          fullWidth={true}
                        />
                      </Grid>
                      <Grid item xs={6} md={6} lg={6} >
                        {/* Name */}
                        <TextField
                          id="u_ug_gpa"
                          name="u_ug_gpa"
                          label="Undergraduate GPA"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={values.u_ug_gpa}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={edit}
                          fullWidth={true}
                        />
                        <ErrorMessage name="u_ug_gpa" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={6} lg={6} >
                        {/* Name */}
                        <TextField
                          id="u_grad"
                          name="u_grad"
                          label="Graduate"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={values.u_grad}
                          onChange={handleChange}
                          disabled={edit}
                          fullWidth={true}
                        />
                      </Grid>
                      <Grid item xs={6} md={6} lg={6} >
                        {/* Name */}
                        <TextField
                          id="u_grad_gpa"
                          name="u_grad_gpa"
                          label="Graduate GPA"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={values.u_grad_gpa}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={edit}
                          fullWidth={true}
                        />
                        <ErrorMessage name="u_grad_gpa" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12} lg={12} >
                        <TextField
                          id="u_major"
                          name="u_major"
                          label="Major"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={values.u_major}
                          onChange={handleChange}
                          disabled={edit}
                          fullWidth={true}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12} lg={12} >
                        <TextField
                          id="u_conc"
                          name="u_conc"
                          label="Concentration"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={values.u_conc}
                          onChange={handleChange}
                          disabled={edit}
                          fullWidth={true}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </CardContent>
              <Divider />
            </Card>
          </form>
        )
      }
    </Formik >
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default compose(connect(mapStateToProps, {}, null))(ProfileDetails);
