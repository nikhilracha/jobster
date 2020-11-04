import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { LocationOn } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
    },
}));

export default function SearchBar() {
    const classes = useStyles();

    return (
        <>
            <div>
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        <Paper component="form" className={classes.root2}>
                            <InputBase
                                className={classes.input}
                                placeholder="Job titles, companies,..etc "
                                inputProps={{ 'aria-label': 'search jobs' }}
                            />
                            <IconButton className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper component="form" className={classes.root2}>
                            <InputBase
                                className={classes.input}
                                placeholder="City, State, Country "
                                inputProps={{ 'aria-label': 'search location' }}
                            />
                            <IconButton className={classes.iconButton} aria-label="search">
                                <LocationOn />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Button size="large" variant="contained">Search</Button>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}



