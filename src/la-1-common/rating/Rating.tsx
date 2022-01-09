import * as React from 'react';
import {Box, Rating} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import StarIcon from '@material-ui/icons/Star';

type HoverRaringPropsType ={
   grade: number
}

const useStyles: any = makeStyles(
    {
        root: {

            maxWidth: '17%',

            '& .MuiRating-decimal': {
                fontSize: '1rem',
                color: '#21268F'
            }


        }
    }
)
export const HoverRating: React.FC<HoverRaringPropsType> = props => {

    const classes = useStyles();

    return (
        <Box className={classes.root}
             sx={{
                 width: 200,
                 display: 'flex',
                 alignItems: 'center',
             }}
        >
            <Rating
                name="hover-feedback"
                value={props.grade}
                precision={0.5}
                readOnly
                emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
            />
        </Box>
    );
}