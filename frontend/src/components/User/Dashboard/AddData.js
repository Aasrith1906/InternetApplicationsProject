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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginIcon from '@mui/icons-material/Login'

import { selectUnstyledClasses } from "@mui/base";
import { Navigate } from "react-router-dom";
import { theme } from '../../common/Theme';
import React from "react";
import { FormControl, InputLabel, ThemeProvider } from '@mui/material';
import Alert from "@mui/material/Alert";
import { MapsHomeWork } from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';


const data_types = [
    "Weight",
    "Heart Rate",
    "Cardio Fitness",
    "Calories Burned"
]
export class AddData extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data)
    }
    render() {
        return (
            <>

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
                            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Data Type</InputLabel>
                                    <Select
                                        label="Data Type"
                                    >
                                        <MenuItem value={"Weight"} label="Weight">Weight</MenuItem>

                                    </Select>
                                    <br></br>
                                    <TextField id="datavalue" name="datavalue" label="Enter Data" variant="outlined" />
                                    <br></br>
                                    <Button
                                        variant="submit"
                                        startIcon={<AddCircleIcon />}

                                    >
                                        Submit

                                    </Button>
                                </FormControl>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>


            </>
        )
    }
}