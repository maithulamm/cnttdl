import React, { Fragment, useEffect } from 'react';
import { Contact } from '../../components/ContactSection';

function ContactPage() {
    useEffect(() => {
        document.title = 'Thông tin liên hệ - Tổ Công nghệ thông tin và dữ liệu';
    });
    return (
        <Fragment>
            <Contact />
        </Fragment>
    );
}

export default ContactPage;
