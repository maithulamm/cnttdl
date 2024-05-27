import React, { Fragment } from 'react';
import { IntroSectionCNTTDL, IntroSectionHCMUSSH, IntroSectionVolunteer } from '../../components/IntroSection';

function IntroPage({ nameOfIntro }) {
    return (
        <Fragment>
            {nameOfIntro === 'HCMUSSH' ? (
                <IntroSectionHCMUSSH />
            ) : nameOfIntro === 'CNTTDL' ? (
                <IntroSectionCNTTDL />
            ) : (
                <IntroSectionVolunteer />
            )}
        </Fragment>
    );
}

export default IntroPage;
