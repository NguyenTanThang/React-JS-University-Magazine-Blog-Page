import React, { Component } from 'react';
import ContributionItem from "../components/ContributionItem";
import {
    getAllContributions
} from "../requests";
import {
    paginate,
    searchContributions
} from "../utils";
import Pagination from "../components/Pagination";
 
class ViewContributionPage extends Component {

    state = {
        contributionList: "",
        currentPage: 1,
        searchString: ""
    }

    async componentDidMount() {
        const data = await getAllContributions();

        this.setState({
            contributionList: data.data,
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeCurrentPage = (pageNum) => {
        this.setState({
            currentPage: pageNum
        })
    }

    render() {
        const {contributionList, currentPage, searchString} = this.state;
        const {onChange} = this;

        if (!contributionList) {
            return (<></>)
        }

        let currentContributionList = contributionList

        currentContributionList = currentContributionList.filter(currentContributionItem => {
            return currentContributionItem.isSelected;
        })
        currentContributionList = searchContributions(currentContributionList, searchString);
        let pageObject = paginate(currentContributionList.length, currentPage, 5, 5);
        currentContributionList = currentContributionList.slice(pageObject.startIndex, pageObject.endIndex + 1);

        return (
            <div>
                <main>
                    <div className="container">
                        <div className="search-engine">
                            <h5>Search:</h5>
                            <input className="form-control" name="searchString" id="searchString" value={searchString} onChange={onChange} placeholder="Search by title"/>
                        </div>
                        <div className="row contribution-list">
                            {currentContributionList.length === 0 ? (
                                <div className="text-center" style={{textAlign: "center"}}>
                                    <h4 className="text-center">There is no contribution that has the title</h4>
                                </div>
                            ) : currentContributionList.map(contributionItem => {
                                console.log(contributionItem);
                                return <ContributionItem key={contributionItem._id}contributionItem={contributionItem}/>
                            })}
                        </div>
                        {currentContributionList.length === 0 ? (
                                <></>
                            ) : (
                                <Pagination pageObject={pageObject} onChangePageNumber={this.changeCurrentPage}/>
                            )}
                        
                    </div>
                </main>
            </div>
        )
    }
}

export default ViewContributionPage;
