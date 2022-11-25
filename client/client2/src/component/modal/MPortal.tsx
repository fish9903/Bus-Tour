import {ReactNode} from 'react';
import styles from './MPortal.module.css';

import { createPortal } from 'react-dom';

interface IMPortal {
    display: boolean;
    children: ReactNode;
}

const MPortal : React.FC<IMPortal> = (props) => {
    const portal_root = document.getElementById('modal-root')!;

    return createPortal(
        <div className={`${styles['m-portal']} ${props.display? "" : styles['hide']}`}>
            {props.children}
        </div>, portal_root);
};

export default MPortal;