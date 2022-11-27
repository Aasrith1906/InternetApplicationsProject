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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Navigate } from "react-router-dom";
import { theme } from '../../common/Theme';
import React from "react";
import { ThemeProvider } from '@mui/material';
import Alert from "@mui/material/Alert";


export class AddDataController extends Component {

    constructor(props) {
        super(props)
        this.state = { controllerfunc: props.controllerFunc, addDataStateFunc: props.addDataStateFunc }
    }

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Container maxWidth="sm">
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'left',
                            }}
                        >

                            <Button
                                variant="contained"
                                onClick={this.state.controllerfunc.bind(this)}
                                startIcon={<AddIcon />}
                            >
                                Add Data

                            </Button>
                            
                        </Box>
                    </Container>

                </ThemeProvider>
            </>
        )
    }
}