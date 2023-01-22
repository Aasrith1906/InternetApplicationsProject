import { Component } from "react";
import { Navigate } from "react-router-dom";
import { setFalse } from "../common/redux/loggedInSlicer";
import { setToken } from "../common/redux/apiTokenSlicer";
import { setData } from "../common/redux/userInfoSlicer";
import { saveState } from "./redux/localStorage";
import { connect } from "react-redux"

class Logout extends Component {

    constructor(props) {
        super(props)
        this.props.setFalse()
        this.props.setToken("")
        saveState(null)
        console.log(this.props.isLoggedIn)
        console.log(this.props.apiToken)
    }
    render() {
        return (
            <Navigate to={{ "pathname": "/" }} />
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
        setFalse: () => dispatch(setFalse()),
        setToken: (token) => dispatch(setToken(token)),
        setData: (data) => dispatch(setData(data))
    }
};

Logout = connect(mapStateToProps, mapDispatchToProps)(Logout)
export { Logout }

