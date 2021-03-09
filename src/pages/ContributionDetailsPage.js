import React, { Component } from 'react';
import DetailsContribution from "../components/ContributionDetails";
import {
    getContributionByID
} from "../requests";

class ViewContributionPage extends Component {

    state = {
        contributionItem: ""
    }

    async componentDidMount() {
        const {contributionID} = this.props.match.params;
        const data = await getContributionByID(contributionID);

        this.setState({
            contributionItem: data.data,
        })
    }

    render() {
        const {contributionItem} = this.state;

        if (!contributionItem) {
            return (<></>)
        }

        return (
            <div>
                <main>
                    <div className="container">
                        <DetailsContribution contributionItem={contributionItem}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default ViewContributionPage;
