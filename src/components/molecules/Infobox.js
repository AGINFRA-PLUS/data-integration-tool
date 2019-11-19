import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import styled from 'styled-components';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import PropTypes from 'prop-types';

const InfoboxMain = styled.div`
    font-family: Roboto;
    letter-spacing: 0.5px;
    font-weight: 400;
    line-height: 22px;
    padding-left: 20px;
    border: 1px solid #4c5c6d29;
    padding: 13px;
    background: #fafcff;
    margin: 20px 0px;
`;
const MainGrid = styled(Grid)`
    margin-top: 5px;
`;
const InfoboxContents = styled.div`
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
`;

const Infobox = ({ children }) => {
    return (
        <InfoboxMain>
            <MainGrid container>
                <Grid item xs={1}>
                    <ErrorOutlineIcon fontSize={'large'} />
                </Grid>
                <Grid item xs={11}>
                    <InfoboxContents>{children}</InfoboxContents>
                </Grid>
            </MainGrid>
        </InfoboxMain>
    );
};

Infobox.propTypes = {
    children: PropTypes.object,
};
export default Infobox;
