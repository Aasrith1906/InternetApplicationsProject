import { Component } from "react";
import { ViewRecommendations } from "./ViewRecommendations";

export class MedicalInformation extends Component {

    render() {
        return (
            <>
                <ViewRecommendations type="Medical" />
            </>
        )
    }
}