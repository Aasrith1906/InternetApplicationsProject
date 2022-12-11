import * as React from 'react';
import { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { theme } from '../common/Theme';
import { Alert, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { API_URL, ddbMarshall } from '../common/Api';
import { encryptString } from '../common/Encrypt';

import { Navigate } from "react-router-dom"

export class Register extends Component {

    constructor(props) {
        super(props)
        this.state = { "redirect": false, "error": false, "alreadyExists": false }
    }

    updateState = () => {
        this.setState((state, props) => ({ "redirect": true }))
    }

    validate_params = (api_params) => {
        var required_keys = ["firstname", "lastname", "username", "password"]
        for (const key of required_keys) {
            if (api_params[key] == "") {
                return false
            }
        }
        return true
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);


        Date.prototype.today = function () {
            return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
        }

        // For the time now
        Date.prototype.timeNow = function () {
            return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
        }
        const newDate = new Date();
        var api_params = {
            username: data.get('username'),
            password: encryptString(data.get('password')),
            firstname: data.get('firstName'),
            lastname: data.get('lastName'),
            joindate: newDate.today() + " " + newDate.timeNow(),

        };

        console.log(api_params)
        var validation = this.validate_params(api_params)

        if (validation == false) {
            console.log("Invalid Parameters");
            this.setState({ "error": true })
            return
        }
        var api_params_marshalled = ddbMarshall(api_params)
        console.log(api_params_marshalled)

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        axios.post(
            API_URL + "/user_registration",
            api_params_marshalled,
            config
        ).then((r) => {

            if (r.status == 200) {
                this.updateState()
            }

            if (r.status == 409) {
                this.setState({ "alreadyExists": true })
            }

        }).catch(
            (e) => {
                console.log(e)
            }
        )
    };

    render() {

        if (!this.state.redirect) {
            return (

                < ThemeProvider theme={theme} >


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
                                this.state.alreadyExists && (
                                    <Alert severity="error">User Already Exists !!!</Alert>
                                )
                            }
                            <br></br>
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" color="text.primary">
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            error={this.state.error}
                                            helperText={this.state.error && ("Incorrect Entry")}
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            error={this.state.error}
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            helperText={this.state.error && ("Incorrect Entry")}
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            error={this.state.error}
                                            id="username"
                                            label="Username/Email"
                                            name="username"
                                            helperText={this.state.error && ("Incorrect Entry")}
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            error={this.state.error}
                                            name="password"
                                            label="Password"
                                            type="password"
                                            inputProps={{
                                                maxLength: 25,
                                                minLength: 8
                                            }}

                                            id="password"
                                            helperText={this.state.error && ("Password Needs to be 8 characters")}
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider >
            )
        } else {
            return <>
                <Navigate to={{ "pathname": "/login" }} />
            </>
        }
    }
}