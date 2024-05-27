import React from 'react';
import { Pagination } from '@mui/material';
import './pagination.css';

export const PaginationSection = ({ ...paginateProps }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(paginateProps.totalPosts / paginateProps.postPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-area">
            <Pagination
                count={pageNumbers.length}
                shape={paginateProps.type}
                defaultPage={paginateProps.currentPage}
                siblingCount={0}
                className="pagination"
                onChange={(event, value) => paginateProps.paginate(value)}
            />
        </div>
    );
};
