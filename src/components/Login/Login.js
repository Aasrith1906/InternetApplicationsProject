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
import { ThemeProvider } from '@mui/material';
import Alert from "@mui/material/Alert";


export class Login extends Component {

    constructor(props) {
        super(props)
        this.state = { email: "", password: "" }
        this.setPassword = this.setPassword.bind(this)
        this.setEmail = this.setEmail.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    setEmail(val) {
        this.setState({ email: val })
    }

    setPassword(val) {
        this.setState({ password: val })

    }

    handleSubmit() {

        if (this.state.password == null || this.state.email == null) {
            return <Alert severity="error">Enter email and password</Alert>
        }
    }

    render() {
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
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LoginIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" color="text.primary">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={this.setEmail}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.setPassword}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label={<Typography color="text.primary"> Remember Me </Typography>}
                            />
                            <Link to="/dashboard">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                            </Link>
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
    }
}