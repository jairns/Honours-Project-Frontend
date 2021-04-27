import React, { useContext, useEffect } from 'react';
import AuthContext from '../../Context/Auth/authContext';
import Input from '../../SharedComponents/FormElements/Input';
import Button from '../../SharedComponents/FormElements/Button';
import '../../SharedComponents/FormElements/FormElements.css';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const LoginForm = (props) => {

    // Initialise auth context
    const authContext = useContext(AuthContext);

    // Retrieving the set regitser function from the auth context
    const { login, isAuthenticated, clearRes } = authContext;

    useEffect(() => {
        // Clear the response to prevent incorrect errors
        clearRes();
    // Including clearRes as a dependecy array was creating an infinite error  
    }, [isAuthenticated, props.history]);

    const errorChck = () => {
       // Remove response after five seconds
        setTimeout(() => {
            clearRes();
        }, 5000);
    }

    return (
        <div className='margins'>
            <h1 className='formHeading pt-110'>Login</h1>
            <Formik
                // Initial state 
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={
                    Yup.object().shape({
                        // Email is required and valid
                        email: Yup.string()
                            .email('Email is invalid')
                            .required('Email is required'),
                        // Password is required and must be between 6 and 15 characters
                        password: Yup.string()
                            .min(6)
                            .max(15)
                            .required('Password is required'),
                    })
                }
                onSubmit={ (values) => {
                    // Extract the values
                    const { email, password } = values;
                    // Pass to the login function of auth state
                    login({
                        email,
                        password
                    });
                    // Call function to remove the response
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
                        
                        <Button type='submit' class={'green mt-50'} value='LOGIN' width='100%' />
                        
                        {/* Repsonse from the server */}
                        {authContext.error !== null && (
                            <p className='errorMsg red d-block w-100'>{authContext.error}</p>    
                        )}

                        <Link to='/forgot' className='link underline'>Forgot your password?</Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default LoginForm;