import { Component } from "react";
import { ViewRecommendations } from "./ViewRecommendations";

export class FitnessCenter extends Component {

    render() {
        return (
            <>
                <ViewRecommendations type="Fitness" />
            </>
        )
    }
}