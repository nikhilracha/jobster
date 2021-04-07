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
    })]


export const PartnerLoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});


export const PartnerSignupSchema =
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

        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        phone: Yup.string()
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
        company: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        state: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    })


export const SearchBarSchema = Yup.object().shape({
    sterm: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    sloc: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

export const ProfileFormSchema = Yup.object().shape({
    u_undergrad: Yup.string()
        .min(0, 'Too Short!')
        .max(35, 'Too Long!'),
    u_undergrad_gpa: Yup.number()
        .typeError("It should be a number"),
    u_grad: Yup.string()
        .min(0, 'Too Short!')
        .max(35, 'Too Long!'),
    u_grad_gpa: Yup.number()
        .typeError("It should be a number"),

})

export const ProfileEditSchema = Yup.object().shape({
    u_grad_gpa: Yup.number()
        .typeError("It should be a number"),
    u_ug_gpa: Yup.number()
        .typeError("It should be a number"),
})

export const ProfileInfoSchema = Yup.object().shape({
    u_phone: Yup.number()
        .required(`Required`)
        .typeError("It should be a number"),
    u_zip: Yup.number()
        .required(`Required`)
        .typeError("It should be a number")
})

export const PartnerProfileInfoSchema = Yup.object().shape({
    p_poc_firstname: Yup.string().max(100).required('First Name is required'),
    p_poc_lastname: Yup.string().max(100).required('Last Name is required'),
    p_email: Yup.string().email('Invalid email').required('Email is required'),
    p_street: Yup.string().max(100).required('Street is required'),
    p_city: Yup.string().max(100).required('City is required'),
    p_state: Yup.string().max(100).required('State is required'),
    p_poc_phone: Yup.number()
        .required(`Required`)
        .typeError("It should be a number"),
    p_zip: Yup.number()
        .required(`Required`)
        .typeError("It should be a number")
})

export const PartnerCompanyInfoSchema = Yup.object().shape({
    c_name: Yup.string().max(30).required('Company Name is required'),
    c_website: Yup.string().matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
    )
        .required('Website url is required'),
    c_industry: Yup.string().max(100).required('Company Industry is required'),
    c_size: Yup.string().max(255).required('Company Total Number of Employees is required'),
    c_headquarters: Yup.string().max(100).required('Headquater Location is required'),
    c_revenue: Yup.string().max(100).required('Company Revenue is required'),
    c_founded: Yup.string().max(100).required('Company Foundation Year is required'),
    c_specialities: Yup.string().max(100).required('Company Specialties is required'),
})