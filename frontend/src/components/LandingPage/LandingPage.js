
import * as React from 'react';
import { Component } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { theme } from '../common/Theme';
import { ThemeProvider } from '@mui/material';
import { setTrue } from "../common/redux/loggedInSlicer";
import { setToken } from "../common/redux/apiTokenSlicer";
import { setData } from "../common/redux/userInfoSlicer";
import { connect } from "react-redux"
import { loadState } from '../common/redux/localStorage';


class LandingPage extends Component {

    constructor(props) {
        super(props)

        var state = loadState()
        if (loadState() != null) {
            var apiToken = state['state']
            this.props.setToken(apiToken)
            this.props.setTrue()
        }
    }
    render() {
        return (
            <>
                <br />
                <center>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <main>
                            <Box
                                sx={{
                                    bgcolor: 'background.paper',
                                    pt: 8,
                                    pb: 6,
                                }}
                            >
                                <Container maxWidth="sm">
                                    <Typography
                                        component="h1"
                                        variant="h2"
                                        align="center"
                                        color="text.primary"
                                        gutterBottom
                                    >
                                        Welcome to HLSP
                                    </Typography>
                                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                        A healthy lifestyle for all, available at anywhere, anytime.
                                    </Typography>
                                    <br></br>
                                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                        Data Driven insights that provide actionable changes to improve your lifestyle
                                    </Typography>
                                    <br></br>
                                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                        Always something new personalised just for you
                                    </Typography>
                                    <Stack
                                        sx={{ pt: 4 }}
                                        direction="row"
                                        spacing={2}
                                        justifyContent="center"
                                    >
                                        <Link to="register" color="text.primary"><Button variant="contained" onClick={this.navigateRegister}>Register Now</Button></Link>
                                        <Link to="login" color="text.primary"><Button variant="outlined" onClick={this.navigateLogin}>Login for existing users</Button></Link>
                                    </Stack>
                                </Container>
                            </Box>

                            <Container sx={{ py: 8 }} maxWidth="md">
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card
                                            sx={{ display: 'flex', flexDirection: 'column' }}
                                        >
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Free Tier
                                                </Typography>
                                                <Typography align="center">
                                                    In this tier users can access our free health tips and dieting guides  from specialist healthcare and fitness providers across the world such as the NHS, UN WHO, BBC
                                                </Typography>
                                                <br></br>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Free
                                                </Typography>
                                            </CardContent>
                                            <CardActions align="center">
                                                <Button size="small" align="flex">View</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card
                                            sx={{ display: 'flex', flexDirection: 'column' }}
                                        >
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    HL Pro
                                                </Typography>
                                                <Typography>
                                                    With this tier you gain access to basic reporting on your health data and analytics such as trends along with our dedicated suite of workouts and diets from world leading providers
                                                </Typography>
                                                <br></br>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    £14.99 Per Month
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">View</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card
                                            sx={{ display: 'flex', flexDirection: 'column' }}
                                        >
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    HL Premium
                                                </Typography>
                                                <Typography>
                                                    This tier delivers the full extent of data driven insights for your healthy lifestyle, with advanced AI models to provide unbelievable lifestyle changes with minimal input
                                                </Typography>
                                                <br></br>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    £19.99 Per Month
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">View</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Container>
                        </main>
                    </ThemeProvider>
                    <div className="container">
                        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                            <div className="col-md-4 d-flex align-items-center">
                                <span className="mb-3 mb-md-0 text-muted">&copy; 2022 Healthy Life Solutions, Inc</span>
                            </div>
                        </footer>
                    </div>
                </center>

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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setTrue: () => dispatch(setTrue()),
        setToken: (token) => dispatch(setToken(token)),
        setData: (data) => dispatch(setData(data))
    }
};

LandingPage = connect(mapStateToProps, mapDispatchToProps)(LandingPage)
export { LandingPage }

