import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../Context/Auth/authContext';
import Input from '../../SharedComponents/FormElements/Input';
import Button from '../../SharedComponents/FormElements/Button';
import '../../SharedComponents/FormElements/FormElements.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const RegisterForm = () => {
    // Initialise auth context
    const authContext = useContext(AuthContext)
    // Retrieving the set regitser function from the auth context
    const { register, isAuthenticated, clearRes } = authContext;

    const history = useHistory();


    useEffect(() => {

        clearRes()

        // eslint-disable-next-line
        // ABOVE LINE  DISCUSS THIS AS AN ERROR IN HONOURS PROJECT
    // Including clearRes as a dependecy array was creating an infinite error  
    }, [isAuthenticated, history]);
    // Including clearRes as a dependecy array was creating an infinite error 

    const errorChck = () => {
       // Set back to false after five seconds
        setTimeout(() => {
            clearRes();
        }, 5000);
    }

    return (
        <div className='margins'>
            <h1 className='formHeading pt-110'>Register</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={
                    Yup.object().shape({
                        email: Yup.string()
                            .email('Email is invalid')
                            .required('Email is required'),
                        password: Yup.string()
                            .min(6)
                            .max(15)
                            .required('Password is required'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            .required('You must confirm your password'),
                    })
                }
                onSubmit={ (values) => {
                    const { email, password } = values;
                    register({
                        email,
                        password
                    })
                    errorChck();
                    // If the user is authenticated, redirect to the home page
                    if(isAuthenticated) {
                        history.push('/decks');
                    }
                }}>
                {({  handleChange, values, errors, touched }) => (        
                    <Form>
                        <Input 
                            type='text' 
                            placeholder='ENTER EMAIL' 
                            name='email' 
                            onChange={handleChange}
                            values={values.email} />
                        <p className='errorMsg red'>{errors.email && touched.email ? errors.email : null}</p>

                        <Input
                            type='password' 
                            placeholder='ENTER PASSWORD' 
                            name='password'
                            onChange={handleChange}
                            values={values.password} />
                        <p className='errorMsg red'>{errors.password && touched.password ? errors.password : null}</p>

                        <Input
                            type='password' 
                            placeholder='CONFIRM PASSWORD' 
                            name='confirmPassword'
                            onChange={handleChange}
                            values={values.pasconfirmPassword} />
                        <p className='errorMsg red'>{errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}</p>
                        
                        <Button type='submit' class={'green mt-50'} value='REGISTER' width='100%' />
                        {authContext.error !== null && (
                            <p className='errorMsg red errorMsg red d-block w-100'>{authContext.error}</p>    
                        )}
                        <Link to='/login' className='link underline'>Login here</Link>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default RegisterForm;