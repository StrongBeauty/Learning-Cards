import React from 'react';
import {Redirect, Route, Switch} from "react-router";
import Packs from '../../../la-2-features/f-1-packs/p-1-ui/Packs';
import Cards from '../../../la-2-features/f-2-cards/c-1-ui/Cards';
import Loginization from '../../../la-2-features/f-3-loginization/l-1-ui/Loginization';
import Profile from '../../../la-2-features/f-3-profile/p-1-ui/Profile';
import EditProfile from '../../../la-2-features/f-3-profile/p-1-ui/u-1-edit/EditProfile';
import Registration from '../../../la-2-features/f-4-registrartion/r-1-ui/Registration';
import PasswordRecovery from '../../../la-2-features/f-5-password/p-1-ui/u-1-recovery/PasswordRecovery';
import NewPassword from '../../../la-2-features/f-5-password/p-1-ui/u-2-new/NewPassword';
import LearnQuestion from '../../../la-2-features/f-6-learning/l-1-ui/LearnQuestion';
import NotFound from '../../../la-2-features/f-7-notFound/NotFound';

export const PATH ={
    LOGIN: '/login',
    NOT_FOUND: '/404',
    NEW_PASSWORD: '/new-password/:token',
    PASSWORD_RECOVERY: '/password-recovery',
    PROFILE: '/profile',
    EDIT_PROFILE: '/edit-profile',
    REGISTRATION: '/registration',
    PACKS: '/packs',
    CARDS: '/cards',
    LEARN_QUESTION: '/learn-question',
}
const Routing = () => {
    return (
        <>
            <Switch>
                <Route exact path={'/'} render={()=> <Redirect to={PATH.LOGIN}/>} />
                <Route path={PATH.LOGIN} render={()=> <Loginization/>} />
                <Route path={PATH.NOT_FOUND} render={()=> <NotFound/>} />
                <Route path={PATH.NEW_PASSWORD} render={()=> <NewPassword/>} />
                <Route path={PATH.PASSWORD_RECOVERY} render={()=> <PasswordRecovery/>} />
                <Route path={PATH.PROFILE} render={()=> <Profile/>} />
                <Route path={PATH.EDIT_PROFILE} render={()=> <EditProfile/>} />
                <Route path={PATH.REGISTRATION} render={()=> <Registration/>} />
                <Route path={PATH.PACKS} render={()=> <Packs/>} />
                <Route path={PATH.CARDS} render={()=><Cards/>}/>
                <Route path={PATH.LEARN_QUESTION} render={()=><LearnQuestion/>} />
            </Switch>
        </>
    );
};

export default Routing;