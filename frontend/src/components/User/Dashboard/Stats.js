import { Component } from "react";
import Sidebar from "./Sidebar";
import { ThemeProvider } from '@mui/material';
import { theme } from "../../common/Theme";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import { AddData } from "./AddData";
import { AddDataController } from "./AddDataController";
import { connect } from "react-redux";
import { ShowStats } from "./ShowStats";




class Stats extends Component {

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

                    <Container component="main" >
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
                            <Typography component="h1" variant="h3" color="text.primary" alignContent="center">
                                Medical Stats and Analytics
                            </Typography>

                        </Box>


                        <br />
                        <ShowStats />


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

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        apiToken: state.apiToken,
        userInfo: state.userInfo
    }
}

Stats = connect(mapStateToProps, null)(Stats)

export { Stats }