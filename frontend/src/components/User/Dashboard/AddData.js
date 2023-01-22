import { Component } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Container from '@mui/material/Container';
import { connect } from "react-redux";
import { theme } from '../../common/Theme';
import React from "react";
import { FormControl, InputLabel, ThemeProvider } from '@mui/material';
import Alert from "@mui/material/Alert";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { API_URL } from "../../common/Api";
import axios from 'axios';

const data_types = [
    "Weight",
    "HeartRate",
    "CardioFitness",
    "CaloriesBurned"
]
class AddData extends Component {
    constructor(props) {
        super(props)
        this.state = { "selection": "", "missingtype": false }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (this.state.selection === null) {
            this.setState({ "missingtype": true })
            return
        }

        var datavalue = data.get("datavalue")

        var api_params = {
            "username": this.props.userInfo.value.username,
            "data_type": this.state.selection,
        }
        api_params[this.state.selection] = datavalue
        console.log(api_params)
        const config = {
            headers: { Authorization: `Bearer ${this.props.apiToken.value}` }
        }
        console.log(config)

        axios.post(API_URL + "/post_data", api_params, config).then(
            (r) => {
                console.log(r.data)
            }
        ).catch(
            (e) => {
                console.log(e)
            }
        )
    }

    handleChange = (event) => {
        this.setState({ "selection": event.target.value })
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

                            {
                                this.state.missingtype && (
                                    <Alert severity="error">Missing Data Type !!!</Alert>
                                )
                            }

                            <FormControl sx={{ mt: 3, width: 300 }}>
                                <InputLabel>Data Type</InputLabel>
                                <Select
                                    required
                                    id="datatype"
                                    label="Data Type"
                                    onChange={this.handleChange}
                                >
                                    {data_types.map(function (name) {
                                        return <MenuItem value={name} label={name}>{name}</MenuItem>
                                    })}

                                </Select>
                            </FormControl>
                            <Box component="form" onSubmit={this.handleSubmit} sx={{ mt: 3, width: 300 }}>
                                <TextField required fullWidth sx={{ mt: 3, width: 300, mb: 2 }} id="datavalue" name="datavalue" label="Enter Data" variant="outlined" type="number" />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<AddCircleIcon />}
                                    sx={{ mt: 3, width: 300 }}

                                >
                                    Submit

                                </Button>

                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>


            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        apiToken: state.apiToken,
        userInfo: state.userInfo
    }
}

AddData = connect(mapStateToProps, null)(AddData)

export { AddData }