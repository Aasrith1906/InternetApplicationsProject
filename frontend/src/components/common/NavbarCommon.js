import { Component } from "react";
import { LandingPage } from "../LandingPage/LandingPage";
import { NotFound } from "./NotFound";
import React from "react";
import { Register } from "../Register/Register"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { Login } from "../Login/Login";
import { ThemeProvider } from '@mui/material/styles';
import { AppBar } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Dashboard } from "../User/Dashboard/Dashboard";
import { theme } from "./Theme";
import { FitnessCenter } from "../User/Dashboard/FitnessCenter";
import { Diet } from "../User/Dashboard/Diet";
import { MedicalInformation } from "../User/Dashboard/MedicalInformation";
import { Stats } from "../User/Dashboard/Stats";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Logout } from "./Logout";

const ProtectedRoute = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

class NavbarCommon extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.isLoggedIn)
        console.log(this.props.apiToken)
    }

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Router>
                        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                            <Toolbar>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    <Link className="nav-link" to="/"> HLSP </Link>
                                </Typography>


                                {this.props.isLoggedIn.value === false && (
                                    <>
                                        <Button>
                                            <Link className="nav-link" to="/register"> Register </Link>
                                        </Button>
                                        <Button color="inherit"><Link className="nav-link" to="/login"> Login </Link></Button>
                                    </>
                                )
                                }

                                {
                                    this.props.isLoggedIn.value === true && (
                                        <>

                                            <Button color="inherit"><Link className="nav-link" to="/logout"> Logout </Link></Button>
                                        </>
                                    )
                                }

                            </Toolbar>
                        </AppBar>

                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route index element={<LandingPage />} />
                            <Route path="*" element={<NotFound />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="logout" element={<Logout />} />

                            <Route path="dashboard" element={
                                <ProtectedRoute isLoggedIn={this.props.isLoggedIn.value}>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/Diet" element={
                                <ProtectedRoute isLoggedIn={this.props.isLoggedIn.value}>
                                    <Diet />
                                </ProtectedRoute>} />
                            <Route path="/Fitness Center" element={
                                <ProtectedRoute isLoggedIn={this.props.isLoggedIn.value}>
                                    <FitnessCenter />
                                </ProtectedRoute>} />
                            <Route path="/Medical Information" element={
                                <ProtectedRoute isLoggedIn={this.props.isLoggedIn.value}>
                                    <MedicalInformation />
                                </ProtectedRoute>} />
                            <Route path="/Monitor Stats" element={<ProtectedRoute isLoggedIn={this.props.isLoggedIn.value}>
                                <Stats />
                            </ProtectedRoute>} />
                        </Routes>
                    </Router>
                </ThemeProvider>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        apiToken: state.apiToken
    }
}

NavbarCommon = connect(mapStateToProps, null)(NavbarCommon)

export { NavbarCommon }