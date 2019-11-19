import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    background: #1aab8a;
    color: #fff;
    border: none;
    position: relative;
    height: 60px;
    font-size: 1.6em;
    padding: 0 2em;
    cursor: pointer;
    transition: 800ms ease all;
    outline: none;

    &:hover {
        background: #fff;
        color: #1aab8a;
    }
    &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        height: 2px;
        width: 0;
        background: #1aab8a;
        transition: 400ms ease all;
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        height: 2px;
        width: 0;
        background: #1aab8a;
        transition: 400ms ease all;
        right: inherit;
        top: inherit;
        left: 0;
        bottom: 0;
    }

    &:hover:before {
        width: 100%;
        transition: 800ms ease all;
    }
    &:hover:after {
        width: 100%;
        transition: 800ms ease all;
    }
`;

const FancyButton = props => <Button {...props} />;

export default FancyButton;
