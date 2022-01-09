import * as React from 'react';
import {ChangeEvent} from 'react';
import Pagination from '@material-ui/core/Pagination';
import Stack from '@material-ui/core/Stack';
import {makeStyles} from '@material-ui/styles';

const useStyles: any = makeStyles({
    root: {
        '& button.Mui-selected': {
            backgroundColor: '#21268F',
            color: '#FFFFFF',
            Width: '18.25rem',
        },

        '& button': {
            fontSize: '.75rem',
            fontFamily: 'Lato',
        }

    },
    ul: {},
    outlined: {},
    text: {}
});


type PaginationPropsType = {
    currentPage: number
    totalPages: number
    setNewPage: (page: number) => void
}


export const PaginationRounded: React.FC<PaginationPropsType> = props => {

    const {
        currentPage,
        setNewPage,
        totalPages,
    } = props


    const onPaginationChangeHandler = (e: ChangeEvent<unknown>, page: number) => {
        setNewPage(page)
    }

    const classes = useStyles();
    return (
        <Stack spacing={2}>
            <Pagination count={totalPages} onChange={onPaginationChangeHandler} page={currentPage} shape="rounded"
                        className={classes.root}/>
        </Stack>
    );
}

