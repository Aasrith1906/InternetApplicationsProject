import { Component } from "react";
import Sidebar from "./Sidebar";
import { ThemeProvider } from '@mui/material';
import { theme } from "../../common/Theme";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from "@mui/material/CssBaseline";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import Paper from "@material-ui/core/Paper";
import CardContent from "@mui/material/CardContent";

export class MedicalInformation extends Component {

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
                            <Typography component="h1" variant="h5" color="text.primary" alignContent="right">
                                Medical Information
                            </Typography>
                            <br />
                            <Grid sx={{ flexGrow: 1 }} container spacing={2} justifyContent="right" alignItems="right">
                                <Grid item xs={12}>
                                    <Grid container justifyContent="center" spacing={2}>
                                        {[0, 1, 2, 3, 4, 5].map((value) => (
                                            <Grid key={value} item>
                                                <Card
                                                    sx={{ display: 'flex', flexDirection: 'column' }}
                                                >
                                                    <CardContent sx={{ flexGrow: 1 }}>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            Latest News/Information in the Health Industry
                                                        </Typography>
                                                        <Typography>
                                                            Links and Information on the latest news/information and suggestions in the health industry
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                                <br />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container >
                </ThemeProvider >

            </>
        )
    }
}