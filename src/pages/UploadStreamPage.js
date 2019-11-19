import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import HeaderContentsFooterTemplate from '../components/templates/HeaderContentsFooterTemplate';
import StreamSetter from '../components/organisms/StreamSetter';
import { footstepValidation } from '../redux/selectors/stepsSelectors';
import { ROUTE_HOME } from '../ROUTES';

const UploadStreamPage = () => {
    const footstepsValid = useSelector(footstepValidation);
    if (footstepsValid)
        return (
            <HeaderContentsFooterTemplate>
                <StreamSetter />
            </HeaderContentsFooterTemplate>
        );
    else return <Redirect to={ROUTE_HOME} />;
};

export default UploadStreamPage;
