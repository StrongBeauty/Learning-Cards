import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, createTheme, Slider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setMinMaxCardsAC } from '../../la-2-features/f-1-packs/p-2-bll/packsReducer';
import {getMaxCardsCount, getMinCardsCount } from '../../la-3-main/m-2-bll/selectots';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1320,
            xl: 1536,
        },
    },
});

const useStyles: any = makeStyles({
    root: {
        maxWidth: '100%',
        paddingTop: '1.3rem',
        paddingBottom: '2.8rem',

        [theme.breakpoints.down('lg')]: {
            width: '100%',
        },

'& span .MuiSlider-valueLabel': {
            fontSize: '.9rem',
            fontFamily: 'SFUIDisplayNormal',
            padding: '0',
            width: '2rem',
            height: '1.5rem',
        },

        '& span .MuiSlider-valueLabel::before': {
            display: 'none',
        },

        '& span .MuiSlider-valueLabelOpen': {
            backgroundColor: '#2F4F4F',
        },

        '& .MuiSlider-thumb': {
            backgroundColor: '#ffff',
            border: '4px solid #2F4F4F',
            width: '1rem',
            height: '1rem',
        },

        '& .MuiSlider-thumb.Mui-active': {
            boxShadow: 'none',
        },

        '& .MuiSlider-thumb:hover': {
            boxShadow: 'none',
        },

        '& span .MuiSlider-rail': {
            backgroundColor: '#2F4F4F',
            opacity: '.5',
            height: '.32rem',
        },

        '& span .MuiSlider-track,': {
            color: '#2F4F4F',
            height: '.32rem',
        },

        '& span .MuiSlider-root': {
            height: '10rem',
        },
    }


})

function valuetext(value: number) {
    return `${value}°C`;
}

export const RangeSlider = () => {
    const classes = useStyles();

    const minCardsCount = useSelector(getMinCardsCount)
    const maxCardsCount = useSelector(getMaxCardsCount)
    const dispatch = useDispatch()
    const [value, setValue] = React.useState<number[]>([minCardsCount, maxCardsCount]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        let value = newValue as number[]
        setValue(value);
        dispatch(setMinMaxCardsAC({ min: value[0], max: value[1] }))
    };

    return (
        <>
            <Box className={classes.root}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    getAriaValueText={valuetext}
                    max={110}
                />
            </Box>
        </>
    );
}

