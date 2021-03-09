import moment from 'moment';

export function get_url_extension( url ) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

export const parseDateNormal = (date) => {
    var currentdate = new Date(date); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime;
}

export const parseDateMoment = (date) => {
    date = new Date(date);
    return moment(date).format('MMM Do YYYY');
}

export const parseDateMomentForInput = (date) => {
    date = new Date(date);
    return moment(date).format('YYYY-MM-DD');
}

export const parseDateMomentSecToDate = (secs) => {
    var currentdate = new Date(1970, 0, 1); 
    currentdate.setSeconds(secs);
    return moment(currentdate).format('MMM Do YYYY');
}

export const searchContributions = (list, searchString) => {
    let ans = [];

    if (!searchString) {
        return list;
    }

    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        console.log(element);
        if (element.title.toLowerCase().includes(searchString.toLowerCase())) {
            ans = checkForDuplicateInArray(ans, element);
        }
    }

    return ans;
}

export const checkForDuplicateInArray = (list, item) => {
    let count = false;
    let ans = [];

    if (list.length === 0) {
        ans = [...list, item];
        return ans;
    }

    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (element._id === item._id) {
            count = true;
            break;
        }
    }

    if (!count) {
        ans = [...list, item];
    }

    return ans;
}

export function paginate(
    totalItems,
    currentPage = 1,
    pageSize = 10,
    maxPages = 10
) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage, endPage;
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}