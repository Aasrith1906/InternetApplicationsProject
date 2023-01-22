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
import Grid from "@mui/material/Grid";
import axios from 'axios';
import { API_URL } from "../../common/Api";
import { connect } from "react-redux";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { IconButton } from "@mui/material";



class ViewRecommendations extends Component {

    constructor(props) {
        super(props)
        this.state = { "recommendations": [] }
        this.getRecommendations()
        console.log(this.state.recommendations)

    }

    getRecommendations = () => {
        var api_params = {
            "type": this.props.type
        }

        const config = {
            headers: { Authorization: `Bearer ${this.props.apiToken.value}` }
        }

        axios.post(API_URL + "/get_recommendations", api_params, config).then(
            (r) => {
                console.log(r.data.data)
                this.setState({ "recommendations": r.data.data })
            }
        ).catch(
            (e) => {
                console.log(e)
            }
        )
    }

    updateLikes = (item, likes) => {
        if (likes == null) {
            likes = "0"
        }
        console.log(likes)
        var api_params = {
            "username": this.props.userInfo.value.username,
            "updateMetadata": {
                "dataId": item,
                "likes": parseInt(likes) + 1
            }
        }

        const config = {
            headers: { Authorization: `Bearer ${this.props.apiToken.value}` }
        }

        console.log(api_params)
        axios.post(API_URL + "/post_data_clicks", api_params, config).then(
            (r) => {
                console.log(r.data.data)
                this.getRecommendations()
            }
        ).catch(
            (e) => {
                console.log(e)
            }
        )
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
                            <Typography component="h1" variant="h3" color="text.primary" alignContent="center">
                                {this.props.type} Dashboard
                            </Typography>
                            <br></br>
                            <br />
                            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="center" spacing={2}>
                                        {this.state.recommendations.map((value) => (
                                            <Grid key={value['dataId']} item>
                                                <Card
                                                    sx={{ display: 'flex', width: 700, flexDirection: 'column' }}
                                                >
                                                    <CardContent sx={{ flexGrow: 1, width: 700 }}>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {value['title']}
                                                        </Typography>
                                                        <Typography>
                                                            {value['description']}
                                                        </Typography>

                                                        <Typography align="right">
                                                            {value['likes']}
                                                            <IconButton onClick={() => { this.updateLikes(value['dataId'], value['likes']) }}>
                                                                <ThumbUpOffAltIcon></ThumbUpOffAltIcon>
                                                            </IconButton>
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


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        apiToken: state.apiToken,
        userInfo: state.userInfo
    }
}

ViewRecommendations = connect(mapStateToProps, null)(ViewRecommendations)

export { ViewRecommendations }