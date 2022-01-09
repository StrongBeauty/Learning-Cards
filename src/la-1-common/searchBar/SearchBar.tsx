import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { findPacksNameAC, findUserNameAC } from '../../store/cardsPacksReducer';

export const SearchBar = () => {
  const [searchPackName, setSearchPackName] = useState<string>('');
  const [searchUserName, setSearchUserName] = useState<string>('');

  const dispatch = useDispatch();
  const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPackName(e.currentTarget.value);
  };
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUserName(e.currentTarget.value);
  };

  // const findPacks = (e: MouseEvent<HTMLButtonElement>) => {
  //   console.log('search', searchPackName, searchUserName);
  //   dispatch(findPacksNameAC(searchPackName));
  //   dispatch(findUserNameAC(searchUserName));
  // };

  return (
    <div>
      <input
        type="text"
        placeholder="Seurch Name"
        onChange={onChangePackName}
        value={searchPackName}
      />
      <input
        type="text"
        placeholder="Seurch Created by"
        onChange={onChangeUserName}
        value={searchUserName}
      />
      <button>click</button>
      {}
    </div>
  );
};
