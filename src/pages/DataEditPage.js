import { useSelector } from 'react-redux';
import React from 'react';
import { Redirect } from 'react-router-dom';

import HeaderContentsFooterTemplate from '../components/templates/HeaderContentsFooterTemplate';
import { ROUTE_HOME } from '../ROUTES';
import DataEditor from '../components/organisms/DataEditor';
import { footstepValidation } from '../redux/selectors/stepsSelectors';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const DataEditPage = () => {
    const footstepsValid = useSelector(footstepValidation);

    if (footstepsValid) {
        return (
            <HeaderContentsFooterTemplate>
                <DataEditor />
            </HeaderContentsFooterTemplate>
        );
    } else {
        return <Redirect to={ROUTE_HOME} />;
    }
};

export default DataEditPage;
