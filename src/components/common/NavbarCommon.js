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
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Dashboard } from "../User/Dashboard/Dashboard";
import { theme } from "./Theme";
import { FitnessCenter } from "../User/Dashboard/FitnessCenter";
import { Diet } from "../User/Dashboard/Diet";
import { MedicalInformation } from "../User/Dashboard/MedicalInformation";
import { Stats } from "../User/Dashboard/Stats";

export class NavbarCommon extends Component {

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
                                <Button>
                                    <Link className="nav-link" to="/register"> Register </Link>
                                </Button>
                                <Button color="inherit"><Link className="nav-link" to="/login"> Login </Link></Button>
                            </Toolbar>
                        </AppBar>

                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route index element={<LandingPage />} />
                            <Route path="*" element={<NotFound />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="/Diet" element={<Diet />} />
                            <Route path="/Fitness Center" element={<FitnessCenter />} />
                            <Route path="/Medical Information" element={<MedicalInformation />} />
                            <Route path="/Monitor Stats" element={<Stats />} />
                        </Routes>
                    </Router>
                </ThemeProvider>
            </>
        )
    }
}