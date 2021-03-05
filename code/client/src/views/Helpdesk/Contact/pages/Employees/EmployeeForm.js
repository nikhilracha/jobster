import React from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/employeeService";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const initialFValues = {
    id: 0,
    fullName: '',
    message: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EmployeeForm() {

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            employeeService.insertEmployee(values)
            resetForm()
            setOpen(true);
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <Controls.Input
                            name="fullName"
                            label="Full Name"
                            value={values.fullName}
                            onChange={handleInputChange}
                            error={errors.fullName}
                        />
                        <Controls.Input
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            error={errors.fullName}
                        />

                        <Controls.Input
                            label="City"
                            name="city"
                            value={values.city}
                            error={errors.fullName}
                            onChange={handleInputChange}
                        />

                    </Grid>
                    <Grid item xs={6}>

                        <Controls.Input
                            label="Mobile"
                            name="mobile"
                            value={values.mobile}
                            onChange={handleInputChange}
                            error={errors.mobile}
                        />

                        <Controls.Select
                            name="departmentId"
                            label="Department"
                            value={values.departmentId}
                            onChange={handleInputChange}
                            options={employeeService.getDepartmentCollection()}
                            error={errors.departmentId}
                        />

                        <Controls.Input
                            name="message"
                            label="Type your message"
                            value={values.message}
                            onChange={handleInputChange}
                            error={errors.fullName}
                        />

                        <div>
                            <Controls.Button
                                type="submit"
                                text="Submit" />
                            <Controls.Button
                                text="Reset"
                                color="default"
                                onClick={resetForm} />
                        </div>
                    </Grid>
                </Grid>
            </Form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Sent your message!
        </Alert>
            </Snackbar>
        </>
    )
}
