import React from 'react';
import { Card, Container, Button, Alert } from 'react-bootstrap';
import googleIcon from '../../../images/icon/google.png';
import { useHistory, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
const Registration = () => {
    const { loginWithGoogle, authError, userRegistration } = useAuth();
    //routing
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/home';

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        if (data.password !== data.password2) {
            alert("Password doesn't match");
            return;
        }
        userRegistration(data.name, data.email, data.password, history);
    };

    const hangleGoogleLogin = () => {
        loginWithGoogle().then((result) => {
            history.push(redirect_uri);
        });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center login-container">
            <Card style={{ width: '30rem' }}>
                <Card.Header>
                    {' '}
                    <h3>Please Register</h3>{' '}
                </Card.Header>
                <Card.Body className="cardbody" style={{ textAlign: 'center' }}>
                    <form
                        style={{ width: '90%' }}
                        className="mx-auto"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            placeholder="Your Name"
                            className="auth-input-field"
                            type="text"
                            {...register('name', {
                                required: true
                            })}
                        />
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
                            placeholder="Retype password"
                            className="auth-input-field"
                            type="password"
                            {...register('password2', { required: true })}
                        />

                        <input
                            className="login-btn mx-auto"
                            value="Register"
                            type="submit"
                        />
                    </form>
                    <button
                        onClick={() => {
                            history.push('/login');
                        }}
                        className="registration-login-btn"
                    >
                        Already register? please login.
                    </button>
                    <br />
                    {authError && (
                        <Alert className="mx-auto" variant="danger">
                            {authError}
                        </Alert>
                    )}
                    <button
                        className="social-login-btn mt-2"
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

export default Registration;
