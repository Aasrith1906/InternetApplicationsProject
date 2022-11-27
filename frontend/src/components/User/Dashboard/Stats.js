import { Component } from "react";
import Sidebar from "./Sidebar";
import { ThemeProvider } from '@mui/material';
import { theme } from "../../common/Theme";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from "@mui/material/CssBaseline";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { AddData } from "./AddData";
import { Button } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import Collapse from "@mui/material/Collapse";
import { AddDataController } from "./AddDataController";

export class Stats extends Component {

    constructor(props) {
        super(props)
        this.state = { "AddDataVisible": false }

    }

    showAddDataForm() {
        if (this.state.AddDataVisible) {
            this.setState(
                (state, props) => ({
                    AddDataVisible: false
                })
            )
        } else {
            this.setState(
                (state, props) => ({
                    AddDataVisible: true
                })
            )
        }
    }

    getAddDataIsActive() {
        return this.state.AddDataVisible
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
                            <Sidebar />
                            <br></br>
                            <Typography component="h1" variant="h5" color="text.primary" alignContent="center">
                                Medical Stats
                            </Typography>

                        </Box>


                        <br />
                        <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justify="space-between">
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        bgcolor: 'background.paper',
                                        boxShadow: 10,
                                        borderRadius: 2,
                                        p: 2,
                                        minWidth: 300,
                                    }}
                                >
                                    <Box sx={{ color: 'text.secondary' }}>
                                        Avg Heart Rate
                                    </Box>
                                    <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                                        101 bp/s
                                    </Box>
                                    <Box
                                        sx={{
                                            color: 'success.dark',
                                            display: 'inline',
                                            fontWeight: 'bold',
                                            mx: 0.5,
                                            fontSize: 14,
                                        }}
                                    >
                                        +18.77%
                                    </Box>
                                    <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
                                        vs. last week
                                    </Box>
                                </Box>
                                <br></br>
                                <Grid item xs={6}>
                                    <Box
                                        sx={{
                                            bgcolor: 'background.paper',
                                            boxShadow: 10,
                                            borderRadius: 2,
                                            p: 2,
                                            minWidth: 300,
                                        }}
                                    >
                                        <Box sx={{ color: 'text.secondary' }}>
                                            Avg Calorie Burn Rate
                                        </Box>
                                        <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                                            1500 kcal
                                        </Box>
                                        <Box
                                            sx={{
                                                color: 'success.dark',
                                                display: 'inline',
                                                fontWeight: 'bold',
                                                mx: 0.5,
                                                fontSize: 14,
                                            }}
                                        >
                                            +20.77%
                                        </Box>
                                        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
                                            vs. last week
                                        </Box>
                                    </Box>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Container>
                </ThemeProvider>

                <AddDataController controllerFunc={this.showAddDataForm.bind(this)} addDataStateFunc={this.getAddDataIsActive} />

                {
                    this.state.AddDataVisible && (
                        <AddData />
                    )
                }

            </>
        )
    }
}