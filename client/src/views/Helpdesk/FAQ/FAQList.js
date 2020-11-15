import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Paper } from '@material-ui/core';
import PageHeader from './PageHeader';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3),
        marginTop: '90px',
        marginBottom: '90px',
        padding: theme.spacing(3),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function FAQList() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <PageHeader
                title="FAQ"
                subTitle="These are the most recently asked Questions."
                icon={<LiveHelpIcon fontSize="large" />}
            />
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>1. How long does it take for recruiters to respond to the application?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        While it is solely dependant upon recruiter when to respond, you will certainly see the response before the posting is no longer featured on the portal.
          </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>2. Can I apply to multiple jobs in the same company? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        As long as you are not currently associated with that company, you can proceed safely.
          </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>3. What do recruiters see on my profile? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Recruiters do not have access to your profile. Apart from the information you furnish in the job application, recruiters receive your CV.
          </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>4. How do I clear my cache and cookies? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        You will have to clear them from the settings of your system's browser.
          </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>5. I can't find the job which was available few days ago. </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Each job posting has a deadline to apply for, after which it is no longer featured on the portal. In addition to this, if a job posting reaches its capacity of vacancies, the employer may remove the posting.
          </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>6. Why should I use Jobster when I can apply to the job on company's website? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        With jobster, you can find numerous companies at single place and can also apply to them through a single channel! Furthermore, Jobster has tie-ups with each of the recruiters and job seekers are spared of providing some of their information which is already available with the Jobster.
          </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>7. How do I trust the recruiters which I haven't heard of? Or How to differentiate between a genuine recruiter and a scammer? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        All recruiters are verified before they are allowed to post a job. Our representative visits the company in person to make the mandatory verification.
          </Typography>
                </AccordionDetails>
            </Accordion>

        </Paper>
    );
}