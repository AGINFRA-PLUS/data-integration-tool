import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DragDropFile = ({ text, children, handleFile }) => {
    return (
        <DragArea
            onDrop={e => {
                const files = e.dataTransfer.files;
                if (files && files[0]) handleFile(files[0]);
            }}
            onDragEnter={e => {
                e.stopPropagation();
                e.preventDefault();
            }}
            onDragOver={e => {
                e.stopPropagation();
                e.preventDefault();
            }}>
            <Header className={'dnd-head'}>{text}</Header>
            {children}
        </DragArea>
    );
};
DragDropFile.propTypes = {
    text: PropTypes.string,
    children: PropTypes.node,
    handleFile: PropTypes.func,
};
const DragArea = styled.div`
    min-height: 200px;
    margin-top: 20px;
    background-color: rgb(245, 248, 250);
    color: rgb(124, 152, 182);
    position: relative;
    border-width: 1px;
    border-style: dashed;
    border-color: rgb(81, 111, 144);
    border-image: initial;
    border-radius: 4px;
`;
const Header = styled.span`
    position: relative;
    top: -10px;
    left: 5px;
    border-radius: 15px;
    background: white;
    padding: 5px;
    font-family: Roboto;
`;
export default DragDropFile;
