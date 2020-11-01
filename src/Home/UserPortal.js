import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import SearchBar from "./components/SearchBar/SearchBar";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '200px',
    },
}));


function UserPortal(props) {
    const { ...rest } = props;
    const classes = useStyles();
    return (
        <>
            <Header
                brand="JOBSTER"
                rightLinks={<HeaderLinks />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
                {...rest}
            />

            <div className={classes.root}>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        <SearchBar />
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default UserPortal;
