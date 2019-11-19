import React from 'react';
import Box from '@material-ui/core/Box/Box';
import Grid from '@material-ui/core/Grid/Grid';
import Radio from '@material-ui/core/Radio/Radio';
import Typography from '@material-ui/core/Typography/Typography';
import PropTypes from 'prop-types';

const SelectableCard = props => {
    return (
        <Box padding={'18px'} borderRadius={'5px'} border={props.selected ? '2px solid #526c91' : '1px solid lightgrey'}>
            <Grid container>
                <Grid item xs={10}>
                    <img style={{maxWidth:'100px'}} alt={''} src={props.image} />
                </Grid>
                <Grid item xs={2}>
                    <Radio {...props} />
                </Grid>
                <Grid item xs={12}>
                    <Box textAlign={'center'}>
                        <br />
                        <Typography variant={'h6'}>{props.title}</Typography>
                        <br />
                        <Typography variant={'body1'}>{props.subtitle}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

SelectableCard.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    selected: PropTypes.bool,
    image: PropTypes.string,
};

export default SelectableCard;
