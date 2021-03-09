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
        
        const {title, contributor} = contributionItem;

        return (
            <div>
                <div className="banner">
                    <div className="banner__content">
                        <div className="banner-content__logo">
                            <img src="https://i.imgur.com/IiQ4Qjx.png" alt="Logo" className="img-fluid"/>
                        </div>
                        <h2>{title}</h2>
                        <h4>{contributor.username}</h4>
                    </div>
                </div>
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
