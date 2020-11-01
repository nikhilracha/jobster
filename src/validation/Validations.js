import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),

});

export const UserSignupSchema = [
    Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        c_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        phone: Yup.number()
            .required('Required')
            .typeError("It should be a number")
    }),
    Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        dob: Yup.string()
            .nullable()
            .required(`Required`),
        city: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        street: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        country: Yup.string()
            .nullable()
            .required(`Required`),
        zip: Yup.number()
            .required('Required')
            .typeError("It should be a number"),
    })
]