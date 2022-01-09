import React from "react";
import s from './Avatar.module.css';
import UserImages from '../../la-0-assets/images/Users/user.jpg';
import { useSelector } from "react-redux";
import { getUserAvatar } from "../../la-3-main/m-2-bll/selectots";

const Avatar = () => {
    const userAvatar = useSelector(getUserAvatar)

    const avatarImg = userAvatar ? userAvatar : UserImages;

    return (

       <div className={s.imgInner}>
            <div className={s.imgWrap}>
                <img className={s.userImg} src={avatarImg} alt="user images" />
            </div>
       </div>
    )
}

export default Avatar;