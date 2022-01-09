import React, {FormEvent, useState} from 'react';
import s from './NewPassword.module.css';
import {Redirect, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import CardContainer from '../../../../la-1-common/cardContainer/CardContainer';
import ButtonFormColor from '../../../../la-1-common/buttonFormColor/ButtonFormColor';
import InputForm from '../../../../la-1-common/inputForm/InputForm';
import ListTitle from '../../../../la-1-common/listTititle/ListTitile';
import GlobalTitle from '../../../../la-1-common/globalTitle/GlobalTitle';
import { PATH } from '../../../../la-3-main/m-1-ui/u-2-routing/Routing';
import {getPasswordRecoveryError, getPasswordSetted } from '../../../../la-3-main/m-2-bll/selectots';
import { setNewPasswordTC } from '../../p-2-bll/passwordReducer';

type ParamsType = {
    token: string
}

const NewPassword = () => {

    const [password, setPassword] = useState<string>('')

    const dispatch = useDispatch()

    const passwordSetted = useSelector(getPasswordSetted)
    const error = useSelector(getPasswordRecoveryError)

    const params = useParams<ParamsType>()

    const onPasswordChangeHandler = (gainedPass: string) => {
        setPassword(gainedPass)
    }

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setNewPasswordTC({password, token: params.token}))
    }

    if (passwordSetted) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (

        <CardContainer>
            <>
                <div className={s.globalTitleBox}>
                    <GlobalTitle/>
                </div>

                <div className={s.listTitleBox}>
                    <ListTitle text={'Create new password'}/>
                </div>

                <form className={s.formWrap} onSubmit={onSubmitHandler}>

                    <InputForm
                        text={''}
                        inputType={'password'}
                        placeholder={'Password'}
                        title={'the password must be at least 6 characters long including, one number, one capital letter, one small letter'}
                        pattern={'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}'}
                        value={password}
                        onChangeText={onPasswordChangeHandler}

                    />

                    {
                        error && <p className={s.error}>{error}</p>
                    }

                    <p className={s.cardText}>
                        Create new password
                    </p>

                    <div className={s.buttonContainer}>
                        <ButtonFormColor
                            text='Create new password'/>
                    </div>
                </form>


            </>
        </CardContainer>


    );
};

export default NewPassword;