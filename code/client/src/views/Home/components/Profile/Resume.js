import React from 'react';
import PropTypes from 'prop-types';
import { compose } from "recompose";
import { connect } from "react-redux";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  makeStyles
} from '@material-ui/core';
import { Formik } from 'formik';
import axios from "axios";
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

  input: {
    display: 'none'
  }

}));

const Resume = (props, { className, ...rest }) => {
  const classes = useStyles();
  const id = props.auth.user.id;
  const history = useHistory();

  console.log("Resume", props)


  return (
    <Formik
      enableReinitialize
      initialValues={{
        u_ID: id,
        u_resume: null
      }}
      onSubmit={(values, actions) => {
        console.log("props", values)
        const {
          u_ID,
          u_resume
        } = values;

        var formData = new FormData();
        formData.append("u_ID", u_ID);
        formData.append("u_resume", u_resume);
        for (var key of formData.entries()) {
          console.log(key[0] + ', ' + key[1]);
        }
        axios({
          method: "post",
          url: "http://localhost:5000/api/update-resume",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            //handle success
            console.log(response);
            if (response.data.success) {
              history.go(0)
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
                title="Resume"
                action={
                  <>

                    {props.u_resume === undefined
                      ?
                      <>

                      </>
                      :



                      <>{values.u_resume === null ? <>
                        <input
                          name="u_resume"
                          accept=".pdf"
                          className={classes.input}
                          id="u_resume"
                          type="file"
                          onChange={(event) => {
                            console.log("event", event.currentTarget.files[0])
                            setFieldValue("u_resume", event.currentTarget.files[0]);
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
                      </> :
                        <IconButton type="submit" aria-label="edit">
                          <SaveIcon />
                        </IconButton>}

                      </>

                    }
                  </>
                }
              />
              <Divider />
              <CardContent>
                {props.u_resume === undefined
                  ?
                  <>
                    <p>No resume uploaded!</p>
                  </>

                  :
                  <embed src={props.u_resume} width="100%" height="375"></embed>
                }

              </CardContent>
              <Divider />
            </Card>
          </form>
        )
      }
    </Formik >
  );
};

Resume.propTypes = {
  className: PropTypes.string
};


function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default compose(connect(mapStateToProps, {}, null))(Resume);
