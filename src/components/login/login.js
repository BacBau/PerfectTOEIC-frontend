import React, { Component } from 'react'
import API from '../../services/api'
import dataService from '../../Network/dataService';
import { actLogin, actLogout, actSaveInfo } from '../../Actions';
import { connect } from 'react-redux';
import api from '../Global/api';
import { FormControl, InputLabel, Button, Container, OutlinedInput, InputAdornment, VisibilityOff, Divider, Visibility } from '@mui/material';
import account from '../../images/account.png';
import password from '../../images/password.png';

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            fullName: "",
            isLogin: true
        }
    }

    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const token = params.get('token');
        if (token) {
            this.props.onLogin({
                accessToken: token
            });
            let userResult = await dataService.currentUser()
            const { username, avatar, fullName, email, active } = userResult;
            this.onLoginComplete({ username, avatar, fullName, email, active });
            window.location.href = "/";
        }
    }

    onLoginComplete = async (user) => {
        await this.props.onSaveInfo(user);
        this.props.loginProp({ username: user })
    }

    login = async () => {
        if (this.state.username && this.state.password) {
            try {
                let loginResult = await dataService.login({
                    username: this.state.username,
                    password: this.state.password
                })
                this.props.onLogin({
                    accessToken: loginResult.jwttoken
                });
                let userResult = await dataService.currentUser()
                const { username, avatar, fullName, email, active } = userResult;
                this.onLoginComplete({ username, avatar, fullName, email, active });
            } catch (error) {

            }
        }
    }

    register = async () => {
        if (this.state.username && this.state.password && this.state.confirmPassword) {
            try {
                if(this.state.password != this.state.confirmPassword) {
                    alert("Password and confirm password do not match");
                    return;
                }
                let signupResult = await dataService.register({
                    username: this.state.username,
                    password: this.state.password,
                    fullName: this.state.fullName
                })
                alert("Register success")
                this.setState({isLogin: true})
            } catch (error) {
                alert("There is already an account registered with that username")
            }
        }
    }

    switchPage = () => {
        this.setState({ isLogin: !this.state.isLogin })
    }

    loginWithGoogle = async () => {
        dataService.loginWithGoogle();
    }

    loginWithFacebook = async () => {
        dataService.loginWithFacebook();
    }

    handleUser = e => {
        this.setState({ username: e.target.value })
    }
    handleFullname = e => {
        this.setState({ fullName: e.target.value })
    }
    handleConfirmPass = e => {
        this.setState({ confirmPassword: e.target.value })
    }
    handlePass = e => {
        this.setState({ password: e.target.value })
    }
    render() {
        return (
            <div>
                {this.state.isLogin &&
                    <Container maxWidth="sm">
                        <div className="title" style={{ "color": "#29313a", "fontSize": "30px", "fontWeight": "700", "textAlign": "center", "paddingBottom": "30px", marginTop: "50px" }}>LOGIN</div>
                        <div className="auth-form-item" style={{ "display": "flex", "alignItems": "center" }}>
                            <div className="input-item" style={{ "background": "#fbfbfb", "border": "1px solid #f1f3f5", "borderRadius": "10px", "padding": "10px", "margin": "10px 0 20px", "width": "100%", display: "flex", justifyContent: "center" }}>
                                <FormControl sx={{ width: '250ch' }}>
                                    <InputLabel htmlFor="component-outlined">Username</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        defaultValue=""
                                        label="Username"
                                        value={this.state.username}
                                        onChange={(e) => this.handleUser(e)}
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="auth-form-item" style={{ "display": "flex", "alignItems": "center" }}>
                            <div className="input-item" style={{ "background": "#fbfbfb", "border": "1px solid #f1f3f5", "borderRadius": "10px", "padding": "10px", "margin": "10px 0 20px", "width": "100%", display: "flex", justifyContent: "center" }}>
                                <FormControl sx={{ width: '250ch' }}>
                                    <InputLabel htmlFor="component-outlined" type="password">Password</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        defaultValue=""
                                        label="Password"
                                        value={this.state.password}
                                        onChange={(e) => this.handlePass(e)}
                                    />
                                </FormControl>
                            </div>
                        </div>

                        <div className="auth-form-btn" style={{ "background": "#656ef1", "color": "#fff", "fontSize": "20px", "fontWeight": "700", "borderRadius": "20px", "padding": "7px 40px", display: "flex", justifyContent: "center", maxWidth: "120px", marginLeft: "220px" }} onClick={() => this.login()}>
                            <span>LOGIN</span>
                        </div>
                        <div className="divider" style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Divider className="MuiDivider-root MuiDivider-fullWidth MuiDivider-withChildren css-etlyi9" role="separator"><span className="MuiDivider-wrapper css-c1ovea">Or Login with</span></Divider>
                        </div>
                        <div className="auth-login-sso" style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "columnGap": "10px", "marginBottom": "20px" }}>
                            <div id="login-with-google-button" className="auth-login-with-google auth-login-sso-button">
                                <div className="S9gUrf-YoZ4jf" style={{ "position": "relative" }}>
                                    <div style={{ width: "38px", height: "38px", marginTop: "22px" }} onClick={() => this.loginWithGoogle()}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c">
                                            <g>
                                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                                <path fill="none" d="M0 0h48v48H0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div id="login-with-google-button" className="auth-login-with-google auth-login-sso-button">
                                <div className="S9gUrf-YoZ4jf" style={{ "position": "relative" }}>
                                    <div style={{ width: "29px", height: "29px" }} onClick={() => this.loginWithFacebook()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                                            <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse">
                                                <stop offset="0" stopColor="#2aa4f4" />
                                                <stop offset="1" stopColor="#007ad9" />
                                            </linearGradient>
                                            <path fill="url(#Ld6sqrtcxMyckEl6xeDdMa)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z" />
                                            <path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="auth-form-nav"><span>Do you have any accounts?</span><span style={{ "cursor": "pointer", "color": "rgb(80, 125, 212)" }} onClick={() => this.switchPage()}> Sign up</span></div>
                    </Container>
                }
                {!this.state.isLogin &&
                    < Container maxWidth="sm">
                        <div className="title" style={{ "color": "#29313a", "fontSize": "30px", "fontWeight": "700", "textAlign": "center", "paddingBottom": "30px", marginTop: "50px" }}>SIGN UP</div>
                        <div className="auth-form-item" style={{ "display": "flex", "alignItems": "center" }}>
                            <div className="input-item" style={{ "background": "#fbfbfb", "border": "1px solid #f1f3f5", "borderRadius": "10px", "padding": "10px", "margin": "10px 0 20px", "width": "100%", display: "flex", justifyContent: "center" }}>
                                <FormControl sx={{ width: '250ch' }}>
                                    <InputLabel htmlFor="component-outlined">Full name</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        defaultValue=""
                                        label="Full name"
                                        value={this.state.fullName}
                                        onChange={(e) => this.handleFullname(e)}
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="auth-form-item" style={{ "display": "flex", "alignItems": "center" }}>
                            <div className="input-item" style={{ "background": "#fbfbfb", "border": "1px solid #f1f3f5", "borderRadius": "10px", "padding": "10px", "margin": "10px 0 20px", "width": "100%", display: "flex", justifyContent: "center" }}>
                                <FormControl sx={{ width: '250ch' }}>
                                    <InputLabel htmlFor="component-outlined">Username</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        defaultValue=""
                                        label="Username"
                                        value={this.state.username}
                                        onChange={(e) => this.handleUser(e)}
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="auth-form-item" style={{ "display": "flex", "alignItems": "center" }}>
                            <div className="input-item" style={{ "background": "#fbfbfb", "border": "1px solid #f1f3f5", "borderRadius": "10px", "padding": "10px", "margin": "10px 0 20px", "width": "100%", display: "flex", justifyContent: "center" }}>
                                <FormControl sx={{ width: '250ch' }}>
                                    <InputLabel htmlFor="component-outlined" type="password">Password</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        defaultValue=""
                                        label="Password"
                                        value={this.state.password}
                                        onChange={(e) => this.handlePass(e)}
                                    />
                                </FormControl>
                            </div>
                        </div>

                        <div className="auth-form-item" style={{ "display": "flex", "alignItems": "center" }}>
                            <div className="input-item" style={{ "background": "#fbfbfb", "border": "1px solid #f1f3f5", "borderRadius": "10px", "padding": "10px", "margin": "10px 0 20px", "width": "100%", display: "flex", justifyContent: "center" }}>
                                <FormControl sx={{ width: '250ch' }}>
                                    <InputLabel htmlFor="component-outlined" type="password">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        defaultValue=""
                                        label="Confirm Password"
                                        value={this.state.confirmPassword}
                                        onChange={(e) => this.handleConfirmPass(e)}
                                    />
                                </FormControl>
                            </div>
                        </div>

                        <div className="auth-form-btn" style={{ "background": "#656ef1", "color": "#fff", "fontSize": "20px", "fontWeight": "700", "borderRadius": "20px", "padding": "7px 40px", display: "flex", justifyContent: "center", maxWidth: "120px", marginLeft: "220px" }} onClick={() => this.register()}>
                            <span>REGISTER</span>
                        </div>
                        <div className="divider" style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Divider className="MuiDivider-root MuiDivider-fullWidth MuiDivider-withChildren css-etlyi9" role="separator"><span className="MuiDivider-wrapper css-c1ovea">Or Login with</span></Divider>
                        </div>
                        <div className="auth-login-sso" style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "columnGap": "10px", "marginBottom": "20px" }}>
                            <div id="login-with-google-button" className="auth-login-with-google auth-login-sso-button">
                                <div className="S9gUrf-YoZ4jf" style={{ "position": "relative" }}>
                                    <div style={{ width: "38px", height: "38px", marginTop: "22px" }} onClick={() => this.loginWithGoogle()}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c">
                                            <g>
                                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                                <path fill="none" d="M0 0h48v48H0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div id="login-with-google-button" className="auth-login-with-google auth-login-sso-button">
                                <div className="S9gUrf-YoZ4jf" style={{ "position": "relative" }}>
                                    <div style={{ width: "29px", height: "29px" }} onClick={() => this.loginWithFacebook()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                                            <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse">
                                                <stop offset="0" stopColor="#2aa4f4" />
                                                <stop offset="1" stopColor="#007ad9" />
                                            </linearGradient>
                                            <path fill="url(#Ld6sqrtcxMyckEl6xeDdMa)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z" />
                                            <path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="auth-form-nav"><span>Have an account already? </span><span style={{ "cursor": "pointer", "color": "rgb(80, 125, 212)" }} onClick={() => this.switchPage()}> Please login here</span></div>
                    </Container>
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (data) => {
            dispatch(actLogin(data))
        },
        onSaveInfo: (data) => {
            dispatch(actSaveInfo(data))
        },
    }
}

export default connect(null, mapDispatchToProps)(Login)