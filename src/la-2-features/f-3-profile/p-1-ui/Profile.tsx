import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getIsLoggedIn, getIsProfileEditing, getUserName} from '../../../la-3-main/m-2-bll/selectots';
import {Redirect} from 'react-router-dom';
import s from './Profile.module.css';
import Avatar from '../../../la-1-common/avatar/Avatar'
import { PATH } from '../../../la-3-main/m-1-ui/u-2-routing/Routing';
import { setProfileIsEditingAC } from '../p-2-bll/profileReducer';


const Profile = () => {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector(getIsLoggedIn)
    const isEditing = useSelector(getIsProfileEditing)
    const userName = useSelector(getUserName)

    
    const onEditButtonClick = () => {
        dispatch(setProfileIsEditingAC({isEditing: true}))
    }

    if (isEditing) {
        return <Redirect to={PATH.EDIT_PROFILE} />
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN} />
    }

    return (
        <>

            <div className={s.profileInner}>
                <div className={s.profileWrap}>

                  <Avatar/>

                    <span className={s.userName}>{userName}</span>

                    <span className={s.userProfession}>Front-end developer</span>

                    <button className={s.buttonProfile} onClick={onEditButtonClick}>
                        Edit profile
                    </button>

                </div>
            </div>

        </>
    );
}

export default Profile;