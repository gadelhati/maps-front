import { useState } from 'react'
import { Icon } from '../../assets/svg.access';
import { getPayload } from '../../service/service.token'
import { vector } from '../menu/menu';
import { UriToScreenFormat } from '../../assets/uri.format'
import { accessList } from '../menu/access.list'
import { Button } from '../template/button/button'
import { Header } from '../template/header/header';
import { Cards } from '../template/card/card';

export const Home = () => {
    const [list, setList] = useState<boolean[]>(accessList())
    
    return (
        <>
            <Header title='Home'/>
            <Cards></Cards>
        </>
    );
}