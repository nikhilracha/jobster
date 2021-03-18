import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import uniqBy from "lodash/uniqBy";



import SortIcon from '@material-ui/icons/Sort';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


const useStyles = makeStyles((theme) => ({
    toolbar: {
        padding: '5px'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

}));


const SortFilter = (props) => {

    const classes = useStyles();

    const data = props.data


    const [open, setOpen] = React.useState(false);
    const [company, setCompany] = React.useState('');
    const [jobtype, setJobType] = React.useState('');

    const handleChange = (event) => {
        setCompany((event.target.value) || '');

    };

    const handleJobChange = (event) => {
        setJobType((event.target.value) || '');
    };

    const handleReset = () => {
        setCompany('')
        setJobType('')
        props.filterHandler(data);
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const filter = () => {
        var filtered = [];
        data.filter(function (el) {
            if (el.p_companyname === company || el.j_type === jobtype) filtered.push(el)
            return filtered;
        });
        props.filterHandler(filtered);
        console.log("Filtered data", filtered)
        setOpen(false);
    }



    return (
        <>
            <Paper className={classes.toolbar}>
                <Button color="primary"
                    size="small"
                    startIcon={<SortIcon />}
                    endIcon={<ArrowDownwardIcon />}
                    onClick={handleClickOpen}
                >Filter</Button>
            </Paper>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Filter your search</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Companies
                            </InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={company}
                                onChange={handleChange}
                                input={<Input />}
                            >

                                {
                                    uniqBy(data, 'p_companyname').map((x, i) => (
                                        <MenuItem key={i} value={x.p_companyname}>{x.p_companyname}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Job types
                            </InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={jobtype}
                                onChange={handleJobChange}
                                input={<Input />}
                            >
                                <MenuItem value={'full-time'}>Full-time</MenuItem>
                                <MenuItem value={'part-time'}>Part-time</MenuItem>
                                <MenuItem value={'internship'}>Internship</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReset} disabled={company === '' && jobtype === '' ? true : false} size="small" color="primary">
                        Reset
                    </Button>
                    <Button variant="outlined" disabled={company === '' && jobtype === '' ? true : false} size="small" onClick={filter} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )



}


export default SortFilter;