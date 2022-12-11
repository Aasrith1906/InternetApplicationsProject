import { Component } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginIcon from '@mui/icons-material/Login';
import { Navigate } from "react-router-dom";
import { theme } from '../common/Theme';
import React from "react";
import { encryptString } from "../common/Encrypt";
import { ThemeProvider } from '@mui/material';
import { setTrue } from "../common/redux/loggedInSlicer";
import { setToken } from "../common/redux/apiTokenSlicer";
import { setData } from "../common/redux/userInfoSlicer";
import { connect } from "react-redux"
import { useDispatch } from 'react-redux'
import Alert from "@mui/material/Alert";
import { ddbMarshall, API_URL } from "../common/Api";
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = { redirect: false, error: false, loginError: false }
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    validateForm(form_data) {
        return form_data.username.length > 0 && form_data.password.length > 0;
    }

    updateState = () => {
        this.setState({ redirect: true })
        this.props.setTrue()
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        var api_params = {
            username: data.get('email'),
            password: data.get('password')
        }
        var validation = this.validateForm(api_params)
        if (validation == false) {
            this.setState({ error: true })
        }
        api_params["password"] = encryptString(api_params["password"])
        var api_params_marshalled = ddbMarshall(api_params)

        axios.post(
            API_URL + "/login",
            api_params_marshalled
        ).then((r) => {
            console.log(r)

            if (r.status == 200) {
                this.updateState()
                this.props.setToken(r.data.token)
                this.props.setData({ username: api_params.username })
            } else {
                this.setState({ error: true })
            }

        }).catch(
            (e) => {
                this.setState({ loginError: true })
            }
        )
    }

    render() {

        if (this.state.redirect == false) {
            return (
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />

                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <br></br>
                            {
                                this.state.error && (
                                    <Alert severity="error">Login Error !!!</Alert>
                                )
                            }
                            {
                                this.state.loginError && (
                                    <Alert severity="error">Login Failed !!!</Alert>
                                )
                            }
                            <br></br>
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <LoginIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" color="text.primary">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    error={this.state.error}
                                    helperText={this.state.error && ("Incorrect Entry")}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus

                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    error={this.state.error}
                                    helperText={this.state.error && ("Incorrect Entry")}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label={<Typography color="text.primary"> Remember Me </Typography>}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link to="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link to="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>

            )
        } else {
            return <Navigate to={{ "pathname": "/dashboard" }} />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        apiToken: state.apiToken
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setTrue: () => dispatch(setTrue()),
        setToken: (token) => dispatch(setToken(token)),
        setData: (data) => dispatch(setData(data))
    }
};

Login = connect(mapStateToProps, mapDispatchToProps)(Login)
export { Login }

