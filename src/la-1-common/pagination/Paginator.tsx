import React from 'react';
import style from './Paginator.module.css';

type PaginatorType = {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Paginator = (props: PaginatorType) => {
  const { totalCount, pageCount, currentPage, onPageChange } = props;
  let pagesCount = Math.ceil(totalCount / pageCount);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={style.pages}>
      <span>last</span>
      {pages.map((page, index) => (
        <span
          key={index}
          className={currentPage === page ? style.currentPage : style.page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </span>
      ))}
      <span>next</span>
    </div>
  );
};
