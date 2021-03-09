import React, { Component } from 'react';
import {parseDateMoment} from "../utils";
import {Link} from "react-router-dom";

class ContributionItem extends Component {
    render() {
        const {contributionItem} = this.props;
        const {title, imageFileURL, contributor, created_date, _id} = contributionItem;

        return (
            <Link to={`/contribution-details/${_id}`} className="contribution-item">
                <div className="contribution-item__cover">
                    <img className="img-fluid" src={imageFileURL} alt={title}/>
                    <div className="contribution-item__cover--after"></div>
                </div>
                <h4>{title}</h4>
                <h5>By {contributor.username}</h5>
                <h6>Created: {parseDateMoment(created_date)}</h6>
            </Link>
        )
    }
}

export default ContributionItem;
