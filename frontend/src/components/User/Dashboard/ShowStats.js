import { Component } from "react";
import { IconButton, ThemeProvider } from '@mui/material';
import { theme } from "../../common/Theme";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import { API_URL } from "../../common/Api";
import { connect } from "react-redux";
import { RefreshOutlined } from "@material-ui/icons";




class ShowStats extends Component {

    constructor(props) {
        super(props)
        this.state = { "stats": {}, "topStats": props.topStats, "statsFull": {} }
        this.getStats()

    }

    getStats = () => {
        var api_params = {
            "username": this.props.userInfo.value.username,
        }

        const config = {
            headers: { Authorization: `Bearer ${this.props.apiToken.value}` }
        }

        axios.post(API_URL + "/get_stats", api_params, config).then(
            (r) => {
                var stats_data = {}
                const filter = ['username', 'data_type']
                var stats_data_api = r.data.data
                for (let k in stats_data_api) {
                    if (filter.indexOf(k) !== 0) {
                        console.log(k, filter.indexOf(k))
                        stats_data[k] = stats_data_api[k]

                    }
                }

                const filter2 = ['Increase', 'Last']
                var stats_data_filtered_2 = {}

                for (let k in stats_data) {
                    var contains = false
                    for (let val in filter2) {
                        console.log(k, filter2[val])
                        if (k.includes(filter2[val])) {
                            console.log(k)
                            contains = true
                        }
                    }
                    if (contains === false) {
                        stats_data_filtered_2[k] = stats_data[k]
                    }

                }

                if (this.props.topStats == null) {
                    this.setState({ "stats": stats_data_filtered_2, "statsFull": stats_data_api })
                } else {
                    var reduce = {}
                    let i = 1
                    for (let k in stats_data_filtered_2) {
                        if (i > this.props.topStats) {
                            this.setState({ "stats": reduce, "statsFull": stats_data_api })
                            break
                        }
                        reduce[k] = stats_data_filtered_2[k]
                        i += 1
                    }
                }

                console.log(this.state.statsFull)
            }
        ).catch(
            (e) => {
                console.log(e)
            }
        )


    }

    refreshPage = () => {
        this.getStats()
    }

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>

                    <Container component="main" >

                        <Typography component="h2" variant="h5" color="text.primary" alignContent="center">

                            {
                                this.props.topStats == null && (
                                    <>Live Stats</>
                                )
                            }

                            {
                                this.props.topStats != null && (
                                    <>Top {this.props.topStats} Stats</>
                                )
                            }
                            <IconButton onClick={this.refreshPage}>
                                <RefreshOutlined />
                            </IconButton>
                        </Typography>

                        <Grid container rowSpacing={2} columnSpacing={20} >
                            {

                                Object.entries(this.state.stats).map(
                                    ([key, value]) => <>
                                        <Grid item xs={6}>
                                            <Box
                                                sx={{
                                                    bgcolor: 'background.paper',
                                                    boxShadow: 10,
                                                    borderRadius: 2,
                                                    p: 2,
                                                    minWidth: 10,
                                                }}
                                            >
                                                <Box sx={{ color: 'text.secondary' }}>
                                                    {key}
                                                </Box>
                                                <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                                                    {value}
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
                                                    {this.state.statsFull['Increase'.concat(key)]}
                                                </Box>
                                                <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
                                                    vs. last period
                                                </Box>
                                            </Box>
                                            <br></br>


                                        </Grid>


                                    </>

                                )
                            }

                        </Grid>



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

ShowStats = connect(mapStateToProps, null)(ShowStats)

export { ShowStats }