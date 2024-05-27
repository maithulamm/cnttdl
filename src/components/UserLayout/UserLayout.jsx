import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderSection } from '../HeaderSection';
import './userLayout.css';
import { Navigation } from '../Navigation';
import { Footer } from '../Footer';
import { ButtonScrollTop, FloatingButton } from '../Buttons';
import { backgroundLayout } from '../../assets';

export const UserLayout = () => {
    return (
        <Fragment>
            <div className="App">
                <HeaderSection />
                <Navigation />
                <div className="user-layout">
                    <div className="user-layout__container">
                        <Outlet />
                    </div>
                    <img className="background_layout" src={backgroundLayout} alt="Background Layout" />
                </div>
                <ButtonScrollTop />
                <Footer />
                <FloatingButton />
            </div>
        </Fragment>
    );
};
