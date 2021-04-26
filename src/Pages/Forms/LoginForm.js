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
    const authContext = useContext(AuthContext)
    // Retrieving the set regitser function from the auth context
    const { login, isAuthenticated, clearRes } = authContext;

    useEffect(() => {
        // If the user is authenticated, redirect to the home page
        // if(isAuthenticated) {
        //     props.history.push('/decks');
        // }

        clearRes()

        // eslint-disable-next-line
        // ABOVE LINE  DISCUSS THIS AS AN ERROR IN HONOURS PROJECT
    // Including clearRes as a dependecy array was creating an infinite error  
    }, [isAuthenticated, props.history]);
    // }, []);

    const errorChck = () => {
       // Set back to false after five seconds
        setTimeout(() => {
            clearRes();
        }, 5000);
    }

    return (
        <div className='margins'>
            <h1 className='formHeading pt-110'>Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
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
                    })
                }
                onSubmit={ (values) => {
                    const { email, password } = values;
                    login({
                        email,
                        password
                    })
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
                        <p className='errorMsg red'>{errors.email && touched.email ? errors.email : null}</p>

                        <Input
                            type='password' 
                            placeholder='ENTER PASSWORD' 
                            name='password'
                            onChange={handleChange}
                            values={values.password} />
                        <p className='errorMsg red'>{errors.password && touched.password ? errors.password : null}</p>
                        
                        <Button type='submit' class={'green mt-50'} value='LOGIN' width='100%' />
                        {authContext.error !== null && (
                            <p className='errorMsg red d-block w-100'>{authContext.error}</p>    
                        )}

                        <Link to='/forgot' className='link underline'>Forgot your password?</Link>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm;