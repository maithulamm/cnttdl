import React, { Fragment } from 'react';
import { PostSection } from '../../components/PostSection';
import { ReferencesSection } from '../../components/ReferencesSection';

const baseURL = process.env.REACT_APP_API_URL;

function HomeSection() {
    return (
        <Fragment>
            <PostSection />
            <ReferencesSection />
        </Fragment>
    );
}

export default HomeSection;
