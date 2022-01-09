import React, {MouseEvent} from 'react'
import {NavLink} from 'react-router-dom';
import s from './Header.module.css';
import PacksList from '../../../la-0-assets/images/packsListInactive.svg';
import User from '../../../la-0-assets/images/userActive.svg';
import LogOut from '../../../la-0-assets/images/log-out1.svg';
import {useDispatch} from 'react-redux';
import { PATH } from '../u-2-routing/Routing';
import { logOutTC } from '../../../la-2-features/f-3-loginization/l-2-bll/loginizationReducer';

const Header = () => {

    const dispatch = useDispatch()

    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(logOutTC())
    }

    return (
        <>
            <header className={s.header}>
                <div className={s.headerInner}>
                    <div className={s.globalTitleInner}>
                        <h1 className={s.globalTitle}>It-incubator</h1>
                    </div>
                    <div className={s.headerNavigation}>
                        <div className={s.headerLinks}>
                            <NavLink className={s.headerLink} activeClassName={s.active} to={PATH.PACKS}>
                                <img className={s.headerLinkImg} src={PacksList} alt="Card img"/>
                                <span className={s.linkText}>Packs list</span>
                            </NavLink>
                            <NavLink className={s.headerLink} activeClassName={s.active} to={PATH.PROFILE}>
                                <img className={s.headerLinkImg} src={User} alt="User img"/>
                                <span className={s.linkText}> Profile</span>
                            </NavLink>
                        </div>
                        <button className={s.headerButton} onClick={onClickHandler}>
                            <img className={s.headerButtonImg} src={LogOut} alt="log out img"/>

                            <span className={s.buttonText}> Log Out</span>
                        </button>
                    </div>


                </div>
            </header>
        </>
    )
}

export default Header;