import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import HeaderContentsFooterTemplate from '../components/templates/HeaderContentsFooterTemplate';
import Uploader from '../components/organisms/Uploader';
import { footstepValidation } from '../redux/selectors/stepsSelectors';
import { ROUTE_HOME } from '../ROUTES';

const UploadFilePage = () => {
    const footstepsValid = useSelector(footstepValidation);
    if (footstepsValid)
        return (
            <HeaderContentsFooterTemplate>
                <Uploader />
            </HeaderContentsFooterTemplate>
        );
    else return <Redirect to={ROUTE_HOME} />;
};

export default UploadFilePage;
