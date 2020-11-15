import React from 'react'
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        marginTop: '90px',
        marginBottom: '90px',
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Employees() {

    const classes = useStyles();

    return (
        <>
            <Paper className={classes.pageContent}>
                <PageHeader
                    title="Contact Us"
                    subTitle="Encountered with a problem. We are there to help you."
                    icon={<PeopleOutlineTwoToneIcon fontSize="medium" />}
                />
                <EmployeeForm />
            </Paper>
        </>
    )
}
