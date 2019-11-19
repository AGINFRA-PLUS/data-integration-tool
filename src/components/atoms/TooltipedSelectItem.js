import Tooltip from 'rc-tooltip';
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/rc-tooltip.css';

const TooltipedSelectItem = ({ overlay, itemValue }) => {
    return (
        <Tooltip
            key={overlay}
            placement="left"
            trigger={['hover']}
            overlay={
                overlay ? (
                    <div style={{ width: '300px', zIndex: 9999 }}>
                        <div>{overlay}</div>
                    </div>
                ) : (
                    false
                )
            }>
            <div>
                <b>{itemValue}</b>
            </div>
        </Tooltip>
    );
};

TooltipedSelectItem.propTypes = {
    overlay: PropTypes.string.isRequired,
    itemValue: PropTypes.string.isRequired,
};

export default TooltipedSelectItem;
