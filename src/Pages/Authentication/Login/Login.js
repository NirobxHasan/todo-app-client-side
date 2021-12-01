import React from 'react';
import { Card, Container, Button, Alert } from 'react-bootstrap';
import './Login.css';
import googleIcon from '../../../images/icon/google.png';
// import useAuth from '../../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import useFirebase from '../../../hooks/useFirebase';

const Login = () => {
    const { loginWithGoogle, loginWithEmail, authError, user, logOut } =
        useFirebase();

    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/home';

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        loginWithEmail(data.email, data.password, history, location);
    };

    const hangleGoogleLogin = () => {
        loginWithGoogle().then((result) => {
            //redirect
            history.push(redirect_uri);
        });
    };
    return (
        <Container className="d-flex justify-content-center align-items-center login-container">
            <Card style={{ width: '30rem' }}>
                <Card.Header>
                    {' '}
                    <h3>Please Login</h3>{' '}
                </Card.Header>
                <Card.Body className="cardbody" style={{ textAlign: 'center' }}>
                    <form
                        style={{ width: '90%' }}
                        className="mx-auto "
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            placeholder="Your Email"
                            className="auth-input-field"
                            type="email"
                            {...register('email', {
                                required: true
                            })}
                        />
                        <input
                            placeholder="Your password"
                            className="auth-input-field"
                            type="password"
                            {...register('password', { required: true })}
                        />

                        <input
                            className="login-btn mx-auto"
                            value="Login"
                            type="submit"
                        />
                    </form>
                    <button
                        onClick={() => {
                            history.push('/registration');
                        }}
                        className="registration-login-btn"
                    >
                        Create a new account?
                    </button>
                    <br />
                    {authError && (
                        <Alert className="mx-auto" variant="danger">
                            {authError}
                        </Alert>
                    )}

                    <button
                        className="social-login-btn mt-5"
                        onClick={hangleGoogleLogin}
                    >
                        {' '}
                        <img src={googleIcon} alt="" /> Login with Google
                    </button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
