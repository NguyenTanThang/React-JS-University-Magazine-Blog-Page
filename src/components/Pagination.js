import React, { Component } from 'react';
import { Pagination as Paginator, PaginationItem, PaginationLink } from 'reactstrap';

export default class Pagination extends Component {

    renderPaginatorItem = () => {
        const {pageObject, onChangePageNumber} = this.props;
        const {pages, currentPage} = pageObject;
        console.log(pageObject);

        return pages.map(page => {
            if (currentPage === page) {
                return (
                    <PaginationItem active key={page} onClick={()=>onChangePageNumber(page)}>
                        <PaginationLink href="#">
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                )
            }
            return (
                <PaginationItem key={page} onClick={()=>onChangePageNumber(page)}>
                    <PaginationLink href="#">
                        {page}
                    </PaginationLink>
                </PaginationItem>
            )
        })
    }

    moveToPreviousPage = () => {
        const {pageObject, onChangePageNumber} = this.props;
        const {currentPage} = pageObject;

        if (currentPage > 1) {
            onChangePageNumber(currentPage - 1)
        }
    }

    moveToNextPage = () => {
        const {pageObject, onChangePageNumber} = this.props;
        const {currentPage, totalPages} = pageObject;

        if (currentPage < totalPages) {
            onChangePageNumber(currentPage + 1)
        }
    }

    render() {
        const {moveToPreviousPage, moveToNextPage, renderPaginatorItem} = this;
        const {pageObject} = this.props;
        const {totalPages} = pageObject;

        if (totalPages === 0) {
            return (<></>)
        }

        return (
            <Paginator aria-label="Page navigation example">
                <PaginationItem key={"prev"} onClick={moveToPreviousPage}>
                    <PaginationLink href="#">
                        <i className="fas fa-arrow-left" aria-hidden="true"></i>
                    </PaginationLink>
                </PaginationItem>
                {renderPaginatorItem()}
                <PaginationItem key={"next"}  onClick={moveToNextPage}>
                    <PaginationLink href="#">
                        <i className="fas fa-arrow-right" aria-hidden="true"></i>
                    </PaginationLink>
                </PaginationItem>
            </Paginator>
        )
    }
}
