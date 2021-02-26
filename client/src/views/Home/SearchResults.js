import React from 'react';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import ListItem from '@material-ui/core/ListItem';
// import { FixedSizeList } from 'react-window';
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
// import { AutoSizer, List } from 'react-virtualized';
// import 'react-virtualized/styles.css'; // only needs to be imported once
import Container from '@material-ui/core/Container';
import SortFilter from './SortFilter';

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";

import SendIcon from '@material-ui/icons/Send';
import Divider from '@material-ui/core/Divider';

import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 530,
        width: '100%'
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
        margin: '4px'
    }

}));


const SearchResults = () => {
    const classes = useStyles();

    let data = [
        { role: "Digital Marketing Specialist", company: "Cyber Coders", location: 'Boston, MA' },
        { role: "Managing Public relation Specialist", company: "Hello world", location: 'Boston, MA' },
        { role: "Digital Marketing Specialist", company: "Pay me well", location: 'Boston, MA' },
        { role: "Managing Public relation Specialist", company: "MD tech", location: 'Boston, MA' },
        { role: "Digital Marketing Specialist", company: "Cyber Coders", location: 'Boston, MA' },
        { role: "Managing Public relation Specialist", company: "Cybernatics", location: 'Boston, MA' },
        { role: "Digital Marketing Specialist", company: "Bell house tech", location: 'Boston, MA' },
        { role: "Managing Public relation Specialist", company: "Pay me well", location: 'Boston, MA' },
        { role: "Digital Marketing Specialist", company: "Cyber Coders", location: 'Boston, MA' },
        { role: "Managing Public relation Specialist", company: "Cyber Coders", location: 'Boston, MA' },
    ]
    const [activeRow, setActiveRow] = React.useState(0);
    const [jobData, setJobData] = React.useState(data);



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
                                    <img className={classes.img} alt="complex" src="https://coda.newjobs.com/api/imagesproxy/ms/clu/xcyb/xcyberc3x/branding/6344/cybercoders-logo.jpg" />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="body2">
                                            {data[index].role}
                                        </Typography>
                                        <Typography variant="caption" gutterBottom>
                                            {data[index].company}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {data[index].location}
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
        const { index } = props;
        console.log("in detail", jobData)

        const jobDetail = jobData[activeRow];

        return (
            <Grid container spacing={3}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="https://coda.newjobs.com/api/imagesproxy/ms/clu/xcyb/xcyberc3x/branding/6344/cybercoders-logo.jpg" />
                        </ButtonBase>
                    </Grid>

                    <Grid className={classes.info} item xs={6}>
                        <Typography variant="h6">{jobDetail.role} at {jobDetail.company}</Typography>
                    </Grid>

                    <Grid className={classes.info} item xs={3}>
                        <Button variant="outlined" color="primary" size="small" endIcon={<SendIcon />}>Apply</Button>
                        <IconButton aria-label="delete" className={classes.margin}>
                            <FavoriteBorderIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>
                <Divider />
                <Grid className={classes.about} container>
                    <Grid item>
                        <Typography align="left" variant="subtitle1">
                            Responsibilities
                        </Typography>
                        <Typography align="justify" variant="body1">
                            <ul>
                                <li>
                                    Develop a Google Paid Search Marketing Strategy along with other strategies to allow for high level of customer conversions.
                                </li>
                                <li>
                                    Use search engine optimization (SEO) and pay-per-click (PPC) strategies to develop a comprehensive search engine marketing (SEM) plan.
                                </li>
                                <li>
                                    Drive Web Traffic and Lead Generation.
                                </li>
                                <li>
                                    Create and measure targeted SEM ad campaigns to drive web traffic and improve overall lead generation.
                                </li>
                                <li>
                                    Optimize ROI. Measure, analyze, and adjust SEM campaigns using Google Analytics and Google Ads to ensure maximum returns.
                                </li>
                                <li>
                                    Effectively use Google Analytics with past and proven track record measuring the success of your marketing activities.
                                </li>
                            </ul>
                        </Typography>
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
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <SearchBar />
                </Grid>
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
                        <DetailRow />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )

}

export default SearchResults;