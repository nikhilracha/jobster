import React from 'react';
import Header from './components/Header/Header';
import HeaderLinksOut from './components/Header/HeaderLinksOut';
import SearchBar from './components/SearchBar/SearchBar';
import SortFilter from './SortFilter';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Button from '@material-ui/core/Button';

import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import jwt_decode from "jwt-decode";

import store from '../../store';
import { setCurrentUser } from '../../actions/authActions';
import setAuthToken from '../../utils/setAuthToken';


import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import parse from 'html-react-parser'

import g2 from "../../assets/img/g2.jpg"
import g3 from "../../assets/img/g3.png"

import SendIcon from '@material-ui/icons/Send';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    main: {
        backgroundImage: `url(${g2})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    photo: {
        height: '350px',
        width: '300px',
        float: 'right'
        // display: 'block',
        // marginLeft: 'auto',
        // marginRight: 'auto'

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 530,
        width: '100%',
        overflow: 'scroll',
    },
    item_paper: {
        padding: theme.spacing(1),
        maxWidth: 500,
    },
    list: {
        width: '100%',
        height: 560,
        maxWidth: 410,

    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    card: {
        padding: "12px"
    },
    info: {
        marginTop: '5%'
    },
    about: {
        margin: '4px',
        justifyContent: 'flex-start'
    }

}));


const SearchResults = (props) => {
    const classes = useStyles();


    //let data = has(props, 'location.state.postings') ? props.location.state.postings : [];
    let data = props.location.state.postings;
    const [activeRow, setActiveRow] = React.useState(0);
    const [jobData, setJobData] = React.useState(data);

    console.log("Search results props", props);

    React.useEffect(() => {
        // Check for token
        if (localStorage.jwtToken) {
            // Set auth token header auth
            console.log("in effect", localStorage.jwtToken);
            setAuthToken(localStorage.jwtToken);
            // Decode token and get user info and exp
            const decoded = jwt_decode(localStorage.jwtToken);
            console.log("in effect decoded", decoded);
            // Set user and isAuthenticated
            store.dispatch(setCurrentUser(decoded));

            // Check for expired token
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                //console.log("App.js is running inside if and if")
                // Logout user
                //store.dispatch(logoutUser());
                // TODO: Clear current Profile
                console.log("Session Expired")
                // Redirect to login
                // window.location.href = "/login";
            }
        }
    }, [])

    React.useEffect(() => {
        setJobData(data);
        setActiveRow(0)
    }, [data]);

    const apply = (job) => {
        console.log("Apply function clicked", job)
        console.log("Props", props);
        props.auth.isAuthenticated ?

            axios({
                method: "post",
                url: "http://localhost:5000/api/apply-job",
                data: { id: props.auth.user.id, job: job },
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    alert(response.data.message)

                })
                .catch(function (error) {
                    //handle error
                    console.log(error.response.data.email);
                    alert(error.response.data.email);
                })

            :
            alert("Please Login to apply")
    }


    function renderRow(props) {
        const { data, index, style } = props;
        console.log("in render row", props)
        return (
            <Box style={style} className={classes.root}>
                <Card className={classes.card}>
                    <div className={classes.root}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image} onClick={() => setActiveRow(index)}>
                                    <img className={classes.img} alt="complex" src={data[index].p_company_logo} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="body2">
                                            {data[index].j_role}
                                        </Typography>
                                        <Typography variant="caption" gutterBottom>
                                            {data[index].p_companyname}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {data[index].state}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption">2 days ago</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Card>
            </Box>
        );
    }

    const DetailRow = (props) => {
        console.log("In detail jobData", props.data)
        const jobDetail = props.data[activeRow]//jobData[activeRow] || jobData[0];
        console.log("in detail", jobDetail)

        return (
            <Grid container spacing={3}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={jobDetail.p_company_logo} />
                        </ButtonBase>
                    </Grid>

                    <Grid className={classes.info} item xs={6}>
                        <Typography variant="h6">{jobDetail.j_role} at {jobDetail.p_companyname}</Typography>
                    </Grid>

                    <Grid className={classes.info} item xs={3}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            endIcon={<SendIcon />}
                            onClick={() => apply(jobDetail.j_id)}
                        >Apply</Button>
                    </Grid>
                </Grid>
                <Divider />
                <Grid className={classes.about} container>
                    <Grid item>
                        {parse(jobDetail.j_description)}
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    const handleFilter = (filtered) => {
        console.log("in parent ", filtered);
        setJobData(filtered);
    }

    return (
        <div className={classes.main}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {props.auth.isAuthenticated ? <HeaderLinksOut user={props.auth.user} /> : <Header />}
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
                        <SearchBar />
                    </Grid>

                    {props.location.state.search === "Not found" ?
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Grid xs={6} item><img alt="no-results" className={classes.photo} src={g3} /></Grid>
                            <Grid xs={6} item><Typography variant="h4">No results! Try again?</Typography></Grid>
                        </Grid>
                        :

                        <>
                            <Grid item xs={12}>
                                <SortFilter data={data} filterHandler={handleFilter} />
                            </Grid>
                            <Grid className={classes.list} item xs={4}>
                                <AutoSizer>
                                    {({ height, width }) => (
                                        <List
                                            className="List"
                                            height={height}
                                            width={width}
                                            itemCount={jobData.length}
                                            itemSize={150}
                                            itemData={jobData}
                                        >
                                            {renderRow}
                                        </List>
                                    )}
                                </AutoSizer>
                            </Grid>
                            <Grid item xs={8}>
                                <Paper className={classes.paper}>
                                    <DetailRow data={jobData} />
                                </Paper>
                            </Grid>
                        </>
                    }
                </Grid>
            </Container>

        </div>
    )

}

SearchResults.propTypes = {
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default compose(connect(mapStateToProps, {}, null))(SearchResults);
