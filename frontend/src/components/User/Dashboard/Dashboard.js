import { Component } from "react";
import Sidebar from "./Sidebar";
import { ThemeProvider } from '@mui/material';
import { theme } from "../../common/Theme";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import { connect } from "react-redux";

class Dashboard extends Component {

    constructor(props) {
        super(props)
        console.log(props)
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

                            }}
                        >
                            <Sidebar />
                            <br></br>
                            <Typography component="h1" variant="h5" color="text.primary" alignContent="center">
                                User Dashboard
                            </Typography>
                            <br>
                            </br>
                            <Typography component="h4" variant="h6" color="text.primary" alignContent="center">

                                User Dashboard shows information summarised from the different dashboards.
                                Use the sidebar to navigate between the different dashboards
                            </Typography>
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
        apiToken: state.apiToken
    }
}

Dashboard = connect(mapStateToProps, null)(Dashboard)

export { Dashboard }