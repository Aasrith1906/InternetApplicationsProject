import { Component } from "react";
import Sidebar from "./Sidebar";
import { ThemeProvider } from '@mui/material';
import { theme } from "../../common/Theme";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Paper from "@material-ui/core/Paper";


export class Diet extends Component {

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
                                Dieting Dashboard
                            </Typography>
                            <br></br>
                            <br />
                            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="center" spacing={2}>
                                        {[0, 1, 2].map((value) => (
                                            <Grid key={value} item>
                                                <Card
                                                    sx={{ display: 'flex', flexDirection: 'column' }}
                                                >
                                                    <CardContent sx={{ flexGrow: 1 }}>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            HL Pro
                                                        </Typography>
                                                        <Typography>
                                                            This is a media card. You can use this section to describe the
                                                            content.
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
                    </Container>
                </ThemeProvider>

            </>
        )
    }
}