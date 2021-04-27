import React, { useContext, useEffect } from 'react';
import AuthContext from '../../Context/Auth/authContext';
import Input from '../../SharedComponents/FormElements/Input';
import Button from '../../SharedComponents/FormElements/Button';
import '../../SharedComponents/FormElements/FormElements.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const ForgotPassword = (props) => {
    
    // Initialise auth context
    const authContext = useContext(AuthContext);

    // Retrieving the set regitser function from the auth context
    const { isAuthenticated, forgotPassword, clearRes, forgotPwdRes } = authContext;

    // When the page loads 
    useEffect(() => {
        // If the user is authenticated, redirect to the home page
        if(isAuthenticated) {
            props.history.push('/decks');
        }     
    }, [isAuthenticated, props.history]);

    return (
        <div className='margins' style={{
            height: '90vh'
        }}>
            <h1 className='formHeading pt-110'>Forgot Password</h1>
            <Formik
                initialValues={{
                    email: ''
                }}
                validationSchema={
                    Yup.object().shape({
                        email: Yup.string()
                            // Email input is required and must be a valid email
                            .email('Email is invalid')
                            .required('Email is required')
                        })
                    }
                    onSubmit={ (values) => {
                        // Pass the email to the forgotPassword function within auth state file
                        forgotPassword(values);
                        // Remove response after five seconds
                        setTimeout(() => {
                            clearRes();
                        }, 5000);
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

                        <Button type='submit' class={'green mt-50'} value='SUBMIT' width='100%' />
                        
                        {/* Repsonse from the server */}
                        {forgotPwdRes && (
                            <p className={forgotPwdRes === 'The provided email address is not registered with omnilingu' ? 'errorMsg red' : 'sucMsg greenText'}>{forgotPwdRes}</p>    
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ForgotPassword;