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
    const authContext = useContext(AuthContext);
    
    // Retrieving the set regitser function from the auth context
    const { register, isAuthenticated, clearRes } = authContext;

    // Importing useHistory 
    const history = useHistory();

    // When the page renders
    useEffect(() => {
        // Clear response to prevent incorrect repsonse
        clearRes()
    // Including clearRes as a dependecy array was creating an infinite error  
    }, [isAuthenticated, history]);

    const errorChck = () => {
       // Clear the response after five seconds
        setTimeout(() => {
            clearRes();
        }, 5000);
    }

    return (
        <div className='margins'>
            <h1 className='formHeading pt-110'>Register</h1>
            <Formik
                // Initial state
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={
                    Yup.object().shape({
                        // Email is required and must be valid
                        email: Yup.string()
                            .email('Email is invalid')
                            .required('Email is required'),
                        // Password must be between 6 and 15 characters and is required
                        password: Yup.string()
                            .min(6)
                            .max(15)
                            .required('Password is required'),
                        confirmPassword: Yup.string()
                            // Must match the password value 
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            .required('You must confirm your password'),
                    })
                }
                onSubmit={ (values) => {
                    // Extract the values
                    const { email, password } = values;
                    // Pass the values to the register function of auth state
                    register({
                        email,
                        password
                    });
                    errorChck();
                }}>
                {({  handleChange, values, errors, touched }) => (        
                    <Form>
                        <Input 
                            type='text' 
                            placeholder='ENTER EMAIL' 
                            name='email' 
                            onChange={handleChange}
                            values={values.email} />
                        {/* Display error message and remove error message if valid */}
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

                        {/* If an error is returned */}
                        {authContext.error !== null && (
                            <p className='errorMsg red errorMsg red d-block w-100'>{authContext.error}</p>    
                        )}

                        <Link to='/login' className='link underline'>Login here</Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default RegisterForm;