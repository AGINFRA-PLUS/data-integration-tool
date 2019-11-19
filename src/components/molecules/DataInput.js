import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import UploadIcon from '@material-ui/icons/CloudUpload';
import Box from '@material-ui/core/Box/Box';

const SheetJSFT = ['xlsx', 'xlsb', 'xlsm', 'xls', 'xml', 'csv', 'txt', 'ods', 'fods', 'uos', 'sylk', 'dif', 'dbf', 'prn', 'qpw', '123', 'wb*', 'wq*', 'html', 'htm', 'json']
    .map(function(x) {
        return '.' + x;
    })
    .join(',');

const DataInput = ({ text, backgroundColor, mainColor, handleFile }) => {
    return (
        <form className="form-inline">
            <FormGroup className="form-group">
                <UploadButton backgroundColor={backgroundColor} mainColor={mainColor}>
                    <Box flexWrap={'wrap'} flexDirection={'row'} justifyContent={'center'} textAlign={'center'}>
                        <Box>
                            <UploadIcon fontSize={'large'} />
                        </Box>
                        <Box>{text}</Box>
                    </Box>
                    <InputButton
                        type="file"
                        className="form-control"
                        id="file"
                        accept={SheetJSFT}
                        onChange={e => {
                            const files = e.target.files;
                            if (files && files[0]) handleFile(files[0]);
                        }}
                    />
                </UploadButton>
            </FormGroup>
        </form>
    );
};
DataInput.propTypes = {
    text: PropTypes.string,
    handleFile: PropTypes.func,
};
const FormGroup = styled.div`
    display: inline-block !important;
    width: 100%;
`;
const UploadButton = styled.label`
    font-size: 20px;
    position: relative;
    font-family: Roboto;
    text-align: center;
    background-color: ${props => props.backgroundColor};
    border: 1px solid ${props => props.mainColor};
    color: ${props => props.mainColor};
    margin: 12px 12px;
    padding: 20px 40px;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    letter-spacing: 1px;
    border-radius: 5px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition: 0.2s linear;
    -moz-transition: 0.2s linear;
    -ms-transition: 0.2s linear;
    -o-transition: 0.2s linear;
    transition: 0.2s linear;
    &:hover {
        color: ${props => props.backgroundColor};
        border: 1px solid ${props => props.backgroundColor};
        background-color: ${props => props.mainColor};
    }
`;
const InputButton = styled.input`
    display: none !important;
`;
export default DataInput;
