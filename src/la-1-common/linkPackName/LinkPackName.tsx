import {Link} from 'react-router-dom';
import s from './LinkPackName.module.css';
import ListTitle from '../listTititle/ListTitile';
import { PATH } from '../../la-3-main/m-1-ui/u-2-routing/Routing';

type LinkToPacksType = {
    packName: string
}

const LinkToPacks: React.FC<LinkToPacksType> = props => {

    return (
        <Link className={s.linkCardList} to={PATH.PACKS}>
            <ListTitle text={props.packName}/>
        </Link>
    )
}

export default LinkToPacks