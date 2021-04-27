import React, { useContext, useEffect } from 'react';
import AuthContext from '../../Context/Auth/authContext';
import Input from '../../SharedComponents/FormElements/Input';
import Button from '../../SharedComponents/FormElements/Button';
import '../../SharedComponents/FormElements/FormElements.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const ResetPassword = (props) => {
    
    // Initialise auth context
    const authContext = useContext(AuthContext)

    // Retrieving the set regitser function from the auth context
    const { isAuthenticated, resetPassword, resetPwdRes, clearRes } = authContext;

    // Extract from query params
    // The link expires in
    const expireParam = props.match.params.time;
    // Converting the value of expireParam to a integer
    const expiresIn = parseInt(expireParam) ;
    // Extracting the email
    const email = props.match.params.email;
    // Extracting the resetId
    const resetId = props.match.params.id;
    // Getting the current time
    const currentTime = Date.now();

    useEffect((props) => {

        // Redirect to landing if values are incorrect
        if(expiresIn.length <= 10 || resetId.length <= 10) {
            props.history.push('/');
        } 

        // Clear response
        clearRes();
    
        // clearRes causes an infinite loop
    }, [isAuthenticated, props.history, expiresIn.length, resetId.length]);

    return (
        <div className='margins'>
            {/* If the link has expired - prevent the user from resetting their password */}
            {currentTime > expiresIn ? (
                <div style={{
                    height: '90vh'
                }}>
                    <h1 className='formHeading pt-110'>This link has expired</h1>
                    <p>Links are only active for 30 minutes, if you still need assistance in reseting your password, request another link.</p>
                </div>
            ) : (
                <React.Fragment>
                    <h1 className='formHeading pt-110'>Reset Password</h1>
                    <Formik
                        // Initial state 
                        initialValues={{
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={
                            Yup.object().shape({
                                // Password is required and must be between 6 and 15 characters
                                password: Yup.string()
                                    .min(6)
                                    .max(15)
                                    .required('Password is required'),
                                confirmPassword: Yup.string()
                                    // Must match the password's value 
                                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                    .required('You must confirm your password'),
                            })
                        }
                        onSubmit={ (values) => {
                            // Extracting the new password
                            const { password } = values;
                            // Passing the required data to the resetPassword function of auth state
                            resetPassword({
                                email,
                                password,
                                resetId
                            })
                        }}>
                        {({  handleChange, values, errors, touched }) => (        
                            <Form>
                                <Input
                                    type='password' 
                                    placeholder='ENTER NEW PASSWORD' 
                                    name='password'
                                    onChange={handleChange}
                                    values={values.password} />
                                {/* Display error message and remove error message if valid */}
                                <p className='errorMsg red'>{errors.password && touched.password ? errors.password : null}</p>

                                <Input
                                    type='password' 
                                    placeholder='CONFIRM NEW PASSWORD' 
                                    name='confirmPassword'
                                    onChange={handleChange}
                                    values={values.pasconfirmPassword} />
                                <p className='errorMsg red'>{errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}</p>
                                
                                <Button type='submit' class={'green mt-50'} value='RESET PASSWORD' width='100%' />
                                
                                {/* Response from the server */}
                                {resetPwdRes && resetPwdRes === 'Your password was successfully updated.' ? (
                                    <p className='sucMsg greenText'>{resetPwdRes}</p>
                                ) : (
                                    <p className='errorMsg red d-block w-100'>{resetPwdRes}</p>
                                )}
                                
                            </Form>
                        )}
                    </Formik>
                </React.Fragment>
            )}
        </div>
    );
}

export default ResetPassword;