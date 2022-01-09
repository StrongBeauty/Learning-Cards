import {Link, Redirect} from 'react-router-dom';
import s from './Loginization.module.css';
import React, {MouseEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CardContainer from '../../../la-1-common/cardContainer/CardContainer';
import GlobalTitle from '../../../la-1-common/globalTitle/GlobalTitle';
import ListTitle from '../../../la-1-common/listTititle/ListTitile';
import InputForm from '../../../la-1-common/inputForm/InputForm';
import Checkbox from '../../../la-1-common/checkbox/checkbox';
import ButtonFormColor from '../../../la-1-common/buttonFormColor/ButtonFormColor';
import { PATH } from '../../../la-3-main/m-1-ui/u-2-routing/Routing';
import { loginTC, setLoginErrorAC } from '../l-2-bll/loginizationReducer';
import { getIsLoggedIn, getLoginError } from '../../../la-3-main/m-2-bll/selectots';

const Loginization = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const dispatch = useDispatch();
    const error = useSelector(getLoginError)
    const isLoggedIn = useSelector(getIsLoggedIn);

    const onEmailChangeHandler = (getEmail: string) => {
        setEmail(getEmail);
        if (error) dispatch(setLoginErrorAC({error: ''}))
    };
    const onPasswordChangeHandler = (getPassword: string) => {
        setPassword(getPassword);
        if (error) dispatch(setLoginErrorAC({error: ''}))
    };
    const onRememberMeChangeHandler = () => {
        setRememberMe(!rememberMe);
    };
    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(
            loginTC({
                email: email,
                password: password,
                rememberMe: rememberMe,
            })
        );
    };


    if (isLoggedIn) {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (

            <CardContainer>
                <>
                    <div className={s.globalTitleBox}>
                        <GlobalTitle/>
                    </div>

                    <div className={s.listTitleBox}>
                        <ListTitle text={'Sign In'} />
                    </div>

                    <form
                        className={s.formWrap}
                    >
                        <InputForm
                            text={'Email'}
                            inputType={'email'}
                            placeholder={'Please enter email'}
                            title={'Please enter email'}
                            value={email}
                            onChangeText={onEmailChangeHandler}
                        />

                        <InputForm
                            text={'Password'}
                            inputType={'password'}
                            placeholder={'Please enter password'}
                            pattern={
                                '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}'
                            }
                            title={
                                'the password must be at least 8 characters long including, one number, one capital letter, one small letter, and one of the special characters ! @ # $% ^ & *'
                            }
                            value={password}
                            onChangeText={onPasswordChangeHandler}
                        />

                        <div className={s.checkboxWrap}>
                            <Checkbox
                                checked={rememberMe}
                                name={'remember'}
                                value={'remember'}
                                text={'Remember me'}
                                onChange={onRememberMeChangeHandler}/>
                        </div>
                        {
                            error && <p className={s.error}>{error}</p>
                        }

                        <div className={s.linkWrap}>
                            <Link className={s.passForgot} to={PATH.PASSWORD_RECOVERY}>
                                Forgot password
                            </Link>
                        </div>

                        <div className={s.buttonContainer}>
                            <ButtonFormColor text="Login" type={'submit'} onClick={onClickHandler}/>
                        </div>

                        <p className={s.formText}>Don’t have an account?</p>
                    </form>

                    <Link className={s.linkCardBottom} to={PATH.REGISTRATION}>
                        Sign Up
                    </Link>
                </>
            </CardContainer>
    );
};

export default Loginization;
