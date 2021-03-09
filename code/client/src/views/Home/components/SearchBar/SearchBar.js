import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { LocationOn } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { InputLabel } from '@material-ui/core';

import { Formik, ErrorMessage } from 'formik';

import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';

import { SearchBarSchema } from '../../../../validation/Validations';
import { asyncSearch } from '../../../../actions/coreActions';


const useStyles = makeStyles((theme) => ({
    root2: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 250,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    }
}));

function SearchBar(props) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            <div>
                <Formik
                    initialValues={{ sterm: '', sloc: '' }}
                    validationSchema={SearchBarSchema}
                    onSubmit={(values, actions) => {
                        console.log("props", values)

                        props.asyncSearch(values)
                            .then(res => {
                                // actions.setErrors(res);
                                // actions.setSubmitting(false);
                                console.log("response", res);
                                history.push('/results', res)
                                // if (res.error) {
                                //     console.log("error in login", res.error)
                                // }
                            })
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                            <form className={classes.form} onSubmit={handleSubmit} noValidate>
                                <Grid container justify="center" spacing={2}>
                                    <Grid item>
                                        <Paper component="form" className={classes.root2}>
                                            <InputBase
                                                className={classes.input}
                                                placeholder="Job titles, companies,..etc "
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.sterm}
                                                name="sterm"
                                                id="sterm"
                                                required
                                                inputProps={{ 'aria-label': 'search jobs' }}
                                            />
                                            <IconButton className={classes.iconButton} aria-label="search">
                                                <SearchIcon />
                                            </IconButton>
                                        </Paper>
                                        <ErrorMessage name="sterm" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                    </Grid>
                                    <Grid item>
                                        <Paper component="form" className={classes.root2}>
                                            <InputBase
                                                className={classes.input}
                                                placeholder="City, State, Country "
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.sloc}
                                                name="sloc"
                                                id="sloc"
                                                required
                                                inputProps={{ 'aria-label': 'search location' }}
                                            />
                                            <IconButton className={classes.iconButton} aria-label="search">
                                                <LocationOn />
                                            </IconButton>
                                        </Paper>
                                        <ErrorMessage name="sloc" render={msg => <div style={{ color: '#fc2403' }}>{msg}</div>} />
                                    </Grid>
                                    <Grid item>
                                        <Button type="submit" size="large" variant="contained">Search</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                </Formik>

            </div>
        </>
    );
}

SearchBar.propTypes = {
    asyncSearch: PropTypes.func.isRequired,
    postings: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        postings: state.postings,
    }
}

export default compose(connect(mapStateToProps, { asyncSearch }, null))(SearchBar);


